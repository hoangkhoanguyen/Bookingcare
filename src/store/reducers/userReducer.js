import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    genderArr: [],
    posArr: [],
    roleArr: [],
    userList: [],
    userEdit: {},
    isEditting: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log(action.userInfo.accessToken)
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genderArr: action.data
            }
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                genderArr: []
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                posArr: action.data
            }
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                posArr: []
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roleArr: action.data
            }
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
                roleArr: []
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                userList: action.data
            }
        case actionTypes.EDIT_MODE:
            return {
                ...state,
                isEditting: action.data
            }
        case actionTypes.UPDATE_CHOSEN_USER:
            return {
                ...state,
                userEdit: action.data
            }
        case actionTypes.UPDATE_NEW_ACCESS_TOKEN:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    accessToken: action.data
                }
            }
        default:
            return state;
    }
}

export default appReducer;