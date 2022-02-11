import React, { useRef, useState } from 'react';
import Slider from "react-slick";

import '../MedicalFacilitySection/MedicalFacilitySection.scss'

export const MedicalFacilitySection = () => {

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
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
        },
        {
            id: 2,
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
        },
        {
            id: 3,
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
        },
        {
            id: 4,
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
        },
        {
            id: 5,
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
        },
        {
            id: 6,
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
        },
        {
            id: 7,
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
        },
        {
            id: 8,
            linkImg: '/Img/Homepage/MedicalFacility/095119-benh-vien-cho-ray-h1.jpg',
            name: 'Bệnh viện Chợ Rẫy'
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
    return <div className='medical-facility-section'>
        <div className="header-section">
            <h3 className='title-section'>Cơ sở y tế nổi bật</h3>
            <div className="more-info-section">Xem thêm</div>
        </div>
        <Slider {...settings} ref={carousel} >
            {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div className='slide-item' key={slide.id}>
                    <div className="slide-body">
                        <img src={slide.linkImg} alt="" />
                        <h6>{slide.name}</h6>
                    </div>
                </div>
            })}
        </Slider>
    </div>;
};
