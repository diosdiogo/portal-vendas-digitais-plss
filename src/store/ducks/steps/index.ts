import { Reducer } from 'redux'
import { StepsState, StepsTypes } from './types'

const INITIAL_STATE: StepsState = {
    pages: [],
    lastPage: '/',
}

const reducer: Reducer<StepsState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StepsTypes.UPDATE_REQUEST:
            return { ...state };
        case StepsTypes.UPDATE_SUCCESS:
            return { ...state, lastPage: action.payload.page, pages: [...state.pages, action.payload] };
        case StepsTypes.UPDATE_FAILURE:
            return { ...state, lastPage: '', data: [] };
        default: 
            return state;
    }
}

export default reducer;