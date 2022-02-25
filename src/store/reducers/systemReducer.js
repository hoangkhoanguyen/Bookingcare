import actionTypes from '../actions/actionTypes';

const initialState = {
    allDoctor: [],
    allScheduleTime: [],
    priceList: [],
    paymentList: [],
    provinceList: [],
}

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GET_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctor: action.data
            }
        case actionTypes.FETCH_GET_ALL_DOCTOR_FAIL:
            return {
                ...state,
                allDoctor: []
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            return {
                ...state,
                allScheduleTime: action.data
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            return {
                ...state,
                allScheduleTime: []
            }
        case actionTypes.FETCH_ALLCODE_PRICE_SUCCESS:
            return {
                ...state,
                priceList: action.data
            }
        case actionTypes.FETCH_ALLCODE_PRICE_FAIL:
            return {
                ...state,
                priceList: []
            }
        case actionTypes.FETCH_ALLCODE_PAYMENT_SUCCESS:
            return {
                ...state,
                paymentList: action.data
            }
        case actionTypes.FETCH_ALLCODE_PAYMENT_FAIL:
            return {
                ...state,
                paymentList: []
            }
        case actionTypes.FETCH_ALLCODE_PROVINCE_SUCCESS:
            return {
                ...state,
                provinceList: action.data
            }
        case actionTypes.FETCH_ALLCODE_PROVINCE_FAIL:
            return {
                ...state,
                provinceList: []
            }
        default:
            return state;
    }
}

export default systemReducer;