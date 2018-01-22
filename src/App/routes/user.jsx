import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';
import AsyncRoute from './AsyncRoute';

export default class RootRouter extends React.Component {
    render() {
        return (
            <Switch>
                <AsyncRoute path="/user/info" component={() => <div>user</div>} />
                <Route path="/user/login" component={AsyncComponent(() => import('../views/User/Login'))} />
                <Route path="register" component={() => <div>register</div>} />
                <Route path="register-result" component={() => <div>register-result</div>} />
                <Route component={() => <div>no fount</div>} />
            </Switch>
        );
    }
}
