'use strict';

import React from 'react';

import RequestList from '../components/requestList.jsx';

export default class MangeRequests extends React.Component {
    componentDidMount() {
        document.title = 'ToukaBot - Mange Requests';
    }

    render() {
        return (
            <div className='centeredContent'>
                <div>
                    <h2>Requests</h2>
                    <p><a href='/images'>Current Images</a></p>
                </div>
                <div>
                    <RequestList />
                </div>
            </div>
        )
    }
}