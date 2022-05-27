import React, { useEffect, useRef, useState } from 'react'
import jsxToString from 'jsx-to-string'

// Styles
import styles from './index.module.scss'

const InfoWindow = ({map, data}) => {
    const [infoWindow, setInfoWindow] = useState()
    const [content, setContent] = useState()

    useEffect(() => {
        if (data) {
            setContent(<div>{data.name}</div>)
        }
    }, [data])

    useEffect(() => {
        if (content) {
            setInfoWindow(new window.google.maps.InfoWindow({
                content: jsxToString(content),
                position: data.geometry.location,
            }))
        }
    }, [content])

    useEffect(() => {
        if (infoWindow) {
            infoWindow.open({
                map,
                shouldFocus: false,
            })

            return () => infoWindow.close()
        }
    }, [infoWindow])

    return null
}

export default InfoWindow
