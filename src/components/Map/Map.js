import React, { useEffect, useRef, useState } from 'react'
import { useDeepCompareEffectForMaps } from '../../utils/hooks/useDeepCompareEffectForMaps'

const Map = ({className, setParentMap, onIdle, onClick, children, ...options}) => {
    const ref = useRef()
    const [map, setMap] = useState()

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}))
        }
    }, [ref, map])

    useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) =>
                window.google.maps.event.clearListeners(map, eventName)
            )

            if (onClick)
                map.addListener('click', onClick)

            if (onIdle)
                map.addListener('idle', () => onIdle(map))
        }
    }, [map, onIdle])

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options)
            setParentMap(map)
        }
    }, [map, options])

    return (
        <div ref={ref} className={className}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {map})
                }
            })}
        </div>
    )
}

export default Map
