import axios from "../../src/axios";

const saveClinicInfo = async (data) => {
    try {
        let body = data
        let url = `/api/clinic/save-clinic-info`
        let result = await axios.post(url, body)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const getClinic = async (id) => {
    try {
        let query = id ? `?id=${id}` : ''
        let url = `/api/clinic/get-clinic-info` + query
        let result = await axios.get(url)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const getDoctorListByClinicId = async (id, provinceId) => {
    try {
        let query = id ? `?id=${id}` : ''
        let url = `/api/clinic/get-doctor-list-by-clinic-id` + query
        let result = await axios.get(url)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export default {
    saveClinicInfo, getClinic,
    getDoctorListByClinicId,
}