import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './stores';
import createHistory from 'history/createBrowserHistory';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
const history = createHistory();

render(
    <Provider {...RootStore} >
        <Router history={history}>
            <Switch>
                <Route path="/user" render={props => <UserLayout {...props}/>} />
                <Route path="/" render={props => <BasicLayout {...props} />} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);