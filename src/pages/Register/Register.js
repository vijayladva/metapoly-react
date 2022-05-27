import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import AuthBg from '../../components/AuthBG/AuthBG'
import AuthForm from '../../components/modules/AuthForm/AuthForm'
import InputGroup from '../../components/modules/InputGroup/InputGroup'
import Button from '../../components/modules/Button/Button'
import Validator from "simple-react-validator";
import { useForceUpdate } from "../../components/modules/ErrorMessage/ErrorMessage";
import { authService } from "../../services";
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";


const Register = () => {
    const navigate = useNavigate()
    const validator = useRef(new Validator({ autoForceUpdate: { forceUpdate: useForceUpdate() } }));
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoader, setIsLoader] = useState(false);

    const handleSubmit = () => {
        if (validator.current.allValid()) {
            const data = { ...values }
            delete data.confirmPassword
            if (isLoader) return
            setIsLoader(true)
            authService.register(data).then(res => {
                setIsLoader(false)
                if (res?.data?.code === 201) {
                    setValues({
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: ''
                    })
                    navigate('/login')
                    toast(res.data?.message, { type: 'success' })
                } else if (res?.data?.code === 409) {
                    toast(res.data?.errors?.[0].messages[0], { type: 'error' })
                } else toast('Something went wrong!', { type: 'error' })
            })
        } else validator.current.showMessages()
    }
    const onChange = (value, name) => {
        setValues({ ...values, [name]: value })
    }
    return (
        <div className={styles.register}>
            <h1 className='main-title'>
                Metapoly
            </h1>
            <AuthBg />
            <AuthForm title={'register'} onSubmit={handleSubmit}>
                <InputGroup label={'E-mail'} placeholder={'E-mail'} id={'email'} onChange={onChange}
                    hasError={validator.current.message("E-mail", values?.email, "required|email")} />
                <InputGroup label={'Username'} placeholder={'Username'} id={'username'} onChange={onChange}
                    hasError={validator.current.message("Username", values?.username, "required")} />
                <InputGroup label={'Password'} placeholder={'xxxxxxxxx'} id={'password'} type={'password'} onChange={onChange}
                    hasError={validator.current.message("password", values?.password, "required|min:8")} />
                <InputGroup label={'Confirm Password'} placeholder={'xxxxxxxxx'} id={'confirmPassword'} type={'password'} onChange={onChange}
                    hasError={validator.current.message("Confirm password", values?.confirmPassword,
                        `required|min:8|in:${values?.password}`, { messages: { in: 'Password and Confirm password need to match.' } })} />
                {isLoader ? <Rings wrapperClass={styles.loader} color="#f6b830" height={80} width={80} /> :
                    <Button type={'submit'}>
                        Register
                    </Button>}
                <Link className='mini-link' to='/login'>Already have an account? Sign in!</Link>
            </AuthForm>
        </div>
    )
}

export default Register
