import React from 'react'
import '../AboutPage/AboutPage.scss'

export const AboutPage = () => {
    return (
        <div className='about-section'>
            <div className="intro-container">
                <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="" />
                <p className='name-info'>Công ty Cổ phần Công nghệ BookingCare</p>
                <p className='details-info'>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                </p>
                <p className='details-info'>
                    <i class="fas fa-check"></i>
                    <span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
                </p>
                <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="" />
            </div>
            <div className="link-for-more-container">
                <ul>
                    <li>
                        <a href="">Liên hệ hợp tác</a>
                    </li>
                    <li>
                        <a href="">Câu hỏi thường gặp</a>
                    </li>
                    <li>
                        <a href="">Điều khoản sử dụng</a>
                    </li>
                    <li>
                        <a href="">Chính sách bảo mật</a>
                    </li>
                    <li>
                        <a href="">Quy trình hỗ trợ giải quyết khiếu nại</a>
                    </li>
                    <li>
                        <a href="">Quy chế hoạt động</a>
                    </li>
                </ul>
            </div>
            <div className="address-container">
                <ul>
                    <li>
                        <p className="name-item">Trụ sở tại Hà Nội</p>
                        <p className="details-item">28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                    </li>
                    <li>
                        <p className="name-item">Văn phòng tại TP Hồ Chí Minh</p>
                        <p className="details-item">6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1</p>
                    </li>
                    <li>
                        <p className="name-item">Hỗ trợ khách hàng</p>
                        <p className="details-item">support@bookingcare.vn (7h - 18h)</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
