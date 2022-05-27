import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

const Button = ({type, children, onClick, small, className, red}) => {
    return (
        <button className={cn({
            [styles.button]: true,
            [styles.buttonSmall]: small,
            [className]: className,
            [styles.buttonRed]: red,
        })} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
