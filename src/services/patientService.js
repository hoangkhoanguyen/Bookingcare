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


export default {
    sendRequestBookingAppointment,
}