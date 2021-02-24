import { Reducer } from 'redux'
import { TypologiesState, TypologiesTypes } from './types'

const INITIAL_STATE: TypologiesState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<TypologiesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TypologiesTypes.UPDATE_REQUEST:
            return { ...state, loading: true };
        case TypologiesTypes.UPDATE_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data };
        case TypologiesTypes.UPDATE_FIELD: {
            return { ...state, loading: false, error: false, data: {...state.data, [action.payload.field]: action.payload.value} };
        }
        case TypologiesTypes.UPDATE_FAILURE:
            return { ...state, loading: false, error: true, data: [] };
        default: 
            return state;
    }
}

export default reducer;