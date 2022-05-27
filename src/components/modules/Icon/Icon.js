import React, { useEffect, useState } from 'react'

// Utils
import { TYPES } from '../../../utils/types'

// Images
import business from '../../../assets/images/business.svg'
import restaurant from '../../../assets/images/restaurant.svg'
import store from '../../../assets/images/store.svg'
import park from '../../../assets/images/park.svg'
import airport from '../../../assets/images/airport.svg'
import bank from '../../../assets/images/bank.svg'
import museum from '../../../assets/images/museum.svg'
import cafe from '../../../assets/images/cafe.svg'
import bar from '../../../assets/images/bar.svg'
import bakery from '../../../assets/images/bakery.svg'
import night_club from '../../../assets/images/night_club.svg'
import pharmacy from '../../../assets/images/pharmacy.svg'
import school from '../../../assets/images/school.svg'
import secondary_school from '../../../assets/images/secondary_school.svg'
import landmark from '../../../assets/images/landmark.svg'
import point_of_interest from '../../../assets/images/point_of_interest.svg'


const Icon = ({className, type}) => {
    const [src, setSrc] = useState()

    const checkType = type => {
        switch (type) {
            case TYPES.RESTAURANT:
                setSrc(restaurant)
                break
            case TYPES.STORE:
                setSrc(store)
                break
            case TYPES.CAFE:
                setSrc(cafe)
                break
            case TYPES.BAR:
                setSrc(bar)
                break
            case TYPES.BAKERY:
                setSrc(bakery)
                break
            case TYPES.MUSEUM:
                setSrc(museum)
                break
            case TYPES.NIGHT_CLUB:
                setSrc(night_club)
                break
            case TYPES.PHARMACY:
                setSrc(pharmacy)
                break
            case TYPES.PARK:
                setSrc(park)
                break
            case TYPES.BANK:
                setSrc(bank)
                break
            case TYPES.SCHOOL:
                setSrc(school)
                break
            case TYPES.SECONDARY_SCHOOL:
                setSrc(secondary_school)
                break
            case TYPES.AIRPORT:
                setSrc(airport)
                break
            case TYPES.LANDMARK:
                setSrc(landmark)
                break
            case TYPES.POINT_OF_INTEREST:
                setSrc(point_of_interest)
                break
            default:
                setSrc(business)
        }
    }

    useEffect(() => {
        checkType(type)
    }, [type])

    return (
        <img className={className} src={src} alt='icon' />
    )
}

export default Icon
