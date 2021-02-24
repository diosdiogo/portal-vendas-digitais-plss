import { Reducer } from 'redux'
import { LeadsState, LeadsTypes } from './types'

const INITIAL_STATE: LeadsState = {
    data: {
        enterprise_id: 0,
        enterprise_name: '',
        enterprise_landscape_view: '',
        block_id: 0,
        block_name: '',
        unit_id: 0,
        unit_name: '',
        typology_id: 0,
        typology_name: '',
        floor: 0,
        name: '',
        email: '',
        income: '',
        phone: '',
        contact_type: 'whatsapp',
        how_to_pay: '',
        fgts: '',
        signal: 0.00,
        financing_price: 0.00,
        price: 0.00,
        entry_price: 0.00,
        entry_percentage: 0,
        installments_number: 1,
        installment_value: 0.00,
        send_lead: false,
        summary_action: '',
        pay_in_cash: '',
        seller: '',
        seller_phone: '',
        cpf: '',
        message: '',
        file:[]
    },
    error: false,
    loading: false
}

const reducer: Reducer<LeadsState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LeadsTypes.UPDATE_REQUEST:
            return { ...state, loading: true };
        case LeadsTypes.UPDATE_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data };
        case LeadsTypes.UPDATE_FIELD: {
            return { ...state, loading: false, error: false, data: {...state.data, [action.payload.field]: action.payload.value} };
        }
        case LeadsTypes.UPDATE_FAILURE:
            return { ...state, loading: false, error: true };
        case LeadsTypes.RESET_STATE:
            return { ...state, loading: false, error: true };
        default: 
            return state;
    }
}

export default reducer;