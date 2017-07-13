'use strict';

import Images from './pages/images.jsx';
import Layout from './pages/layout.jsx';
import LoginPage from './pages/login.jsx';
import RequestPage from './pages/requestPage.jsx';
import ManageRequests from './pages/manageRequests.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import '../style/main.less';

const Routes = (
    <Route path='/' component={Layout}>
        <IndexRoute component={RequestPage} />

        <Route path='submitRequest' component={RequestPage} />
        <Route path='images' component={Images} />
        <Route path='manageRequests' component={ManageRequests} />
        <Route path='login' component={LoginPage} />
    </Route>
);

ReactDOM.render((
    <Router history={browserHistory} routes={Routes} />
), document.getElementById('content'));