import axios from "../../src/axios";


const handleLogin = async ({ email, password }) => {
    try {
        let body = {
            email: email,
            password: password
        }
        const data = await axios.post(`/api/user/login`, body)
        return data
    } catch (error) {
        return null
    }
}

const getAllUsers = async () => {
    try {
        const data = await axios.get(`/api/user/getAll`)
        return data
    } catch (error) {
        return null
    }
}

const getAllCodesService = async (type) => {
    let data = await axios.post(`/api/allcodes/getAll`, { type })
    return data
}

const sendRequestCreateNewUser = async (user) => {
    try {
        let body = user
        let data = await axios.post(`/api/user/addNew`, body)
        return data
    } catch (error) {
        console.log(error)
    }
}

const sendRequestUpdateUser = async (user) => {
    try {
        let body = user
        let data = await axios.post(`/api/user/edit`, body)
        return data
    } catch (error) {
        console.log(error)
    }
}

const sendRequestDeleteUser = async (email) => {
    try {
        let body = { email: email }
        let data = await axios.post(`/api/user/delete`, body)
        return data
    } catch (error) {
        console.log(error)
    }
}

export default {
    handleLogin: handleLogin,
    getAllCodesService: getAllCodesService,
    sendRequestCreateNewUser: sendRequestCreateNewUser,
    getAllUsers: getAllUsers,
    sendRequestUpdateUser: sendRequestUpdateUser,
    sendRequestDeleteUser: sendRequestDeleteUser,
}