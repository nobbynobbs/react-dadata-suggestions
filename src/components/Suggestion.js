import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Suggestion extends Component {

  state = {
    hover: false,
  };

  handleHover = () => this.setHover(true);
  handleBlur = () => this.setHover(false);

  render() {
    const { selected, suggestion } = this.props;
    const selectedClass = selected || this.state.hover ? ' suggestions-selected' : '';
    return (
      <div
        className={ `suggestions-suggestion${selectedClass}` }
        onMouseEnter={ this.handleHover }
        onMouseLeave={ this.handleBlur }
        onMouseDown={ this.props.onSelect }
      >
        { this.props.formatter(suggestion) }
      </div>
    )
  };

  setHover = (hover) => {
    this.setState({ hover });
  };
}

Suggestion.propTypes = {
  selected: PropTypes.bool.isRequired,
  formatter: PropTypes.func.isRequired,
};
Suggestion.defaultProps = {};

export default Suggestion;
