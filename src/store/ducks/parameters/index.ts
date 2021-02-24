import { Reducer } from 'redux'
import { ParametersState, ParametersTypes } from './types'

const INITIAL_STATE: ParametersState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<ParametersState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ParametersTypes.UPDATE_REQUEST:
            return { ...state, loading: true };
        case ParametersTypes.UPDATE_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data };
        case ParametersTypes.UPDATE_FAILURE:
            return { ...state, loading: false, error: true, data: [] };
        default: 
            return state;
    }
}

export default reducer;