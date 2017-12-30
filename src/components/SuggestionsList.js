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
              key={ suggestion.value }
              suggestion={ suggestion }
              index={index}
              selected={index===selected}
              onSelect={props.onSelect(index)}
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
};
SuggestionsList.defaultProps = {
};

export default SuggestionsList;
