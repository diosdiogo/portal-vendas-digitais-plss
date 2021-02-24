import { Reducer } from 'redux'
import { ImagesState, ImagesTypes } from './types'

const INITIAL_STATE: ImagesState = {
    data: {
        cover: '',
        gallery: [{
            id: 0,
            name: '',
            order: -1,
            path: '',
            category: ''
        }]
    },
    error: false,
    loading: false
}

const reducer: Reducer<ImagesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ImagesTypes.UPDATE_REQUEST:
            return { ...state, loading: true };
        case ImagesTypes.UPDATE_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data };
        case ImagesTypes.UPDATE_FIELD: {
            return { ...state, loading: false, error: false, data: {...state.data, [action.payload.field]: action.payload.value} };
        }
        case ImagesTypes.UPDATE_FAILURE:
            return { ...state, loading: false, error: true };
        default: 
            return state;
    }
}

export default reducer;