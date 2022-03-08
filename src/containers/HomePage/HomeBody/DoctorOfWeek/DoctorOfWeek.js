import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { fetchDoctorOfWeekStart } from '../../../../store/actions/homePageAction';
import { languages } from '../../../../utils';
import '../DoctorOfWeek/DoctorOfWeek.scss'

export const DoctorOfWeek = () => {

    const dispatch = useDispatch()

    const slideList = useSelector(state => state.homePage.doctorOfWeek)
    const language = useSelector(state => state.app.language)
    const carousel = useRef(null)

    useEffect(() => {
        dispatch(fetchDoctorOfWeekStart(8))
        if (document.querySelector('.doctor-of-week-section .slick-prev')) {
            document.querySelector('.doctor-of-week-section .slick-prev').classList.add('disabled-arrow')
        }
    }, [carousel])


    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: (index) => {
            if (index == 0) {
                document.querySelector('.doctor-of-week-section .slick-prev').classList.add('disabled-arrow')
            } else {
                document.querySelector('.doctor-of-week-section .slick-prev').classList.remove('disabled-arrow')
            }
        }
    };

    return <div className='doctor-of-week-section'>
        <div className="header-section">
            <h3 className='title-section'>Bác sĩ nổi bật tuần qua</h3>
            <div className="more-info-section">Xem thêm</div>
        </div>
        <Slider {...settings} ref={carousel} >
            {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div className='slide-item' key={slide.id}>
                    <a className='slide-body' href={`/doctor-${slide.id}`}>
                        <img src={slide.image} alt="" />
                        <h6 className='name'>{`${language == languages.EN ? slide.roleData.valueEn : slide.roleData.valueVi} ${slide.firstName} ${slide.lastName}`}</h6>
                    </a>
                </div>
            })}
        </Slider>
    </div>;
};
