import React from 'react';
import PropTypes from 'prop-types';

const QueryInput = (props) => {
    const {
      name, loading, placeholder, query, disabled, readOnly,
      onChange, onMouseDown, onKeyPress, onBlur, onFocus,
    } = props;
    const className = `suggestions-input${loading ? ' loading' : '' }`;
    return (
      <input
        type="text"
        className={ className }
        // props
        name={ name }
        autocomplete="off"
        placeholder = { placeholder }
        value={ query }
        disabled={ disabled }
        readOnly= { readOnly }
        // handlers
        onChange={ onChange }
        onMouseDown={ onMouseDown }
        onKeyPress={ onKeyPress }
        onKeyDown={ onKeyPress }
        onBlur={ onBlur }
        onFocus={ onFocus }
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
