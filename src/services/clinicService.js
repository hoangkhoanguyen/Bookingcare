import axios from 'axios'

const saveClinicInfo = async (data) => {
    try {
        let body = data

        let url = `${process.env.REACT_APP_BACKEND_URL}/api/clinic/save-clinic-info`
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
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/clinic/get-clinic-info` + query
        let result = await axios.get(url)
        return result.data
    } catch (error) {
        console.log(error)
        return null
    }
}

// const getDoctorListBySpecialtyId = async (id, provinceId) => {
//     try {

//         let url = !provinceId ? `${process.env.REACT_APP_BACKEND_URL}/api/specialty/get-doctor-list-by-specialty-id?id=${id}` :
//             `${process.env.REACT_APP_BACKEND_URL}/api/specialty/get-doctor-list-by-specialty-id?id=${id}&provinceId=${provinceId}`
//         let result = await axios.get(url)
//         return result
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }


export default {
    // saveSpecialtyInfo, getSpecialty,
    // getDoctorListBySpecialtyId
    saveClinicInfo, getClinic
}