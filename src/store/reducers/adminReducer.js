import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: true,
    adminInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('start 4')
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('fail')
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;