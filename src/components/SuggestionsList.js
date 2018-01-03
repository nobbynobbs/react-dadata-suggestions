import React from 'react';
import PropTypes from 'prop-types';

import Suggestion from './Suggestion';

const SuggestionsList = (props) => {
  const { suggestions, visible, selected } = props;
  if (!!suggestions.length && visible) {
    return (
      <div className="suggestions-wrapper">
        <div className="suggestions-suggestions">
          <div className="suggestions-hint">{props.hint}</div>
          {suggestions.map((suggestion, index) =>
            <Suggestion
              key={ index }  /* @todo our planet needs something better than this */
              suggestion={ suggestion }
              index={ index }
              selected={ index===selected }
              formatter={ props.suggestionsFormatter }
              onSelect={ props.onSelect(index) }
              searchWords = { props.highlighting ? props.searchWords() : [] }
              highlighting = { props.highlighting }
            />)
          }
        </div>
      </div>
    );
  }
  return null;
};

SuggestionsList.propTypes = {
  suggestions: PropTypes.array.isRequired,
  hint: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  suggestionsFormatter: PropTypes.func.isRequired,
  searchWords: PropTypes.func.isRequired,
  highlighting: PropTypes.bool.isRequired,
};
SuggestionsList.defaultProps = {
};

export default SuggestionsList;
