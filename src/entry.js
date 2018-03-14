import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './stores';
import MockComp from './views/MockComp';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

render(
    <Provider {...RootStore} >
        <Router history={history}>
            <Switch>
                <Route path="/" component={MockComp} />
                <Redirect from='*' to='/' />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);