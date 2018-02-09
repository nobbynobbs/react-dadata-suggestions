import React from 'react';
import PropTypes from 'prop-types';

const QueryInput = (props) => {
    const {loading} = props;
    const className = `suggestions-input${loading ? ' loading' : '' }`;
    return (
      <input
        type="text"
        className={ className }
        placeholder = { props.placeholder }
        onChange={ props.onChange }
        value={ props.query }
        onMouseDown={ props.onMouseDown }
        onKeyPress={ props.onKeyPress }
        onKeyDown={ props.onKeyPress }
        onBlur={ props.onBlur }
        onFocus={ props.onFocus }
      />
    );
};

QueryInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

QueryInput.defaultProps = {
  loading: false,
  placeholder: '',
};

export default QueryInput;
