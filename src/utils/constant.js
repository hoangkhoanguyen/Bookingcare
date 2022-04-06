export const path = {
    HOME: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',

    ADMIN_SYSTEM: '/system/admin',
    ADMIN_SYSTEM_USER_MANAGE: '/system/admin/user-manage',
    ADMIN_SYSTEM_DOCTOR_MANAGE: '/system/admin/doctor-manage',
    ADMIN_SYSTEM_CLINIC_MANAGE: '/system/admin/clinic-manage',
    ADMIN_SYSTEM_SPECIALTY_MANAGE: '/system/admin/specialty-manage',

    DOCTOR_SYSTEM: '/system/doctor',
    DOCTOR_SYSTEM_SCHEDULE_MANAGE: '/system/doctor/schedule-manage',
    DOCTOR_SYSTEM_PATIENT_MANAGE: '/system/doctor/patient-manage',

    HOME_PAGE: '/',
    USER_REDUX: '',
    SPECIALTY: '/specialty-:id',
    CLINIC: '/clinic-:id',
    DOCTOR: '/doctor-:id',
    VERIFY_BOOKING: '/verify-booking',
    DOCTOR_LIST: '/search-doctor-page',
    SPECIALTY_LIST: '/search-specialty-page',
    CLINIC_LIST: '/search-clinic-page',
};

export const languages = {
    VI: 'vi',
    EN: 'en'
};

export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
};

export const USER_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3'
}

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}