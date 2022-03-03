import actionTypes from './actionTypes';
import userService from '../../services/userService'
import doctorService from '../../services/doctorService';


// export const adminLoginSuccess = (adminInfo) => ({
//     type: actionTypes.ADMIN_LOGIN_SUCCESS,
//     adminInfo: adminInfo
// })

// export const adminLoginFail = () => ({
//     type: actionTypes.ADMIN_LOGIN_FAIL
// })

// export const processLogout = () => ({
//     type: actionTypes.PROCESS_LOGOUT
// })

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

export const fetchAllScheduleTimeStart = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodesService('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetchSuccess(actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS, res.data))
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchFail(actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL))
        }
    }
}

export const fetchAllCodeStart = (field) => {
    return async (dispatch, getState) => {
        let typeSuccess
        let typeFail
        switch (field) {
            case 'PRICE':
                typeSuccess = actionTypes.FETCH_ALLCODE_PRICE_SUCCESS
                typeFail = actionTypes.FETCH_ALLCODE_PRICE_FAIL
                break;
            case 'PAYMENT':
                typeSuccess = actionTypes.FETCH_ALLCODE_PAYMENT_SUCCESS
                typeFail = actionTypes.FETCH_ALLCODE_PAYMENT_FAIL
                break;
            case 'PROVINCE':
                typeSuccess = actionTypes.FETCH_ALLCODE_PROVINCE_SUCCESS
                typeFail = actionTypes.FETCH_ALLCODE_PROVINCE_FAIL
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
            console.log('fetchAllcodeStart error', error)
        }
    }
}

// export const fetchDoctorInfo = (id) => {
//     return async (dispatch,getState)=>{
//         try {
//             let result = await doctorService.getDoctorInfoById(id)
//             if (result&& result.errCode===0)
//             {
//                 dispatch(fetchSuccess(actionTypes.FETCH_DOCTOR_INFO_SUCCESS,result.data))
//             }
//         } catch (error) {
//             dispatch(fetchFail(actionTypes.FETCH_DOCTOR_INFO_FAIL))
//             console.log('fetchDoctorInfo error', error)
//         }
//     }
// }

export const fetchFail = (type) => ({
    type: type
})

export const fetchSuccess = (type, data) => ({
    type: type,
    data: data
})

