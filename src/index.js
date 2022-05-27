import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import {Provider} from "react-redux";
import store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <Router>
        <Provider store={store}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)
