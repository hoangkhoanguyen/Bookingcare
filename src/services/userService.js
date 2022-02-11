import axios from "../axios";

const handleLogin = async ({ email, password }) => {
    try {
        let body = {
            email: email,
            password: password
        }
        const data = await axios.post('http://localhost:8080/api/user/login', body)
        return data
    } catch (error) {
        return null
    }
}

const getAllCodesService = async (type) => {
    let data = await axios.post('http://localhost:8080/api/allcodes/getAll', { type: type })
    return data
}

export default {
    handleLogin: handleLogin,
    getAllCodesService: getAllCodesService,
}