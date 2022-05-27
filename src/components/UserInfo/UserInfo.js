import React, { useEffect, useState } from 'react'

// Utils
import { priceFormatting } from '../../utils/priceFormatting'

// Test data
import { testUserData } from '../../testData/testUserData'
import { testGamerData } from '../../testData/testGamerData'

// Styles
import styles from './index.module.scss'

// Images
import ava from '../../assets/images/ava.jpg'
import gamerAva from '../../assets/images/gamer.jpg'
import settings from '../../assets/images/settings.svg'

// Components
import CloseBtn from '../modules/CloseBtn/CloseBtn'
import Icon from '../modules/Icon/Icon'

// Chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { chartOptions, chartTestData } from '../../testData/chartTestData'
import Button from '../modules/Button/Button'
import Settings from '../Settings/Settings'
import UserInfoItem from './UserInfoItem'
import Faq from '../Faq/Faq'
import cn from 'classnames'
import { useSelector } from 'react-redux'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const UserInfo = ({ closeUserInfo, gamer, sellBusiness, faq }) => {
    const [content, setContent] = useState('user')
    const _USER = useSelector(state => state.common?.user)
    useEffect(() => {
        if (faq)
            setContent('faq')
        else
            setContent('user')
    }, [faq])

    return (
        <div className={styles.userInfo}>
            {
                content === 'user' && (
                    <>
                        {
                            gamer && (
                                <div className={styles.userInfoBtnsWrap}>
                                    <div className={styles.userInfoSettings} onClick={() => setContent('settings')}>
                                        <img src={settings} alt='settings' />
                                    </div>
                                    <div className={styles.userInfoFaqBtn} onClick={() => setContent('faq')}>
                                        <svg width="19" height="31" viewBox="0 0 19 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.875 9.875C18.875 7.3886 17.8873 5.00403 16.1291 3.24587C14.371 1.48772 11.9864 0.5 9.5 0.5C7.0136 0.5 4.62903 1.48772 2.87087 3.24587C1.11272 5.00403 0.125 7.3886 0.125 9.875C0.125 10.3723 0.322544 10.8492 0.674175 11.2008C1.02581 11.5525 1.50272 11.75 2 11.75C2.49728 11.75 2.97419 11.5525 3.32582 11.2008C3.67746 10.8492 3.875 10.3723 3.875 9.875C3.875 8.76248 4.2049 7.67494 4.82298 6.74992C5.44107 5.82489 6.31957 5.10392 7.34741 4.67818C8.37524 4.25243 9.50624 4.14104 10.5974 4.35808C11.6885 4.57513 12.6908 5.11085 13.4775 5.89752C14.2641 6.6842 14.7999 7.68647 15.0169 8.77762C15.234 9.86876 15.1226 10.9998 14.6968 12.0276C14.2711 13.0554 13.5501 13.9339 12.6251 14.552C11.7001 15.1701 10.6125 15.5 9.5 15.5C9.00272 15.5 8.52581 15.6975 8.17418 16.0492C7.82254 16.4008 7.625 16.8777 7.625 17.375V21.125C7.625 21.6223 7.82254 22.0992 8.17418 22.4508C8.52581 22.8025 9.00272 23 9.5 23C9.99728 23 10.4742 22.8025 10.8258 22.4508C11.1775 22.0992 11.375 21.6223 11.375 21.125V19.0625C13.4926 18.6303 15.3957 17.4797 16.7624 15.8054C18.1292 14.1312 18.8754 12.0362 18.875 9.875Z" fill="black" />
                                            <path d="M9.5 30.5C10.5355 30.5 11.375 29.6605 11.375 28.625C11.375 27.5895 10.5355 26.75 9.5 26.75C8.46447 26.75 7.625 27.5895 7.625 28.625C7.625 29.6605 8.46447 30.5 9.5 30.5Z" fill="black" />
                                        </svg>
                                    </div>
                                </div>
                            )
                        }
                        <CloseBtn className={styles.userInfoClose} onClick={closeUserInfo} />
                        <h3 className={styles.userInfoTitle}>
                            Profile
                        </h3>
                        <img className={styles.userInfoAva} src={_USER?.profile_picture ||  ava} alt='ava' />
                        <div className={styles.userInfoName}>
                            {_USER.username}
                        </div>
                        <div className={styles.userInfoMoney}>
                            <div className={styles.userInfoMoneyItem}>
                                Net Worth
                                <span>{priceFormatting(_USER?.net_worth)}</span>
                            </div>
                            <div className={styles.userInfoMoneyItem}>
                                Balance
                                <span>{priceFormatting(_USER?.current_balance)}</span>
                            </div>
                        </div>
                        <div className={styles.userInfoChart}>
                            <Line options={chartOptions} data={chartTestData} type={'line'} />
                        </div>
                        <div className={styles.userInfoSubtitle}>
                            Properties:
                        </div>
                        <div className={cn({
                            [styles.userInfoHeader]: true,
                            [styles.userInfoHeaderGamer]: gamer,
                        })}>
                            <div className={cn({
                                [styles.userInfoHeaderItem]: true,
                                [styles.userInfoHeaderItemName]: true,
                            })}>
                                Name
                            </div>
                            <div className={cn({
                                [styles.userInfoHeaderItem]: true,
                                [styles.userInfoHeaderItemValue]: true,
                            })}>
                                Value
                            </div>
                            <div className={cn({
                                [styles.userInfoHeaderItem]: true,
                                [styles.userInfoHeaderItemValue]: true,
                            })}>
                                Trend
                            </div>
                        </div>
                        <div className={styles.userInfoProperties}>
                            {
                                gamer
                                    ? testGamerData.properties.length > 0 && testGamerData.properties.map(business => (
                                        <UserInfoItem business={business} key={business.place_id} gamer={gamer}
                                            sellBusiness={sellBusiness} />
                                    ))
                                    : testUserData.properties.length > 0 && testUserData.properties.map(business => (
                                        <UserInfoItem business={business} key={business.place_id} gamer={gamer} />
                                    ))
                            }
                        </div>
                    </>
                )
            }

            {
                content === 'settings' && <Settings closeSettings={() => setContent('user')} />
            }

            {
                content === 'faq' && <Faq closeSettings={() => setContent('user')} />
            }
        </div>
    )
}

export default UserInfo
