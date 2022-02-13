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

const getAllUsers = async () => {
    try {
        const data = await axios.get('http://localhost:8080/api/user/getAll')
        return data
    } catch (error) {
        return null
    }
}

const getAllCodesService = async (type) => {
    let data = await axios.post('http://localhost:8080/api/allcodes/getAll', { type: type })
    return data
}

const sendRequestCreateNewUser = (user) => {
    console.log(user)
}

const sendRequestUpdateUser = (user) => {
    console.log(user)
}

export default {
    handleLogin: handleLogin,
    getAllCodesService: getAllCodesService,
    sendRequestCreateNewUser: sendRequestCreateNewUser,
    getAllUsers: getAllUsers,
    sendRequestUpdateUser: sendRequestUpdateUser
}