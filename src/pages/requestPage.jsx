'use strict';

import Button from '../components/button.jsx';
import CommandList from '../components/commandList.jsx';
import Endpoint from '../constants/endpoints';
import TextInput from '../components/textInput.jsx';

import axios from 'axios';
import React from 'react';

export default class RequestPage extends React.Component {
    constructor() {
        super();

        this.state = {
            statusText: '',
            selectedCommand: '',
            enteredText: ''
        }
    }

    componentDidMount() {
        document.title = 'ToukaBot - Make Request';
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    submitButtonClick() {
        var request = {};
        request['command'] = this.refs.commandList.state.selectedCommand;
        request['url'] = this.refs.submittedUrl.state.enteredText;

        this.serverRequest =
            axios
                .post(
                    Endpoint.ToukaBotRequests + '/request',
                    JSON.stringify(request)
                )
                .then(function(response) {
                    if (response.data.success) {
                        this.setState({ statusText: 'Request successfully added!' });
                        this.refs.submittedUrl.clear();
                    } else {
                        this.setState({ statusText: 'Unable to add request.' });
                    }
                }.bind(this))
                .catch(function(error) {
                    this.setState({ statusText: 'Unable to add request.' });
                }.bind(this))
    }

    render() {
        return (
            <div className='centeredContent'>
                <h2>Add Image</h2>
                <p>{this.state.statusText}</p>
                <table className='centeredTable transparentTable'>
                    <tbody>
                        <tr>
                            <td>Command:</td>
                            <td><CommandList ref='commandList' /></td>
                        </tr>
                        <tr>
                            <td>Image URL:</td>
                            <td><TextInput ref='submittedUrl' /></td>
                        </tr>
                    </tbody>
                </table>
                <p><Button text='Submit' clickHandler={this.submitButtonClick.bind(this)} /></p>
                <p><a href='/images'>Current Images</a></p>
            </div>
        );
    }
}