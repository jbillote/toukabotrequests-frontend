'use strict';

import React from 'react';

// TODO: Change to reuse existing components

export default class LoginPage extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        document.title = 'ToukaBot - Login';

        if (this.props.location.query['error']) {
            console.log('dicks');
        }
    }

    render() {
        return (
            <div className='centeredContent'>
                <h2>Login</h2>
                <h4 className='error-text'>{
                    this.props.location.query['error'] ? 'Unable to login' : ''
                }</h4>
                <form name='loginForm' action='/login' method='POST'>
                    <table className='centeredTable transparentTable'>
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td><input type='text' name='username' /></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type='password' name='password' /></td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <input name='submit' type='submit' value='Login' />
                    </p>
                </form>
            </div>
        )
    }
}