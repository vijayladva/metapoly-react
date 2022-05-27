import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

// Styles
import './assets/styles/general.scss'
import './assets/styles/app.scss'
import './assets/styles/searchAutocomplete.scss'

// Components
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Forgot from './pages/Forgot/Forgot'
import Game from './pages/Game/Game'


// Depenencies
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import { setToken } from './services/api';


const App = () => {
    const [cookie, setCookie] = useCookies(['metapoly_user']);
    const navigate = useNavigate();
    useEffect(() => {

        // if user loggedIn then setToken in the API Authorization
        if (cookie?.is_logged && cookie?.metapoly_user) {
            setToken(`${cookie.metapoly_user.token.tokenType} ${cookie.metapoly_user.token.accessToken}`)
            navigate('/game');
        }
    }, []);

    return (
        <div className='app'>
            <Routes>
                <Route path='/login' element={<Login />} exact />
                <Route path='/register' element={<Register />} exact />
                <Route path='/forgot-password' element={<Forgot />} exact />
                <Route path='/game' element={<Game />} exact />
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
            <ToastContainer position="top-right" pauseOnHover closeOnClick theme='colored' />
        </div>
    )
}

export default App
