import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/admin';

export default class App extends Component {
    render() {
        // 有<Switch>标签，则其中的<Route>在路径相同的情况下，只匹配第一个，这个可以避免重复匹配；
        return <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Admin}/>
        </Switch>;
    }
}