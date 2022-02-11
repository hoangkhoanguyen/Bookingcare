import React, { useRef, useState } from 'react';
import Slider from "react-slick";

import '../DoctorOfWeek/DoctorOfWeek.scss'

export const DoctorOfWeek = () => {

    const carousel = useRef(null)
    const [number, setNumber] = useState(0)

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const slideList = [
        {
            id: 1,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        },
        {
            id: 2,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        },
        {
            id: 3,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        },
        {
            id: 4,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        },
        {
            id: 5,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        },
        {
            id: 6,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        },
        {
            id: 7,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        },
        {
            id: 8,
            linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
            name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
            specialty: 'Nam học'
        }
    ]

    const handleCLickNext = (num) => {
        if (slideList && num < slideList.length) {
            carousel.current.slickGoTo(num + 1)
            setNumber(num + 1)
        }
    }
    const handleCLickPrev = (num) => {
        if (num > 0) { }
        carousel.current.slickGoTo(num - 1)
    }
    return <div className='doctor-of-week-section'>
        <div className="header-section">
            <h3 className='title-section'>Bác sĩ nổi bật tuần qua</h3>
            <div className="more-info-section">Xem thêm</div>
        </div>
        <Slider {...settings} ref={carousel} >
            {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div className='slide-item' key={slide.id}>
                    <div className="slide-body">
                        <img src={slide.linkImg} alt="" />
                        <h6 className='name'>{slide.name}</h6>
                        <h6 className='sub-name'>{slide.specialty}</h6>
                    </div>
                </div>
            })}
        </Slider>
    </div>;
};
