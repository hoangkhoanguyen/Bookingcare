import actionTypes from './actionTypes';
import userService from '../../services/userService'

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const fetchStart = (field) => {
    return async (dispatch, getState) => {
        let typeSuccess
        let typeFail
        switch (field) {
            case 'GENDER':
                typeSuccess = actionTypes.FETCH_GENDER_SUCCESS
                typeFail = actionTypes.FETCH_GENDER_FAIL
                break;
            case 'POSITION':
                typeSuccess = actionTypes.FETCH_POSITION_SUCCESS
                typeFail = actionTypes.FETCH_POSITION_FAIL
                break;
            case 'ROLE':
                typeSuccess = actionTypes.FETCH_ROLE_SUCCESS
                typeFail = actionTypes.FETCH_ROLE_FAIL
                break;
            default:
                break;
        }
        try {
            let res = await userService.getAllCodesService(field)
            if (res && res.errCode === 0) {
                dispatch(fetchSuccess(typeSuccess, res.data))
            } else {
                dispatch(fetchFail(typeFail))
            }
        } catch (error) {
            dispatch(fetchFail(typeFail))
            console.log('fetchGenderStart error', error)
        }
    }
}

export const fetchSuccess = (type, data) => ({
    type: type,
    data: data
})

export const fetchFail = (type) => ({
    type: type
})

export const fetchGetAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers()
            if (res && res.errCode === 0) {
                dispatch(fetchSuccess(actionTypes.FETCH_ALL_USERS_SUCCESS, res.data))
            }
        } catch (error) {
            dispatch(fetchFail(actionTypes.FETCH_ALL_USERS_FAIL))
        }
    }
}

export const setEditMode = (data) => ({
    type: actionTypes.EDIT_MODE,
    data: data
})

export const updateChosenUser = (user) => ({
    type: actionTypes.UPDATE_CHOSEN_USER,
    data: user
})