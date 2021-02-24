/**
 * Action types
 */
export enum ImagesTypes {
    UPDATE_REQUEST = '@images/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@images/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@images/UPDATE_FAILURE',
    UPDATE_FIELD   = '@images/UPDATE_FIELD'
}

/**
 * Data types
 */
export interface Image {
    cover: string
    gallery: [{
        id: number
        path: string
        name: string
        order: number
        category: string
    }]
}

/**
 * State type
 */
export interface ImagesState {
    readonly data: Image
    readonly loading: boolean
    readonly error: boolean
}