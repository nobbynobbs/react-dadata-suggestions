import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

const SuggestionValue = ({highlighting, searchWords, value, status}) => {
  return (
    <span className="suggestions-value" data-suggestion-status={ status }>
      {
        highlighting ? <Highlighter
          highlightClassName="suggestions-highlighting"
          searchWords={ searchWords }
          autoEscape={ true }
          textToHighlight={ value }
        /> : value
      }
    </span>
  );
};

SuggestionValue.propTypes = {
  highlighting: PropTypes.bool.isRequired,
  searchWords: PropTypes.array,
  value: PropTypes.string.isRequired,
};
SuggestionValue.defaultProps = {
  highlighting: true,
};

export default SuggestionValue;
