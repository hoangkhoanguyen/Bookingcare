import { path } from "../../utils";

export const adminMenu = [
    { //nguoi dung
        name: 'menu.user.header',
        menus: [
            {
                name: 'menu.user.CRUD-redux.header',
                link: path.ADMIN_SYSTEM_USER_MANAGE
            },
            {
                name: 'menu.user.doctor-manage.header',
                link: path.ADMIN_SYSTEM_DOCTOR_MANAGE
            },
        ]
    },
    {
        name: 'menu.clinic.header',
        menus: [
            {
                name: 'menu.clinic.clinic-manage.header',
                link: path.ADMIN_SYSTEM_CLINIC_MANAGE
            },
        ]
    },
    {
        name: 'menu.specialty.header',
        menus: [
            {
                name: 'menu.specialty.specialty-manage.header',
                link: path.ADMIN_SYSTEM_SPECIALTY_MANAGE
            },
        ]
    },
    {
        name: 'menu.handbook.header',
        menus: [
            {
                name: 'menu.handbook.handbook-manage.header',
            },
        ]
    },
];

export const doctorMenu = [
    { //nguoi dung
        name: 'menu.doctor.header',
        menus: [
            {
                name: 'menu.doctor.schedule-manage.header',
                link: path.DOCTOR_SYSTEM_SCHEDULE_MANAGE
            },
            {
                name: 'menu.doctor.patient-manage.header',
                link: path.DOCTOR_SYSTEM_PATIENT_MANAGE
            },
        ],
    }
];