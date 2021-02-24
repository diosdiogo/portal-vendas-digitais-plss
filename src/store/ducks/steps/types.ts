/**
 * Action types
 */
export enum StepsTypes {
    UPDATE_REQUEST = '@steps/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@steps/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@steps/UPDATE_FAILURE',
}

/**
 * Data types
 */
export interface Step {
    page: string
}

/**
 * State type
 */
export interface StepsState {
    readonly pages: Step[]
    readonly lastPage: string
}