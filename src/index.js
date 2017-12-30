import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/styles.less';

import SuggestionsList from './components/SuggestionsList';
import QueryInput from './components/QueryInput';

import Api from './api/FetchApi';

class DadataSuggestions extends Component {

  constructor(props) {
    super(props);
    const {token} = props;
    this.api = new Api(token, props.geolocation);
  }

  state = {
    query: this.props.query,
    suggestions: [],
    selected: -1,
    loading: false,
    error: false,
    showSuggestions: false
  };

  fetchData = async (query) => {
    this.setState({
      loading: true,
    });

    try {
      const suggestions = await this.api.address(query, this.props.count);
      this.setState({
        suggestions,
        loading: false,
        error: false,
        showSuggestions: true,
      });
    } catch (e) {
      console.warn(e);
      this.setState({
        error: true
      });
    }
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
    const query = selectedSuggestion.value;

    this.setState({
      selected: index,
      showSuggestions: false,
      query
    });

    const { onSelect } = this.props;
    onSelect(selectedSuggestion)
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

  //handlers:
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func
};
DadataSuggestions.defaultProps = {
  count: 10,
  //deferRequestBy: 300,
  minChars: 3,
  geolocation: true,
  hint: 'Выберите вариант ниже или продолжите ввод',
  noSuggestionsHint: 'Неизвестный адрес',
  query: ''
};

export default DadataSuggestions;
