import React, { useRef, useState } from 'react';
import Slider from "react-slick";

import '../PopularSpecialtySection/PopularSpecialtySection.scss'

export const PopularSpecialtySection = () => {

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
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
        },
        {
            id: 2,
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
        },
        {
            id: 3,
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
        },
        {
            id: 4,
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
        },
        {
            id: 1,
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
        },
        {
            id: 2,
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
        },
        {
            id: 3,
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
        },
        {
            id: 4,
            linkImg: '/Img/Homepage/PopularSpecialty/121146-tai-mui-hong.jpg',
            name: 'Tai mũi họng'
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
    return <div className='popular-specialty-section'>
        <div className="header-section">
            <h3 className='title-section'>Chuyên khoa phổ biến</h3>
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
