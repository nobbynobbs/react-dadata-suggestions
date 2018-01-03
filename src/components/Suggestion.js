import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

class Suggestion extends Component {

  state = {
    hover: false,
  };

  handleHover = () => this.setHover(true);
  handleBlur = () => this.setHover(false);

  render() {
    const { selected, suggestion, highlighting } = this.props;
    const selectedClass = selected || this.state.hover ? ' suggestions-selected' : '';
    return (
      <div
        className={ `suggestions-suggestion${selectedClass}` }
        onMouseEnter={ this.handleHover }
        onMouseLeave={ this.handleBlur }
        onMouseDown={ this.props.handleSelect }
      >
      {
        highlighting ? <Highlighter
          //highlightClassName=''
          searchWords={ this.props.searchWords }
          autoEscape={ true }
          textToHighlight={ this.props.formatter(suggestion) }
          /> : this.props.formatter(suggestion)
      }
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
  searchWords: PropTypes.array.isRequired,
  highlighting: PropTypes.bool.isRequired,
};
Suggestion.defaultProps = {};

export default Suggestion;
