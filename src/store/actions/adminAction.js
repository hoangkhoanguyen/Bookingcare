import actionTypes from './actionTypes';
import userService from '../../services/userService'
import doctorService from '../../services/doctorService';


export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const fetchGetAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await doctorService.getAllDoctor()
            if (res && res.errCode === 0) {
                dispatch(fetchSuccess(actionTypes.FETCH_GET_ALL_DOCTOR_SUCCESS, res.data))
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchFail(actionTypes.FETCH_GET_ALL_DOCTOR_FAIL))
        }
    }
}

export const fetchFail = (type) => ({
    type: type
})

export const fetchSuccess = (type, data) => ({
    type: type,
    data: data
})