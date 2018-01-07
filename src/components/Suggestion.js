import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuggestionValue from './SuggestionValue';
import SuggestionSubtext from './SuggestionSubtext';

class Suggestion extends Component {

  state = {
    hover: false,
  };

  handleHover = () => this.setHover(true);
  handleBlur = () => this.setHover(false);

  render() {
    const { selected, highlighting, searchWords, subtext, value } = this.props;
    const selectedClass = selected || this.state.hover ? ' suggestions-selected' : '';
    return (
      <div
        className={ `suggestions-suggestion${selectedClass}` }
        onMouseEnter={ this.handleHover }
        onMouseLeave={ this.handleBlur }
        onMouseDown={ this.props.onSelect }
      >
        <SuggestionValue
          {...{ highlighting, searchWords, value }}
        />
        <SuggestionSubtext>{ subtext }</SuggestionSubtext>
      </div>
    )
  };

  setHover = (hover) => {
    this.setState({ hover });
  };
}

Suggestion.propTypes = {
  selected: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  searchWords: PropTypes.array.isRequired,
  highlighting: PropTypes.bool.isRequired,
};
Suggestion.defaultProps = {};

export default Suggestion;
