import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

const Forgot = () => {
    const navigate = useNavigate()
    const validator = useRef(new Validator({ autoForceUpdate: { forceUpdate: useForceUpdate() } }));
    const [content, setContent] = useState('default')
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [token, setToken] = useState('');
    const [data, setData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = () => {
        if (validator.current.allValid()) {
            if (isLoader) return
            setIsLoader(true)
            if (content === 'default') {
                authService.forgotPassword({ email }).then(res => {
                    setIsLoader(false)
                    if (res?.data?.code === 200) {
                        validator.current.hideMessages()
                        toast(res?.data?.message, { type: 'success' })
                        setContent('code')
                    }
                    else toast(res?.data?.message || 'Something went wrong!', { type: 'error' })
                })
            } else if (content === 'code') {
                authService.verifyForgotPassCode({ email, code }).then(res => {
                    setIsLoader(false)
                    if (res?.data?.code === 200) {
                        validator.current.hideMessages()
                        setToken(res?.data?.data?.token)
                        setContent('new-pass')
                    }
                    else toast(res?.data?.message || 'Something went wrong!', { type: 'error' })
                })
            } else if (content === 'new-pass') {
                authService.resetPassword({ token, password: data.password }).then(res => {
                    setIsLoader(false)
                    if (res?.data?.code === 200) {
                        navigate('/login')
                        toast(res?.data?.message, { type: 'success' })
                    }
                    else toast(res?.data?.message || 'Something went wrong!', { type: 'error' })
                })
            }
        } else validator.current.showMessages()
    }
    return (
        <div className={styles.forgot}>
            <h1 className='main-title'>
                Metapoly
            </h1>
            <AuthBg />
            <AuthForm title={'Forgot Password'} onSubmit={handleSubmit}>
                {
                    content === 'default' && (<>
                        <InputGroup label={'E-mail'} placeholder={'E-mail'} id={'forgotEmail'} onChange={e => setEmail(e)}
                            hasError={validator.current.message("E-mail", email, "required|email")} />
                        {isLoader ? <Rings wrapperClass={styles.loader} color="#f6b830" height={80} width={80} /> : <Button type={'submit'}>
                            Send me a code
                        </Button>}
                    </>)
                }

                {
                    content === 'code' && (<>
                        <InputGroup label={'Code'} placeholder={'Code'} id={'forgotCode'} onChange={e => setCode(e)}
                            hasError={validator.current.message("Code", code, "required")} />
                        {isLoader ? <Rings wrapperClass={styles.loader} color="#f6b830" height={80} width={80} /> : <Button type={'submit'}>
                            Check code
                        </Button>}
                    </>)
                }

                {
                    content === 'new-pass' && (<>
                        <InputGroup label={'New Password'} placeholder={'xxxxxx'} id={'newPassword'} type={'password'} onChange={e => setData({ ...data, password: e })}
                            hasError={validator.current.message("password", data?.password, "required|min:8")} />
                        <InputGroup label={'Confirm New Password'} placeholder={'xxxxxx'} id={'confirmNewPassword'} type={'password'} onChange={e => setData({ ...data, confirmPassword: e })}
                            hasError={validator.current.message("Confirm password", data?.confirmPassword,
                                `required|min:8|in:${data?.password}`, { messages: { in: 'Password and Confirm password need to match.' } })} />
                        {isLoader ? <Rings wrapperClass={styles.loader} color="#f6b830" height={80} width={80} /> : <Button type={'submit'}>
                            Change Password
                        </Button>}
                    </>)
                }
            </AuthForm>
        </div>
    )
}

export default Forgot
