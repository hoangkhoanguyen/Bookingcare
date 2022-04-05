import axios from "../../src/axios";


const sendRequestBookingAppointment = async (data) => {
    try {
        let body = data
        console.log(body)
        let url = '/api/patient/booking-appointment'
        const result = await axios.post(`${url}`, body)
        return result
    } catch (error) {
        return null
    }
}

const getPatientListByDoctorId = async (id, day) => {
    try {
        let query = `?id=${id}&day=${day}`
        let url = `/api/patient/get-patient-list-by-doctor-id` + query
        let result = await axios.get(url)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export default {
    sendRequestBookingAppointment,
    getPatientListByDoctorId
}