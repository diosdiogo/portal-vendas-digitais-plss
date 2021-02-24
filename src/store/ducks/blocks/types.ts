/**
 * Action types
 */
export enum BlocksTypes {
    UPDATE_REQUEST = '@Blocks/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@Blocks/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@Blocks/UPDATE_FAILURE'
}

/**
 * Data types
 */
export interface Block {
    id: number
    name: string
    enterprise_id: number
    floors_number: number
}

/**
 * State type
 */
export interface BlocksState {
    readonly data: Block[]
    readonly loading: boolean
    readonly error: boolean
}