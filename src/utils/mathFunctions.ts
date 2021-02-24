export function splitPrice(price: number) {
    const values = {
        intSlice: Math.floor(price / 1000),
        decSlice: price % 1000
    };

    return values;
}

/**
 * Calculates the installments value
 * @param price If "bank financing" so entry_price else real price
 * @param entry If "bank financing" so signal else entry value
 * @param installments_number Number of installments
 */
export function installmentsValue(price: number, entry: number, installments_number: number) {
    return Math.floor((price - entry) / installments_number);
}

/**
 * Calculates the entry value by the percentage selected
 * @param price enterprise price
 * @param percentage entry percentage
 */
export function entryValue(price: number, percentage: number) {
    return price * (Number(percentage)/100);
}