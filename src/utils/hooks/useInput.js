import { useState } from 'react'

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue)

    const onChange = (newVal) => {
        setValue(newVal)
    }

    return {value, onChange}
}

export { useInput }
