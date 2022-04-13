import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { fetchDoctorOfWeekStart } from '../../../../store/actions/homePageAction';
import { languages, path } from '../../../../utils';
import '../DoctorOfWeek/DoctorOfWeek.scss'

export const DoctorOfWeek = () => {

    const dispatch = useDispatch()

    const slideList = useSelector(state => state.homePage.doctorOfWeek)
    const language = useSelector(state => state.app.language)
    const carousel = useRef(null)

    useEffect(() => {
        dispatch(fetchDoctorOfWeekStart(8))
        // if (document.querySelector('.doctor-of-week-section .slick-prev')) {
        //     document.querySelector('.doctor-of-week-section .slick-prev').classList.add('disabled-arrow')
        // }
    }, [])


    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToSscroll: 1,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return <div className='doctor-of-week-section'>
        <div className="header-section">
            <h3 className='title-section'>Bác sĩ nổi bật tuần qua</h3>
            <Link to={path.DOCTOR_LIST} className="more-info-section">Xem thêm</Link>
        </div>
        <Slider {...settings} ref={carousel} >
            {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div className='slide-item' key={slide.id}>
                    <Link className='slide-body' to={`/doctor-${slide.id}`}>
                        <div className="card-img">
                            <img src={slide.image} alt="" />
                        </div>
                        <h6 className='name'>{`${language == languages.EN ? slide.roleData.valueEn : slide.roleData.valueVi} ${slide.firstName} ${slide.lastName}`}</h6>
                    </Link>
                </div>
            })}
        </Slider>
    </div>;
};
