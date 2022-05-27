import { TYPES } from './types'

export const findType = types => {
    let type = ''

    Object.keys(TYPES).forEach(key => {
        for (let i = 0; i < types.length; i++) {
            if (types[i] === TYPES[key] && !type) {
                type = TYPES[key]
                break
            }
        }
    })

    return type
}
