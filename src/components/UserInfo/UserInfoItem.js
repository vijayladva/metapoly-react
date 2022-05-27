import React from 'react'

// Utils
import { priceFormatting } from '../../utils/priceFormatting'
import { findType } from '../../utils/findType'

// Styles
import styles from './index.module.scss'

// Components
import Icon from '../modules/Icon/Icon'
import Button from '../modules/Button/Button'

const UserInfoItem = ({business, gamer, sellBusiness}) => {
    return (
        <div className={styles.userInfoBusiness}>
            <div className={styles.userInfoBusinessWrap}>
                <Icon className={styles.userInfoBusinessIcon} type={findType(business.types)} />
                <div className={styles.userInfoBusinessName}>
                    {business.name}
                </div>
            </div>
            <div className={styles.userInfoBusinessMoney}>
                {priceFormatting(business.income, true)}
            </div>
            <div className={styles.userInfoBusinessMoney}>
                {(business.rating / 7).toFixed(1)}%
            </div>
            {
                gamer && <Button className={styles.userInfoBusinessBtn} type={'button'} onClick={() => sellBusiness(business)} red>
                    Sell
                </Button>
            }
        </div>
    )
}

export default UserInfoItem
