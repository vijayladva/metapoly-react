import React from 'react'

// Styles
import styles from './index.module.scss'
import cn from 'classnames'

const CloseBtn = ({className, onClick}) => {
    return (
        <div
            className={cn({
                [styles.closeBtn]: true,
                [className]: className,
            })}
            onClick={onClick}
        >
            <span/>
            <span/>
        </div>
    )
}

export default CloseBtn
