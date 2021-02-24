/**
 * Action types
 */
export enum LeadsTypes {
    UPDATE_REQUEST = '@leads/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@leads/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@leads/UPDATE_FAILURE',
    UPDATE_FIELD = '@leads/UPDATE_FIELD',
    RESET_STATE= '@leads/RESET_STATE'
}

/**
 * Data types
 */
export interface Lead {
    enterprise_id: number
    enterprise_name: string
    enterprise_landscape_view: string
    block_id: number
    block_name: string
    unit_id: number
    unit_name: string
    typology_id: number
    typology_name: string
    floor: number
    name: string
    email: string
    income: string
    phone: string
    contact_type: string
    how_to_pay: string
    fgts: string
    signal: number
    price: number
    financing_price: number
    entry_price: number
    entry_percentage: number
    installments_number: number
    installment_value: number
    send_lead: boolean
    summary_action: string
    pay_in_cash: string
    seller: string
    seller_phone: string
    cpf: string
    message: string
    file:[]
}

/**
 * State type
 */
export interface LeadsState {
    readonly data: Lead
    readonly loading: boolean
    readonly error: boolean
}