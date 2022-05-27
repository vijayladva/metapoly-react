import React from 'react'

// Styles
import styles from './index.module.scss'

// Images
import user from '../../assets/images/user.svg'
import map from '../../assets/images/map.svg'
import faq from '../../assets/images/faq.svg'

const MobileMenu = ({showUser, openMap, openFaq}) => {
    return (
        <div className={styles.mobileMenu}>
            <button className={styles.mobileMenuBtn} onClick={showUser}>
                <img src={user} alt='icon'/>
            </button>
            <button className={styles.mobileMenuBtn} onClick={openMap}>
                <img src={map} alt='icon'/>
            </button>
            <button className={styles.mobileMenuBtn} onClick={openFaq}>
                <img src={faq} alt='icon'/>
            </button>
        </div>
    )
}

export default MobileMenu
