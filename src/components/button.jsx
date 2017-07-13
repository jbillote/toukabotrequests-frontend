'use strict';

import PropTypes from 'prop-types';
import React from 'react';

export default class Button extends React.Component {
    render() {
        return (
            <input type='button'
                   value={this.props.text}
                   onClick={this.props.clickHandler}
            />
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func
};