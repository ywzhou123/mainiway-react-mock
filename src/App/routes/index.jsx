import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AsyncComponent from '../../Public/components/AsyncComponent'

export default class RootRouter extends Component{
    render(){
        return (
            <Switch>
                <Route path="/" component={() => <div>welcome</div>} exact/>
                <Route path="/calendar" component={AsyncComponent(() => import('./Calendar'))} />
                <Route path="/grades" component={AsyncComponent(() => import('./Grades'))} />
                <Route path="/messages" component={AsyncComponent(() => import('./Messages'))} />
                <Route path="/profile" component={AsyncComponent(() => import('./Profile'))} />
                <Route component={() => <div>no fount</div>} />
            </Switch>
        )
    }    
}
