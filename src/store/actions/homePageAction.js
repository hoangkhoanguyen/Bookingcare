import actionTypes from './actionTypes';
import doctorService from '../../services/doctorService';

export const fetchDoctorOfWeekStart = (limit,) => {
    return async (dispatch, getState) => {
        try {
            let res = await doctorService.getTopDoctor(limit)
            if (res && res.errCode === 0) {
                let data
                if (res.data && res.data.length > 0) {
                    data = res.data.map((doctor) => {
                        let imageBase64 = ''
                        if (doctor.image) {
                            imageBase64 = new Buffer(doctor.image, 'base64').toString('binary')
                        }
                        return {
                            ...doctor,
                            image: imageBase64
                        }
                    })
                } else {
                    data = res.data
                }
                dispatch(fetchSuccess(actionTypes.FETCH_DOCTOR_SUCCESS, data))
            }
        } catch (error) {
            dispatch(fetchFail(actionTypes.FETCH_DOCTOR_FAIL))
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