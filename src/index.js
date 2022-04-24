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
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    name: PropTypes.string,

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
    name: null,
    token: '',
    count: 10,
    deferRequestBy: 300,
    minChars: 3,
    geolocation: true,
    hint: 'Выберите вариант ниже или продолжите ввод',
    query: '',
    service: 'address',
    highlighting: true,
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

  UNSAFE_componentWillMount() {
    const { query } = this.props;
    this.setState({ query });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    if (newQuery !== query) {
      this.handleChange(newQuery);
    }
  }

  componentWillUnmount() {
    this.clearFetchTimeout();
    this._isMounted = false;
  }

  clearFetchTimeout = () => {
    if (this.fetchTimeoutId) clearTimeout(this.fetchTimeoutId);
  };

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

  fetchExactSuggestion = (unrestricted_value) => {
    const requestBody = buildRequestBody(unrestricted_value, {count: 1});
    this.api.suggestions(requestBody, false)
        .then(suggestions => {
          if (this._isMounted) {
            const selectedSuggestion = suggestions[0];
            const query = this.selectedSuggestionFormatter(selectedSuggestion);
            this.setState({
              suggestions,
              selected: 0,
              query,
              loading: false,
              error: false,
              success: true,
              showSuggestions: false,
            });
          }
        })
        .catch(e => this.handleError(e));
  }

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
  };

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
    const {suggestions} = this.state;
    const selectedSuggestion = suggestions[index];
    this.fetchExactSuggestion(selectedSuggestion["unrestricted_value"]);
    this.selectEventFired = true;
  };

  handleSelect = (index) => () => {
    const { selected } = this.state;
    if (index !== selected) {
      this.selectSuggestion(index);
    }
    this.makeListInvisible();
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
    const {
      name, placeholder, disabled, readOnly,  // QuieryInput props
      hint, highlighting,                     // SuggestionsList props
    } = this.props;
    return (
      <div className="suggestions-container">
        <QueryInput
          // props
          name={ name }
          placeholder={ placeholder }
          disabled={ disabled }
          readOnly={ readOnly }
          // state
          loading={ loading }
          query={ query }
          // handlers
          onMouseDown={ this.makeListVisible }
          onKeyPress={ this.handleKeyPress }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
          onChange={ e => this.handleChange(e.target.value) }
        />

        <SuggestionsList
          // props
          hint={ hint }
          highlighting = { highlighting }
          // state
          suggestions={ suggestions }
          selected={ selected }
          visible={ showSuggestions }
          // class attributes
          onSelect={ this.handleSelect }
          suggestionsFormatter={ this.suggestionsFormatter }
          searchWords={ this.searchWords }
          subtextFormatter = { this.subtextFormatter }
        />
      </div>
    );
  }
}

export default DadataSuggestions;
