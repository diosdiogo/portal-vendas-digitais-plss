import { Reducer } from 'redux'
import { EnterprisesState, EnterprisesTypes } from './types'

const INITIAL_STATE: EnterprisesState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<EnterprisesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EnterprisesTypes.UPDATE_REQUEST:
            return { ...state, loading: true };
        case EnterprisesTypes.UPDATE_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data };
        case EnterprisesTypes.UPDATE_FAILURE:
            return { ...state, loading: false, error: true, data: [] };
        default: 
            return state;
    }
}

export default reducer;