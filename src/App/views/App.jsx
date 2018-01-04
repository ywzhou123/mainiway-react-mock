import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Routes from '../routes/index'

export default class App extends Component {
    componentDidMount() {
        // do something here3
    }

    render() {
        return [
            <div key="banner">
                <Link to="/">首页</Link>
                <br />
                <Link to="/detail">详情页</Link>
            </div>,
            <Routes key="routes" />,
        ]
    }
}
