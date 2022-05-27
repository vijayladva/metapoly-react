import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

const Popup = ({children, user, gamer}) => {
    return (
        <div className={cn({
            [styles.popup]: true,
            [styles.popupUser]: user,
            [styles.popupGamer]: gamer,
        })}>
            <div className={styles.popupInner}>
                {children}
            </div>
        </div>
    )
}

export default Popup
