import React, { useEffect, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { useCookies } from "react-cookie";

// Utils
import { priceFormatting } from '../../utils/priceFormatting'

// Styles
import styles from './index.module.scss'

// Images
import gamer from '../../assets/images/gamer.jpg'

// Components
import Map from '../../components/Map/Map'
import Search from '../../components/Search/Search'
import PlaceInfo from '../../components/PlaceInfo/PlaceInfo'
import UserInfo from '../../components/UserInfo/UserInfo'
import Popup from '../../components/modules/Popup/Popup'
import MobileMenu from '../../components/MobileMenu/MobileMenu'
import { authService } from '../../services/UserServices'
import { setToken } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';

const Game = () => {
    const [parentMap, setParentMap] = useState()

    const [zoom, setZoom] = useState(3)
    const [center, setCenter] = useState({
        lat: 0,
        lng: 0,
    })

    const [mobileView, setMobileView] = useState(false)

    const [placeInfo, setPlaceInfo] = useState()
    const [isSellingBusiness, setIsSellingBusiness] = useState(false)
    const [showUser, setShowUser] = useState(false)
    const [gamerInfo, setGamerInfo] = useState({})
    const [userDetail, setUserDetail] = useState({ username: '', current_balance: 0.0, net_worth: 0.0 });
    const [cookie, setCookie] = useCookies(['metapoly_user']);
    const dispatch = useDispatch()
    const _USER = useSelector(state => state.common.user)

    const onIdle = (map) => {
        setZoom(map.getZoom())
        setCenter(map.getCenter().toJSON())
    }

    const moveMap = (position, zoom) => {
        setCenter(position)
        setZoom(zoom)
    }

    const changePopup = (place, user, gamer) => {
        if (place) {
            setPlaceInfo(place)
            setShowUser(false)
            setGamerInfo({})
            setIsSellingBusiness(false)
        } else if (user) {
            setPlaceInfo(undefined)
            setShowUser(true)
            setIsSellingBusiness(false)

            if (gamer) {
                setGamerInfo({
                    gamer: true,
                })
            } else {
                setGamerInfo({})
            }
        } else {
            setPlaceInfo(undefined)
            setShowUser(false)
            setGamerInfo({})
        }
    }

    const openFaq = () => {
        setPlaceInfo(undefined)
        setShowUser(true)
        setIsSellingBusiness(false)
        setGamerInfo({
            gamer: true,
            faq: true,
        })
    }

    const sellBusiness = business => {
        setPlaceInfo(business)
        setIsSellingBusiness(true)
    }

    const onClick = e => {
        e.stop()
        changePopup()

        if (e.placeId) {
            const service = new window.google.maps.places.PlacesService(parentMap)

            const request = {
                placeId: e.placeId
            }

            service.getDetails(request, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    // setInfoWindowPlace(place)
                    setPlaceInfo(place)
                }
            })
        }
    }

    const checkWindowWidth = () => {
        if (window.innerWidth < 769)
            setMobileView(true)
        else
            setMobileView(false)
    }

    useEffect(() => {
        if (cookie?.is_logged && cookie?.metapoly_user) {
            setToken(`${cookie.metapoly_user.token.tokenType} ${cookie.metapoly_user.token.accessToken}`)
        }
        authService.getUserProfile().then(res => {
            const { code, message, data } = res.data;
            if (code === 200) {
                dispatch({ type: 'SET_USER_DATA', payload: data });
            }
        });

        window.addEventListener('resize', checkWindowWidth)

        checkWindowWidth()

        return () => window.removeEventListener('resize', checkWindowWidth)
    }, [])

    return (
        <div className={styles.game}>
            {
                placeInfo && (
                    <Popup>
                        <PlaceInfo data={placeInfo} closePlaceInfo={() => {
                            setPlaceInfo(undefined)
                            setIsSellingBusiness(false)
                        }} sellBusiness={isSellingBusiness} />
                    </Popup>
                )
            }
            {
                showUser && (
                    <Popup user gamer={gamerInfo.gamer}>
                        <UserInfo
                            closeUserInfo={() => setShowUser(false)}
                            gamer={gamerInfo.gamer}
                            faq={gamerInfo.faq}
                            sellBusiness={sellBusiness}
                            userDetail={userDetail}
                        />
                    </Popup>
                )
            }
            <div className={styles.gameBox}>
                <Search
                    setMapPosition={moveMap}
                    map={parentMap}
                    showInfo={info => changePopup(info, false)}
                    showUser={() => changePopup(false, true)}
                    closePopup={changePopup}
                    mobileView={mobileView}
                />
            </div>
            <div className={styles.gameGamer}>
                <div className={styles.gameGamerBalance}>
                    {priceFormatting(_USER?.current_balance || 0.0)} $
                </div>
                {
                    !mobileView && (
                        <img className={styles.gameGamerAva} src={_USER?.profile_picture || gamer} alt='ava'
                            onClick={() => changePopup(false, true, true)}
                        />
                    )
                }
            </div>
            {
                mobileView && (
                    <div className={styles.gameTitle}>
                        Metapoly
                    </div>
                )
            }
            {
                mobileView && <MobileMenu
                    openMap={() => changePopup()}
                    showUser={() => changePopup(false, true, true)}
                    openFaq={openFaq}
                />
            }
            <Wrapper apiKey={'AIzaSyCbZ0RVOBt-LKFZkZVEKrt7tg_lY6fIOp4'} region={'US'} language={'ru'}
                libraries={['places']}>
                <Map
                    setParentMap={map => setParentMap(map)}
                    center={center}
                    onIdle={onIdle}
                    onClick={onClick}
                    zoom={zoom}
                    className={styles.gameMap}
                    disableDefaultUI
                    styles={[
                        {
                            featureType: 'transit',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'road',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [
                                { visibility: 'off' }
                            ]
                        },
                        {
                            featureType: 'poi.business',
                            elementType: 'labels',
                            stylers: [
                                { visibility: 'on' }
                            ]
                        },
                        {
                            featureType: 'poi.government',
                            elementType: 'labels',
                            stylers: [
                                { visibility: 'on' }
                            ]
                        },
                    ]}
                />
            </Wrapper>
        </div>
    )
}

export default Game
