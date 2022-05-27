import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

// Test data
import { testGamerData } from '../../testData/testGamerData'

// Styles
import styles from './index.module.scss'

// Images
import ava from '../../assets/images/gamer.jpg'

// Components
import SettingsItem from './SettingsItem'
import inst from '../../assets/images/inst.svg'
import Button from '../modules/Button/Button'
import { authService } from '../../services';
import { useSelector } from 'react-redux';

const Settings = ({ closeSettings }) => {
    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies(['metapoly_user']);
    const [isDeleting, setIsDeleting] = useState(false)
    const _USER = useSelector(state => state.common.user)

    return (
        <div className={styles.settings}>
            <div className={styles.settingsBack} onClick={closeSettings}>
                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='512' height='512' x='0' y='0'
                    viewBox='0 0 447.243 447.243'>
                    <path
                        d='M420.361,192.229c-1.83-0.297-3.682-0.434-5.535-0.41H99.305l6.88-3.2c6.725-3.183,12.843-7.515,18.08-12.8l88.48-88.48    c11.653-11.124,13.611-29.019,4.64-42.4c-10.441-14.259-30.464-17.355-44.724-6.914c-1.152,0.844-2.247,1.764-3.276,2.754    l-160,160C-3.119,213.269-3.13,233.53,9.36,246.034c0.008,0.008,0.017,0.017,0.025,0.025l160,160    c12.514,12.479,32.775,12.451,45.255-0.063c0.982-0.985,1.899-2.033,2.745-3.137c8.971-13.381,7.013-31.276-4.64-42.4    l-88.32-88.64c-4.695-4.7-10.093-8.641-16-11.68l-9.6-4.32h314.24c16.347,0.607,30.689-10.812,33.76-26.88    C449.654,211.494,437.806,195.059,420.361,192.229z'
                        fill='#000000' data-original='#000000' />
                </svg>
            </div>
            <h3 className={styles.settingsTitle}>
                Settings
            </h3>
            <div className={styles.settingsSubtitle}>
                Profile:
            </div>
            <SettingsItem
                field={'Username'}
                inputType={'text'}
                placeholder={'Username'}
                label={'Username'}
                value={_USER?.username}
            />
            <SettingsItem
                field={'Profile picture'}
                oldImage={_USER?.profile_picture || ava}
            />
            <SettingsItem
                field={'Email'}
                inputType={'email'}
                placeholder={'Email'}
                label={'Email'}
                value={_USER?.email}
                validation={'|email'}
            />
            <SettingsItem
                field={'Password'}
                inputType={'password'}
                placeholder={'Password'}
                label={'Password'}
                disabled={false}
                value={''}
                validation={'|min:8'}
            />
            <div className={styles.settingsBottom}>
                <div className={styles.settingsBottomFollow}>
                    Follow us: TheMetaPolyGame
                </div>
                <a className={styles.settingsBottomInst} href='https://instagram.com' rel='noreferrer' target='_blank'>
                    <img src={inst} alt='inst' />
                </a>
                <div className={styles.settingsBottomContact}>
                    Contact: <a href='mailto:Hello@MetaPoly.de'>Hello@MetaPoly.de</a>
                </div>
                <div className={styles.settingsBottomBtns}>
                    {
                        isDeleting ? (<>
                            <Button className={styles.settingsBottomBtn} type={'button'}
                                onClick={() => setIsDeleting(false)} red>
                                Cancel
                            </Button>
                            <Button className={styles.settingsBottomBtn} type={'button'}
                                onClick={() => {
                                    removeCookie('metapoly_user')
                                    removeCookie('is_logged')
                                    navigate('/login')
                                }}>
                                Yes, Delete
                            </Button>
                        </>) : (
                            <Button className={styles.settingsBottomBtn} type={'button'}
                                onClick={() => setIsDeleting(true)} red>
                                Delete Account
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Settings
