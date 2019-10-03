import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/styles.less';

import SuggestionsList from './components/SuggestionsList';
import QueryInput from './components/QueryInput';

import { handleKeyPress } from './handlers';

import Api from './api/FetchApi';
import { buildRequestBody } from "./api/helpers";
import { SHORT_TYPES } from "./constants/index";
import { isFunction, isEqual } from "./helpers";


class DadataSuggestions extends Component {

  static propTypes = {
    token: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    deferRequestBy: PropTypes.number.isRequired,
    hint: PropTypes.string.isRequired,
    minChars: PropTypes.number.isRequired,
    geolocation: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    highlighting: PropTypes.bool.isRequired,
    specialRequestOptions: PropTypes.object,
    placeholder: PropTypes.string,
    receivePropsBehaveLikeOnChange: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    //handlers:
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    suggestionsFormatter: PropTypes.func,
    selectedSuggestionFormatter: PropTypes.func,
  };

  static defaultProps = {
    token: '',
    count: 10,
    deferRequestBy: 300,
    minChars: 3,
    geolocation: true,
    hint: 'Выберите вариант ниже или продолжите ввод',
    query: '',
    service: 'address',
    highlighting: true,
    receivePropsBehaveLikeOnChange: false,
  };

  constructor(props) {
    super(props);
    const {token, service, geolocation} = props;
    this.api = new Api(token, service, geolocation);
    this.handleKeyPress = handleKeyPress.bind(this);
    this.fetchTimeoutId = null;
    this.selectEventFired = false;
  }

  state = {
    query: '',
    suggestions: [],
    selected: -1,
    loading: false,
    success: false,
    error: false,
    showSuggestions: false,
  };

  componentWillMount() {
    const { query } = this.props;
    this.setState({ query });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  oldComponentWillReceiveProps = nextProps => {
    // just reset everything
    this.setState({
      query: nextProps.query,
      suggestions: [],
      showSuggestions: false,
      success: false,
    });
  };
  
  newComponentWillReceiveProps = nextProps => {
    // behaves like onChange behaves
    const { query: newQuery, value: newValue } = nextProps;
    const { value } = this.props;
    const { query } = this.state;

    // set external suggestion, passed through props
    if (!!newValue && !isEqual(newValue, value)) {
        this.setState({ suggestions: [newValue]});
        this.selectSuggestion(0);
        return
    }

    // this if block prevents state update
    // on props changes caused by select event
    if (this.selectEventFired) {
        this.selectEventFired = false;
        return;
    }
    if (newQuery != query) {
      this.handleChange(newQuery);
    }
  };

  componentWillReceiveProps(nextProps) {
    const { receivePropsBehaveLikeOnChange } = this.props
    if (receivePropsBehaveLikeOnChange) {
      this.newComponentWillReceiveProps(nextProps);
    } else {
      this.oldComponentWillReceiveProps(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearFetchTimeout();
    this._isMounted = false;
  }

  clearFetchTimeout = () => {
    if (this.fetchTimeoutId) clearTimeout(this.fetchTimeoutId);
  }

  fetchData = (query) => {
    if (this._isMounted) {
      this.setState({
        loading: true,
        success: false,
      });
    }

    const requestBody = buildRequestBody(query, this.props);

    this.api.suggestions(requestBody)
      .then(suggestions => {
        if (this._isMounted) {
          this.setState({
            suggestions,
            loading: false,
            error: false,
            success: true,
            showSuggestions: true,
          });
        }
      })
      .catch(e => this.handleError(e));
  };

  searchWords = () => {
    const { query } = this.state;
    const searchWords = query.split(/[^-А-Яа-яЁё\d\w]+/);
    const { service } = this.props;
    if (service === Api.ADDRESS) {
      return searchWords.filter(word => !SHORT_TYPES.includes(word));
    }
    return searchWords;
  };

  handleChange = (query) => {
    const { deferRequestBy } = this.props;

    this.clearFetchTimeout();
    if (this._isMounted) {
      this.setState({
        query,
        selected: -1
      });
    }

    const { minChars } = this.props;
    if (query.length >= minChars) {
      this.fetchTimeoutId = setTimeout(() => {
        this.fetchData(query);
      }, deferRequestBy);
    } else {
      if (this._isMounted) {
        this.setState({
          suggestions: [],
          showSuggestions: false,
          success: false,
        });
      }
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(query);
    }
  }

  handleBlur = (event) => {
    this.makeListInvisible();
    const { onBlur } = this.props;
    if (isFunction(onBlur)) {
      onBlur(event);
    }
  };

  handleError = (e) => {
    if (this._isMounted) {
      this.setState({
        error: true,
        loading: false,
        success: false,
      });
    }
    const { onError } = this.props;
    if (onError) {
      onError(e);
    }
  };

  selectSuggestion = (index) => {
    this.setState(({suggestions}) => {
      const selectedSuggestion = suggestions[index];
      const query = this.selectedSuggestionFormatter(selectedSuggestion);
      return {
        selected: index,
        query
      }
    });
    this.selectEventFired = true;
  };

  handleSelect = (index) => () => {
    const { selected } = this.state;
    if (index !== selected) {
      this.selectSuggestion(index);
    }
    const selectedSuggestion = this.state.suggestions[index];
    const { onSelect } = this.props;
    onSelect(selectedSuggestion);
  };

  formatter = (suggestion, name) => {
    const { [name]: customFormatter } = this.props;
    if (customFormatter) {
      return customFormatter(suggestion);
    }
    return suggestion.value;
  };

  suggestionsFormatter = (suggestion) => {
    return this.formatter(suggestion, 'suggestionsFormatter')
  };

  selectedSuggestionFormatter = (suggestion) => {
    return this.formatter(suggestion, 'selectedSuggestionFormatter')
  };

  subtextFormatter = (suggestion) => {
    const { service } = this.props;
    if (service === 'party') {
      return `ИНН ${suggestion.data.inn}`;
    }
    return null;
  };

  makeListVisible = () => {

    const { readOnly } = this.props;
    if (readOnly) {
        return;
    }

    const { showSuggestions } = this.state;
    if (showSuggestions) {
      return
    }
    this.setState({ showSuggestions: true });
  };

  handleFocus = (event) => {
    const { readOnly } = this.props;
    if (readOnly) {
        return;
    }

    const { query, success, suggestions, selected, error } = this.state;
    const { minChars } = this.props;

    if (!!suggestions.length && selected === -1) {
      this.makeListVisible();
    } else if (query.length >= minChars && !success && !error) {
      this.fetchData(query);
    }

    const { onFocus } = this.props;
    if (isFunction(onFocus)) {
      onFocus(event);
    }
  };

  makeListInvisible = () => {
    const { showSuggestions } = this.state;
    if (!showSuggestions) {
      return
    }
    this.setState({showSuggestions: false});
  };

  render() {
    const {loading, query, showSuggestions, suggestions, selected} = this.state;
    return (
      <div className="suggestions-container">
        <QueryInput
          onChange={ e => this.handleChange(e.target.value) }
          placeholder={ this.props.placeholder }
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          loading={ loading }
          query={ query }
          onMouseDown={ this.makeListVisible }
          onKeyPress={ this.handleKeyPress }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
        />

        <SuggestionsList
          suggestions={ suggestions }
          hint={ this.props.hint }
          visible={ showSuggestions }
          onSelect={this.handleSelect}
          selected={selected}
          suggestionsFormatter={this.suggestionsFormatter}
          searchWords={ this.searchWords }
          highlighting = { this.props.highlighting }
          subtextFormatter = { this.subtextFormatter }
        />
      </div>
    );
  }
}

export default DadataSuggestions;
