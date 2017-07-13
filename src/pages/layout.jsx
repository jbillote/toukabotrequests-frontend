'use strict';

import React from 'react';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1 className='pageTitle'>ToukaBot</h1>
                    </header>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}