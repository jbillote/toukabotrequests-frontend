'use strict';

import Button from '../components/button.jsx';
import CommandList from '../components/commandList.jsx';
import ImageList from '../components/imageList.jsx';

import React from 'react';

export default class Images extends React.Component {
    constructor() {
        super();

        this.state = {
            commands: [],
            selectedCommand: '',
            images: []
        }
    }

    componentDidMount() {
        document.title = 'ToukaBot - Images';
    }

    searchButtonClick() {
        var command = this.refs.commandList.state.selectedCommand;

        this.setState({ selectedCommand: command });
        this.refs.imageList.setState({ command: command });
        this.refs.imageList.populateImages(command)
    }

    render() {
        return (
            <div className='centeredContent'>
                <h2>Current Images</h2>

                <div>
                    <table className='centeredTable transparentTable'>
                        <tbody>
                            <tr>
                                <td><CommandList ref='commandList' /></td>
                                <td><Button text='Search' clickHandler={this.searchButtonClick.bind(this)} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <p><a href='/'>Submit Images</a></p>
                </div>
                <div>
                    <ImageList command={this.state.selectedCommand} ref='imageList' />
                </div>
            </div>
        );
    }
}
