const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    SET_SHOW_HIDE_SIDEBAR: 'SET_SHOW_HIDE_SIDEBAR',
    FETCH_DOCTOR_OF_WEEK_START: 'FETCH_DOCTOR_OF_WEEK_START',
    FETCH_DOCTOR_SUCCESS: 'FETCH_DOCTOR_SUCCESS',
    FETCH_DOCTOR_FAIL: 'FETCH_DOCTOR_FAIL',

    //admin
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // system
    FETCH_GET_ALL_DOCTOR_SUCCESS: 'FETCH_GET_ALL_DOCTOR_SUCCESS',
    FETCH_GET_ALL_DOCTOR_FAIL: 'FETCH_GET_ALL_DOCTOR_FAIL',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',

    // user redux
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',
    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAIL: 'FETCH_ALL_USERS_FAIL',
    EDIT_MODE: 'EDIT_MODE',
    UPDATE_CHOSEN_USER: 'UPDATE_CHOSEN_USER',

    FETCH_ALLCODE_PRICE_SUCCESS: 'FETCH_ALLCODE_PRICE_SUCCESS',
    FETCH_ALLCODE_PRICE_FAIL: 'FETCH_ALLCODE_PRICE_FAIL',

    FETCH_ALLCODE_PAYMENT_SUCCESS: 'FETCH_ALLCODE_PAYMENT_SUCCESS',
    FETCH_ALLCODE_PAYMENT_FAIL: 'FETCH_ALLCODE_PAYMENT_FAIL',

    FETCH_ALLCODE_PROVINCE_SUCCESS: 'FETCH_ALLCODE_PROVINCE_SUCCESS',
    FETCH_ALLCODE_PROVINCE_FAIL: 'FETCH_ALLCODE_PROVINCE_FAIL',

    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_TIME_FAIL: 'FETCH_ALLCODE_SCHEDULE_TIME_FAIL',
})

export default actionTypes;