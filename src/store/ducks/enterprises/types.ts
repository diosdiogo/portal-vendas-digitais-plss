/**
 * Action types
 */
export enum EnterprisesTypes {
    UPDATE_REQUEST = '@enterprises/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@enterprises/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@enterprises/UPDATE_FAILURE',
}

/**
 * Data types
 */
export interface Enterprise {
    id: number
    name: string
    landscape_view: string
    max_installments: number
    enterprise_type_id: number
}

/**
 * State type
 */
export interface EnterprisesState {
    readonly data: Enterprise[]
    readonly loading: boolean
    readonly error: boolean
}