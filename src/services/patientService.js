import axios from "../axios";


const sendRequestBookingAppointment = async (data) => {
    try {
        let body = data
        console.log(body)
        let url = '/api/patient/booking-appointment'
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`, body)
        return result
    } catch (error) {
        return null
    }
}

const getPatientListByDoctorId = async (id, day) => {
    try {
        let query = `?id=${id}&day=${day}`
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-list-by-doctor-id` + query
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