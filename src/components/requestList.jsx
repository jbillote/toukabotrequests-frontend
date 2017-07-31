'use strict';

import Button from '../components/button.jsx';

import Responses from '../constants/requestResponse'

import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

class RequestListRow extends React.Component {
    approveRequest() {
        this.serverRequest =
            axios
                .post('/api/requests/approve',
                    this.props.request)
                .then(function(response) {
                    if (response.data.success) {
                        this.props.changeStatusText(Responses.approveSuccess);
                        this.props.removeRequest(this.props.index);
                    } else {
                        this.props.changeStatusText(Responses.approveFailure);
                    }
                }.bind(this))
                .catch(function(err) {
                    if (err.response) {
                        console.log(err);
                        this.props.changeStatusText(Responses.approveFailure);
                    }
                }.bind(this));
    }

    declineRequest() {
        this.serverRequest =
            axios({
                method: 'delete',
                url: '/api/requests/decline',
                data: this.props.request
            }).then(function(response) {
                if (response.data.success) {
                    this.props.changeStatusText(Responses.declineSuccess);
                    this.props.removeRequest(this.props.index);
                } else {
                    this.props.changeStatusText(Responses.declineFailure);
                }
            }.bind(this)).catch(function(err) {
                if (err.response) {
                    console.log(err);
                    this.props.changeStatusText(Responses.declineFailure);
                }
            }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        var imageUrl = this.props.request.url,
            extension = imageUrl.slice(imageUrl.length - 4);

        return (
            <tr>
                <td>{this.props.request.command}</td>
                <td>
                    {extension == 'gifv' ?
                        <video src={this.props.request.url} /> :
                        <img src={this.props.request.url} />
                    }
                </td>
                <td><Button text='Approve' clickHandler={this.approveRequest.bind(this)} /></td>
                <td><Button text='Decline' clickHandler={this.declineRequest.bind(this)}/></td>
            </tr>
        )
    }
}

RequestListRow.propTypes = {
    request: PropTypes.object.isRequired,
    changeStatusText: PropTypes.func.isRequired,
    removeRequest: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default class RequestList extends React.Component {
    constructor() {
        super();

        this.state = {
            requests: [],
            statusText: 'Loading...'
        }
    }

    componentDidMount() {
        this.serverRequest =
            axios
                .get('/api/requests')
                .then(function(response) {
                    var requests = [];

                    response.data.requests.forEach(function(e) {
                        requests.push(e);
                    });

                    this.setState({
                        requests: requests,
                        statusText: ''
                    });
                }.bind(this))
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeStatusText(t) {
        this.setState({ statusText: t });
    }

    removeRequest(i) {
        var requests = this.state.requests.slice();
        requests.splice(i, 1);

        this.setState({ requests: [] });
        this.setState({ requests: requests });
    }

    render() {
        var rows = [];

        this.state.requests.forEach(function(r, i) {
            rows.push(<RequestListRow key={i}
                                      request={r}
                                      changeStatusText={this.changeStatusText.bind(this)}
                                      removeRequest={this.removeRequest.bind(this)}
                                      index={i}
            />)
        }.bind(this));

        return (
            <div>
                <p>{this.state.statusText}</p>
                <table className='imageTable'>
                    <thead>
                        <tr>
                            <th>Command</th>
                            <th>Image</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}