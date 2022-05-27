import React, { useEffect, useRef, useState } from 'react'

// Utils
import { priceFormatting } from '../../utils/priceFormatting'
import { findType } from '../../utils/findType'
import { searchTypes } from '../../utils/searchTypes'

// Styles
import styles from './index.module.scss'

// Images
import ava from '../../assets/images/ava.jpg'

// Components
import Button from '../modules/Button/Button'
import Icon from '../modules/Icon/Icon'
import { useSelector } from 'react-redux'

const Search = ({map, setMapPosition, showInfo, showUser, closePopup, mobileView}) => {
    const inpRef = useRef()
    const _USER = useSelector(state => state.common.user)
    /*
        This state is for testing only.
        Each business should be checked by place_id on backend.
    */
    const [wasBought, setWasBought] = useState(false)

    const [showMobileAnim, setShowMobileAnim] = useState(false)

    const [businesses, setBusinesses] = useState([])
    const [loading, setLoading] = useState(false)

    const showCurrentCityInfo = location => {
        const service = new window.google.maps.places.PlacesService(map)
        const request = {
            location,
            rankBy: window.google.maps.places.RankBy.DISTANCE,
        }

        searchTypes.forEach(type => {
            service.nearbySearch({...request, type}, (results, status, pagination) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const slicedResults = results.length > 5 ?
                        results.splice(0, 5).filter(business => business.user_ratings_total > 10) :
                        results.filter(business => business.user_ratings_total > 10)

                    setBusinesses(businesses => [...businesses, ...slicedResults])
                }
            })
        })
    }

    const chooseCity = location => {
        setMapPosition(location, 13)
        setBusinesses([])
        showCurrentCityInfo(location)
    }

    const initAutocompleteSearch = () => {
        const options = {
            strictBounds: false,
            types: ['geocode', 'establishment'],
        }

        const autocomplete = new window.google.maps.places.Autocomplete(inpRef.current, options)

        autocomplete.addListener('place_changed', () => {
            const placeInfo = autocomplete.getPlace()
            closePopup()

            if (placeInfo.types.includes('country'))
                setMapPosition(placeInfo.geometry.location, 7)
            else if (placeInfo.types.includes('locality') || placeInfo.types.includes('political'))
                chooseCity(placeInfo.geometry.location)
            else {
                setMapPosition(placeInfo.geometry.location, 16)
                showInfo(placeInfo)
            }
        })
    }

    useEffect(() => {
        if (inpRef.current && map) {
            initAutocompleteSearch()
        }
    }, [inpRef, map])

    return (
        <div className={styles.search}>
            {
                businesses.length > 0 && (
                    <button className={styles.searchHide} type={'button'} onClick={() => setBusinesses([])}>
                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1'
                             width='512' height='512' x='0' y='0'
                             viewBox='0 0 451.847 451.847'>
                            <path
                                d='M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z'
                                fill='#000000' data-original='#000000'/>
                        </svg>
                    </button>
                )
            }
            {
                loading && (
                    <div className={styles.searchLoading}>
                        <span/>
                        <span/>
                        <span/>
                    </div>
                )
            }
            <input ref={inpRef} className={styles.searchInp} type='text' placeholder='Search...'
                   onFocus={() => {
                       if (mobileView)
                           setShowMobileAnim(true)
                   }}
                   onBlur={() => {
                       if (mobileView)
                           setShowMobileAnim(false)
                   }}
            />
            {
                (businesses.length > 0 || showMobileAnim) && (
                    <div className={styles.searchBusinessesWrap}>
                        <div className={styles.searchBusinessesInner}>
                            {
                                businesses.length > 0 && businesses.map(business => (
                                    <div className={styles.searchBusiness} key={business.place_id}>
                                        <div className={styles.searchBusinessName}>
                                            {business.name}
                                        </div>
                                        <div className={styles.searchBusinessContent}>
                                            <Icon className={styles.searchBusinessIcon}
                                                  type={findType(business.types)}
                                            />
                                            <div className={styles.searchBusinessBox}>
                                                <div className={styles.searchBusinessPrice}>
                                                    {priceFormatting(business.user_ratings_total * 1000)}$
                                                </div>
                                                <div className={styles.searchBusinessReturn}>
                                                    Daily return: <span>{business.rating}%</span>
                                                </div>
                                            </div>
                                            {
                                                wasBought ? (
                                                    <img className={styles.searchBusinessOwner} src={_USER?.profile_picture || ava} alt='ava'
                                                         onClick={showUser}
                                                    />
                                                ) : (
                                                    <Button type={'button'} small onClick={() => showInfo(business)}>
                                                        Buy
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Search
