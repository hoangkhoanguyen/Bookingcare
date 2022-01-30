import React from 'react';
import { useDispatch } from 'react-redux';
import { showHideSidebar } from '../../../store/actions/appActions';
import '../HomeSidebar/HomeSidebar.scss'


export const HomeSidebar = () => {

    const dispatch = useDispatch()

    const handleHideSidebar = () => {
        dispatch(showHideSidebar(false))
    }
    return <div className='sidebar-background' onClick={handleHideSidebar}>
        <div className="sidebar-body" onClick={(e) => { e.stopPropagation() }}>
            <ul className="sidebar-list-up">
                <li className="sidebar-item">Trang chủ</li>
                <li className="sidebar-item">Cẩm nang</li>
                <li className="sidebar-item">Hợp tác</li>
            </ul>
            <h4>VỀ BOOKINGCARE</h4>
            <ul className="sidebar-list-down">
                <li className="sidebar-item">Dành cho bệnh nhân</li>
                <li className="sidebar-item">Dành cho bác sĩ</li>
                <li className="sidebar-item">Vai trò của BookingCare</li>
                <li className="sidebar-item">Liên hệ</li>
                <li className="sidebar-item">Câu hỏi thường gặp</li>
                <li className="sidebar-item">Điều khoản sử dụng</li>
                <li className="sidebar-item">Quy trình hỗ trợ giải quyết khiếu nại</li>
                <li className="sidebar-item">Quy chế hoạt động</li>
            </ul>
            <div className="contact-icons">

            </div>
        </div>
    </div>;
};
