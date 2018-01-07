import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

const SuggestionValue = ({highlighting, suggestion, searchWords, formatter}) => {
  return (
    <span className="suggestions-value">
      {
        highlighting ? <Highlighter
          //highlightClassName=''
          searchWords={ searchWords }
          autoEscape={ true }
          textToHighlight={ formatter(suggestion) }
        /> : formatter(suggestion)
      }
    </span>
  );
};

SuggestionValue.propTypes = {
  highlighting: PropTypes.bool.isRequired,
  suggestion: PropTypes.object.isRequired,
  searchWords: PropTypes.array,
  formatter: PropTypes.func,
};
SuggestionValue.defaultProps = {
  highlighting: true,
};

export default SuggestionValue;
