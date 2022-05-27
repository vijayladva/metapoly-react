export const priceFormatting = (price, short) => {
    if (short) {
        if (price > 1000000) {
            return (price / 1000000).toFixed(2).toString() + ' M'
        }
    }

    return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
