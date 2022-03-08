import React from 'react'
import './ClinicNavigation.scss'

export const ClinicNavigation = () => {
    const navList = [
        {
            id: 1,
            name: 'GIỚI THIỆU'
        },
        {
            id: 2,
            name: 'THẾ MẠNH CHUYÊN MÔN'
        },
        {
            id: 3,
            name: 'TRANG THIÊT BỊ'
        },
        {
            id: 4,
            name: 'VỊ TRÍ'
        },
        {
            id: 5,
            name: 'QUY TRÌNH KHÁM'
        }
    ]

    const handleClickNavItem = () => {
        console.log(document.querySelector('.clinic-details h3'))
        // document.querySelector('html,body').animate({
        //     scrollTop: document.querySelector(".clinic-details h3:nth-child(3)").offset().top
        // },
        //     'slow');
    }
    return (
        <ul>
            {navList && navList.length > 0 && navList.map((item) => {
                return <a onClick={handleClickNavItem} >{item.name}</a>
            })}
        </ul>
    )
}
