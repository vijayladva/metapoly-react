import React, { useEffect } from 'react'
import { useInput } from '../../../utils/hooks/useInput'
import { Link } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

const InputGroup = ({label, placeholder, id, type, forgotPass, value, disabled, smallMargin, onChange,hasError}) => {
    const input = useInput(value ? value : '')

    useEffect(() => {
        if (onChange)
            onChange(input.value,id)
    }, [input.value])

    return (
        <div className={cn({
            [styles.inputGroup]: true,
            [styles.inputGroupSmallMargin]: smallMargin
        })}>
            <label className={styles.inputGroupLabel} htmlFor={id}>{label}</label>
            <input className={cn({
                [styles.inputGroupInput]: true,
                [styles.inputGroupInputDisabled]: disabled,
            })}
                   type={type ? type : 'text'}
                   placeholder={placeholder}
                   id={id}
                   value={input.value}
                   onChange={e => {
                       if(id.toLowerCase().includes('username')) e.target.value = e.target.value.replace(/\s/g, "")
                    input.onChange(e.target.value)
                   }}
                   disabled={disabled}
            />
            <ErrorMessage hasError={hasError} className={styles.errorMessage}/>
            {
                forgotPass &&
                <Link className={styles.inputGroupForgot} to='/forgot-password'>Forgot your password?</Link>
            }
        </div>
    )
}

export default InputGroup
