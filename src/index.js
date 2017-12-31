import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/styles.less';

import SuggestionsList from './components/SuggestionsList';
import QueryInput from './components/QueryInput';

import Api from './api/FetchApi';

class DadataSuggestions extends Component {

  constructor(props) {
    super(props);
    const {token, service} = props;
    this.api = new Api(token, service, props.geolocation);
  }

  state = {
    query: this.props.query,
    suggestions: [],
    selected: -1,
    loading: false,
    error: false,
    showSuggestions: false
  };

  fetchData = (query) => {
    this.setState({
      loading: true,
    });

    this.api.suggestions(query, this.props.count)
      .then(suggestions => {
        this.setState({
          suggestions,
          loading: false,
          error: false,
          showSuggestions: true,
        });
      })
      .catch(e => {
        console.warn(e);
        this.setState({
          error: true
        });
      });
  };

  onChange = (e) => {
    const query = e.target.value;
    this.setState({
      query,
      selected: -1
    });

    const {minChars} = this.props;
    if (query.length >= minChars) {
      this.fetchData(query);
    } else {
      this.setState({
        suggestions: [],
      });
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(query);
    }
  };

  handleKeyPress = (e) => {

    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return;
    }

    const arrowDownKey = 40, arrowUpKey = 38, enterKey = 13, escapeKey = 27, tabKey = 9;

    if ([arrowDownKey, arrowUpKey, enterKey, escapeKey, tabKey].includes(e.which)) {
      e.preventDefault();

      const { selected, suggestions } = this.state;
      const maxSuggestionIndex = suggestions.length - 1;

      if (maxSuggestionIndex === -1) {
        return;
      }

      if (e.which === arrowUpKey) {
        this.setState({
          selected: selected > 0 ? selected - 1 : maxSuggestionIndex
        });
      }
      if (e.which === arrowDownKey) {
        this.setState({
          selected: selected < maxSuggestionIndex ? selected + 1 : 0
        });
      }
      if ((e.which === enterKey || e.which === tabKey) && selected !== -1) {
        this.onSelect(selected)();
      }
      if (e.which === escapeKey) {
        this.makeListInvisible();
      }
    }
  };

  onSelect = (index) => () => {
    const selectedSuggestion = this.state.suggestions[index];
    const query = this.selectedSuggestionFormatter(selectedSuggestion);

    this.setState({
      selected: index,
      showSuggestions: false,
      query
    });

    const { onSelect } = this.props;
    onSelect(selectedSuggestion)
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

  makeListVisible = () => {
    const { showSuggestions } = this.state;
    if (showSuggestions) {
      return
    }
    this.setState({showSuggestions: true});
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
      <div>
        <QueryInput
          onChange={ this.onChange }
          loading={ loading }
          query={ query }
          onMouseDown={ this.makeListVisible }
          onKeyPress={ this.handleKeyPress }
        />

        <SuggestionsList
          suggestions={ suggestions }
          hint={ this.props.hint }
          visible={ showSuggestions }
          onSelect={this.onSelect}
          selected={selected}
          suggestionsFormatter={this.suggestionsFormatter}
        />
      </div>
    );
  }
}

DadataSuggestions.propTypes = {
  token: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  //deferRequestBy: PropTypes.number.isRequired, // doesn't work with fetch Api
  hint: PropTypes.string.isRequired,
  minChars: PropTypes.number.isRequired,
  geolocation: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,

  //handlers:
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  suggestionsFormatter: PropTypes.func,
  selectedSuggestionFormatter: PropTypes.func,
};
DadataSuggestions.defaultProps = {
  count: 10,
  //deferRequestBy: 300,
  minChars: 3,
  geolocation: true,
  hint: 'Выберите вариант ниже или продолжите ввод',
  noSuggestionsHint: 'Неизвестный адрес',
  query: '',
  service: 'address',
};

export default DadataSuggestions;
