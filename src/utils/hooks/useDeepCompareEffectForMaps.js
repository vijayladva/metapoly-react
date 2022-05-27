import { useEffect, useRef } from 'react'
import { createCustomEqual } from 'fast-equals'
import { isLatLngLiteral } from '@googlemaps/typescript-guards'

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a, b) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof window.google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof window.google.maps.LatLng
        ) {
            return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b))
        }

        return deepEqual(a, b)
    }
)

const useDeepCompareMemoize = value => {
    const ref = useRef()

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}

export const useDeepCompareEffectForMaps = (callback, dependencies) => {
    useEffect(callback, dependencies.map(useDeepCompareMemoize))
}
