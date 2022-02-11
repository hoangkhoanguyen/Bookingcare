export const adminMenu = [
    { //nguoi dung
        name: 'menu.user.header',
        menus: [
            {
                name: 'menu.user.CRUD-user.header',
                link: '/system/user-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/product-manage' },
                //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
            },
            {
                name: 'menu.user.CRUD-redux.header',
                link: '/system/user-redux'
            },
            {
                name: 'menu.user.doctor-manage.header',
                link: '/system/doctor-manage'
            },
            {
                name: 'menu.user.admin-manage.header',
                link: '/system/admin-manage'
            }
        ]
    },
    {
        name: 'menu.clinic.header',
        menus: [
            {
                name: 'menu.clinic.clinic-manage.header',
            },
        ]
    },
    {
        name: 'menu.specialty.header',
        menus: [
            {
                name: 'menu.specialty.specialty-manage.header',
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