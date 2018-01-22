import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const PrivateRoute = ({ userStore, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        userStore.isLogin ?
            <Component {...props} /> :
            <Redirect
                to={{
                    pathname: rest.toPath || '/user/login',
                    search: `?from=${rest.path}`,
                }}
            />
    )} />
)
const AsyncRoute = withRouter(inject('userStore')(observer(PrivateRoute)));

export default AsyncRoute;
