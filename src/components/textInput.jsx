'use strict';

import React from 'react';

export default class TextInput extends React.Component {
    constructor() {
        super();

        this.state = {
            enteredText: ''
        }
    }

    clear() {
        this.state.enteredText = '';
    }

    handleChange(e) {
        if (this.props.changeHandler) {
            this.props.changeHandler(e);
        }

        this.setState({
            enteredText: e.target.value
        });
    }

    render() {
        return (
            <input type='text'
                   value={this.state.enteredText}
                   onChange={this.handleChange.bind(this)}
            />
        )
    }
}

TextInput.propTypes = {
    changeHandler: React.PropTypes.func
};