import React from 'react';
import PropTypes from 'prop-types';

const QueryInput = (props) => {
    const {loading} = props;
    const className = `suggestions-input${loading ? ' loading' : '' }`;
    return (
      <input
        type="text"
        className={className}
        onChange={props.onChange}
        value={props.query}
        onMouseDown={props.onMouseDown}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyPress}
      />
    );
};

QueryInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
};

QueryInput.defaultProps = {
  loading: false
};

export default QueryInput;
