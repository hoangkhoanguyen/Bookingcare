import axios from "../axios";


const getTopDoctor = async (limit) => {
    try {
        let url = limit ? `/api/doctor/get-top-doctor-home?limit=${limit}` : `/api/doctor/get-top-doctor-home`
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`)
        return data
    } catch (error) {
        return null
    }
}

const getAllDoctor = async () => {
    try {
        let url = `/api/doctor/getAll`
        const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${url}`)

        return data
    } catch (error) {
        return null
    }
}

const getDoctorDetailsById = async (doctorId) => {
    try {
        let url = `/api/doctor/get-detail-doctor-by-id?id=${doctorId}`
        let result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${url}`)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const saveDoctorDetails = async (info) => {
    try {
        let url = `/api/doctor/save-doctor-detail`
        let body = info
        let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`, body)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

const saveDoctorSchedule = async (data) => {
    try {
        let url = `/api/doctor/bulk-create-schedule`
        let body = data
        let result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`, body)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const getDoctorScheduleByDate = async (doctorId, date) => {
    try {
        let url = `/api/doctor/get-doctor-schedule-by-date?doctorId=${doctorId}&date=${date}`
        let result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${url}`)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const getProfileDoctor = async (id) => {
    try {
        let url = `/api/doctor/get-doctor-profile-by-id?id=${id}`
        let result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${url}`)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export default {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    getDoctorDetailsById: getDoctorDetailsById,
    saveDoctorDetails: saveDoctorDetails,
    saveDoctorSchedule,
    getDoctorScheduleByDate, getProfileDoctor,
}