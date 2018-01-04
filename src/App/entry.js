import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import AppStore from './stores/AppStore'

const root = document.getElementById('root');
ReactDom.render(
    <Provider store={new AppStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    root
);