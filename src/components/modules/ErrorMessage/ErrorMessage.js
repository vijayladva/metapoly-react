import React, {useCallback, useMemo, useState} from 'react'


export const useForceUpdate = () => {
    const [tick, setTick] = useState(0);
    return useCallback(() => {
        setTick(tick => tick + 1);
    }, []);
}

export const ErrorMessage = ({hasError,className}) => {

    let errorMessage = useMemo(() => {
        let msg = hasError?.props?.children || hasError || ''
        if (msg) msg = msg?.replace('The', '')?.replace('field', '')?.trim() || ''
        return msg ? (msg?.charAt(0)?.toUpperCase() + msg?.slice(1)) : ''
    }, [hasError])

    return (
        <p className={className}>{errorMessage}</p>
    )
}

