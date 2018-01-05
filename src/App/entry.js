import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, HashRouter , Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import AppStore from './stores/AppStore'
import createHistory from 'history/createBrowserHistory'
const history = createHistory();
import BasicLayout from './layouts/BasicLayout'
import UserLayout from './layouts/UserLayout'

render(
    <Provider store={AppStore}>
        <Router history={history}>
            <Switch>
                <Route path="/user" render={props => <UserLayout {...props}/>} />
                <Route path="/" render={props => <BasicLayout {...props} />} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)