import axios from 'axios'

const saveSpecialtyInfo = async (data) => {
    try {
        let body = data
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/specialty/save-specialty-info`
        let result = await axios.post(url, body)
        return result.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const getSpecialty = async (id) => {
    try {
        let url = id ? `${process.env.REACT_APP_BACKEND_URL}/api/specialty/get-specialty-info?id=${id}` :
            `${process.env.REACT_APP_BACKEND_URL}/api/specialty/get-specialty-info`
        let result = await axios.get(url)
        return result.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const getDoctorListBySpecialtyId = async (id, provinceId) => {
    try {

        let url = !provinceId ? `${process.env.REACT_APP_BACKEND_URL}/api/specialty/get-doctor-list-by-specialty-id?id=${id}` :
            `${process.env.REACT_APP_BACKEND_URL}/api/specialty/get-doctor-list-by-specialty-id?id=${id}&provinceId=${provinceId}`
        let result = await axios.get(url)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}


export default {
    saveSpecialtyInfo, getSpecialty,
    getDoctorListBySpecialtyId
}