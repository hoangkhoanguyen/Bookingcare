import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {

}

const initialState = {
    doctorOfWeek: []

}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DOCTOR_SUCCESS:
            return {
                ...state,
                doctorOfWeek: action.data
            }
        default:
            return state;
    }
}

export default homePageReducer;