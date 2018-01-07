import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

const SuggestionValue = ({highlighting, searchWords, value}) => {
  return (
    <span className="suggestions-value">
      {
        highlighting ? <Highlighter
          //highlightClassName=''
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
