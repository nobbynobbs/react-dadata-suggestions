import React from 'react';
import PropTypes from 'prop-types';

const SuggestionSubtext = ({children}) => {
  return children ? <div className="suggestions-subtext">{children}</div> : null;
};


SuggestionSubtext.propTypes = {
  children: PropTypes.string
};
SuggestionSubtext.defaultProps = {};

export default SuggestionSubtext;
