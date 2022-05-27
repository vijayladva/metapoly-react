import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

const AuthForm = ({className, title, onSubmit, children}) => {
    const submitForm = e => {
        e.preventDefault()

        if (onSubmit) {
            onSubmit()
        }
    }

    return (
        <form
            className={cn({
                [className]: true,
                [styles.authForm]: true,
            })}
            onSubmit={submitForm}
        >
            <h4 className={styles.authFormTitle}>
                {title}
            </h4>
            {children}
        </form>
    )
}

export default AuthForm
