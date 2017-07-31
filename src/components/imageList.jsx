'use strict';

import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

class ImageListRow extends React.Component {
    render() {
        var imageUrl = this.props.imageUrl.slice(),
            extension = imageUrl.slice(imageUrl.length - 4);

        return (
            <tr>
                <td>{this.props.command}</td>
                <td>
                    {extension == 'gifv' ? <img src={this.props.imageUrl.slice(0, this.props.imageUrl.length - 1)} /> :
                        <img src={this.props.imageUrl} />}
                </td>
            </tr>
        );
    }
}

ImageListRow.propTypes = {
    command: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
};

export default class ImageList extends React.Component {
    constructor() {
        super();

        this.state = {
            command: '',
            imageUrls: []
        }
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    populateImages(command) {
        this.serverRequest =
            axios
                .get('/api/bot/images/' + command)
                .then(function(response) {
                    var imageUrls = [];

                    response.data.images.forEach(function(e) {
                        imageUrls.push(e);
                    });

                    this.setState({ imageUrls: imageUrls })
                }.bind(this))
    }

    render() {
        var rows = [];

        this.state.imageUrls.forEach(function(e) {
            rows.push(<ImageListRow key={e}
                                    command={this.state.command}
                                    imageUrl={e} />)
        }.bind(this));

        return (
            <table className='imageTable'>
                <thead>
                    <tr>
                        <th>Command</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

ImageList.propTypes = {
    command: PropTypes.string.isRequired
};