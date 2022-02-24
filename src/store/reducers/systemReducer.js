import actionTypes from '../actions/actionTypes';

const initialState = {
    allDoctor: [],
    allScheduleTime: [],
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
                allDoctor: []
            }
        default:
            return state;
    }
}

export default systemReducer;