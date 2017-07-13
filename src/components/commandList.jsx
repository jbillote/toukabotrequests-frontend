'use strict';

import Endpoints from '../constants/endpoints';

import React from 'react';
import axios from 'axios';

export default class CommandList extends React.Component {
    constructor() {
        super();

        this.state = {
            commands: ['Loading...'],
            selectedCommand: 'Loading...',
            disabled: true
        }
    }

    componentDidMount() {
        this.serverRequest =
            axios
                .get('/api/bot/commands')
                .then(function(response) {
                    var commandList = [];

                    response.data.commands.forEach(function(e) {
                        commandList.push(e)
                    });

                    this.setState({
                        commands: commandList,
                        selectedCommand: commandList[0],
                        disabled: false
                    });
                }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleChange(e) {
        this.setState({
            selectedCommand: e.target.value
        });
    }

    render() {
        var commandList = [];
        this.state.commands.slice().forEach(function(e) {
            commandList.push(<option key={e} value={e}>{e}</option>);
        });

        return (
            <select onChange={this.handleChange.bind(this)}
                    value={this.state.selectedCommand}
                    disabled={this.state.disabled}
            >
                {commandList}
            </select>
        );
    }
}