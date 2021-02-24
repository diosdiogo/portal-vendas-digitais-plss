import { Reducer } from 'redux'
import { BlocksState, BlocksTypes } from './types'

const INITIAL_STATE: BlocksState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<BlocksState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BlocksTypes.UPDATE_REQUEST:
            return { ...state, loading: true };
        case BlocksTypes.UPDATE_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data };
        case BlocksTypes.UPDATE_FAILURE:
            return { ...state, loading: false, error: true, data: [] };
        default: 
            return state;
    }
}

export default reducer;