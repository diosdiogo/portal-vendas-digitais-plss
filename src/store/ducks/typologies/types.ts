/**
 * Action types
 */
export enum TypologiesTypes {
    UPDATE_REQUEST = '@typologies/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@typologies/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@typologies/UPDATE_FAILURE',
    UPDATE_FIELD = '@typologies/UPDATE_FIELD'
}

/**
 * Data types
 */
export interface Typology {
    id: number
    name: string
    enterprise_id: number
    cover: string
}

/**
 * State type
 */
export interface TypologiesState {
    readonly data: Typology[]
    readonly loading: boolean
    readonly error: boolean
}