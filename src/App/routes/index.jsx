import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';
import AsyncRoute from './AsyncRoute';

export default class RootRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={() => <div>welcome</div>} exact />
                {/* <AsyncRoute path="/MockDataList" component={AsyncComponent(() => import('../views/Mock/MockList'))} /> */}
                <Route path="/MockDataList" component={AsyncComponent(() => import('../views/Mock/MockList'))} />
                <Route path="/calendar" component={AsyncComponent(() => import('../views/Calendar'))} />
                <Route path="/grades" component={AsyncComponent(() => import('../views/Grades'))} />
                <Route path="/messages" component={AsyncComponent(() => import('../views/Messages'))} />
                <Route path="/profile" component={AsyncComponent(() => import('../views/Profile'))} />
                <Route component={() => <div>no fount</div>} />
            </Switch>
        );
    }
}
