/**
 * Action types
 */
export enum ParametersTypes {
    UPDATE_REQUEST = '@parameters/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@parameters/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@parameters/UPDATE_FAILURE'
}

/**
 * Data types
 */
export interface Parameter {
    id: number
    name: string
    value: number | string
}

/**
 * State type
 */
export interface ParametersState {
    readonly data: Parameter[]
    readonly loading: boolean
    readonly error: boolean
}