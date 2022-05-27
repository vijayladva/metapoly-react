import React from 'react'

// Utils
import { findType } from '../../utils/findType'
import { priceFormatting } from '../../utils/priceFormatting'

// Styles
import styles from './index.module.scss'

// Components
import Icon from '../modules/Icon/Icon'
import Button from '../modules/Button/Button'
import CloseBtn from '../modules/CloseBtn/CloseBtn'

const PlaceInfo = ({data, closePlaceInfo, sellBusiness}) => {
    return (
        <div className={styles.placeInfo}>
            <div className={styles.placeInfoTop}>
                <Icon className={styles.placeInfoIcon} type={data.types ? findType(data.types) : data.type}/>
                <div className={styles.placeInfoName}>
                    {data.name}
                </div>
                <div className={styles.placeInfoType}>
                    {data.types ? findType(data.types).replaceAll('_', ' ') : data.type.replaceAll('_', ' ')}
                </div>
                <CloseBtn className={styles.placeInfoClose} onClick={closePlaceInfo} />
            </div>
            <div className={styles.placeInfoContent}>
                {
                    data.user_ratings_total && data.user_ratings_total > 10 ? (<>
                        <div className={styles.placeInfoPrice}>
                            {priceFormatting(data.user_ratings_total * 1000)}$
                        </div>
                        {
                            sellBusiness ? (<>
                                <div className={styles.placeInfoProfit}>
                                    Once you sold the property
                                    it can be bought by another user
                                    and you will no longer earn interest
                                </div>
                                <Button className={styles.placeInfoBtn} type={'button'} small red onClick={closePlaceInfo}>
                                    Sell
                                </Button>
                            </>) : (<>
                                <div className={styles.placeInfoProfit}>
                                    You will earn <span>{data.rating}%</span> daily interest on this property
                                </div>
                                <Button className={styles.placeInfoBtn} type={'button'} small onClick={closePlaceInfo}>
                                    Buy
                                </Button>
                            </>)
                        }
                    </>) : (
                        <div className={styles.placeInfoNoRate}>
                            You can't buy this business
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PlaceInfo
