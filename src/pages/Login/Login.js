import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import AuthBg from '../../components/AuthBG/AuthBG'
import AuthForm from '../../components/modules/AuthForm/AuthForm'
import InputGroup from '../../components/modules/InputGroup/InputGroup'
import Button from '../../components/modules/Button/Button'

// Dependencies
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import Validator from "simple-react-validator";
import { useForceUpdate } from "../../components/modules/ErrorMessage/ErrorMessage";
import { authService } from "../../services";
import { setToken } from '../../services/api';
import { useCookies } from "react-cookie";

const Login = () => {
    const validator = useRef(new Validator({ autoForceUpdate: { forceUpdate: useForceUpdate() } }));
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(['metapoly_user']);
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [isLoader, setIsLoader] = useState(false);
    const onClick = e => {
        if (validator.current.allValid()) {
            if (isLoader) return
            setIsLoader(true);
            authService.login(values).then(res => {
                setIsLoader(false);
                const { data, code, message } = res.data;
                if (code === 200) {
                    setCookie('metapoly_user', JSON.stringify(data));
                    setCookie('is_logged', true);
                    setToken(`${data.token.tokenType} ${data.token.accessToken}`)
                    navigate('/game');
                } else {
                    toast(message || 'Something went wrong!', { type: 'error' });
                }
            })
        } else {
            validator.current.showMessages()
        }
    }
    const onChange = (value, name) => {
        setValues({ ...values, [name]: value })
    }
    return (
        <div className={styles.login}>
            <h1 className='main-title'>
                Metapoly
            </h1>
            <AuthBg />
            <AuthForm title={'Login'} onSubmit={(e) => onClick(e)}>
                <InputGroup label={'Username'} placeholder={'Username'} id={'username'} onChange={onChange}
                    hasError={validator.current.message("Username", values?.username, "required")} />
                <InputGroup label={'Password'} placeholder={'xxxxxxxxx'} id={'password'} type={'password'} forgotPass onChange={onChange}
                    hasError={validator.current.message("password", values?.password, "required|min:8")} />
                {
                    isLoader ? (<Rings wrapperClass={styles.loader} color="#f6b830" height={80} width={80} />) : (<Button type={'submit'}>
                        Login
                    </Button>)
                }


                <Link className='mini-link' to='/register'>Don’t have an account? Sign up!</Link>
            </AuthForm>
        </div>
    )
}

export default Login
