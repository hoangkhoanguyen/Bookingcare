import axios from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';
import config from './config';
import store, { dispatch } from './redux'
import { processLogout, updateNewAccessToken } from './store/actions';


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    return error;
};

export const isSuccessStatusCode = (s) => {
    // May be string or number
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};

instance.interceptors.request.use((config) => {
    const state = store.getState()
    if (state.user.userInfo) {
        config.headers['x-access-token'] = state.user.userInfo.accessToken
    }
    return config
})

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg'], null, data['errcode'] ? data['errcode'] : ""));
        }

        // Return direct data to callback
        if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
            return data['d'];
        }
        // Handle special case
        if (data.hasOwnProperty('s') && _.keys(data).length === 1) {
            return null;
        }
        return response.data;
    },
    async (error) => {
        const { response } = error;
        const originalConfig = error.config;
        if (response == null) {
            return Promise.reject(error);
        }

        if (response.data && response.data.errMessage == 'Unauthorized! Access Token was expired!') {
            const state = store.getState()
            let refreshToken = state.user.userInfo.refreshToken
            let userId = state.user.userInfo.id
            try {
                let newToken = await getNewAccessToken({ refreshToken, userId })
                if (newToken) {
                    dispatch(updateNewAccessToken(newToken))
                }
                return instance(originalConfig)
            } catch (err) {
                console.log(err)
                return Promise.reject(err)
            }
        }

        if (response.data && response.data.errMessage == 'Refresh Token is invalid!') {
            toast.error('Please re-login!')
            dispatch(processLogout())
        }

        const { data } = response;

        if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg']));
        }

        if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
            return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
        }

        return Promise.reject(createError(response.status));
    }
);

const getNewAccessToken = async ({ refreshToken, userId }) => {
    try {
        let body = {
            refreshToken, userId
        }
        let result = await instance.post(`/api/token/get-new-token-by-refresh-token`, body)
        console.log(result)
        if (result && result.errCode === 0) {
            return result.newToken
        }
        if (result && result.errCode === 2) { //refresh token expired
            toast.error('Your login session has expired, please re-login!')
            dispatch(processLogout())
        }
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

export default instance;
