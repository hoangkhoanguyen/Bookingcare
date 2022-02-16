import axios from "../axios";


const getDoctor = async (limit) => {
    try {
        let url = limit ? `/api/doctor/get-top-doctor-home?limit=${limit}` : `/api/doctor/get-top-doctor-home`
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`)
        return data
    } catch (error) {
        return null
    }
}



export default {
    getDoctor: getDoctor,
}