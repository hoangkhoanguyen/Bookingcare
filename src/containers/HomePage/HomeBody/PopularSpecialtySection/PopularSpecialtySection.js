import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import specialtyService from '../../../../services/specialtyService'
import { path } from '../../../../utils';
import '../PopularSpecialtySection/PopularSpecialtySection.scss'

export const PopularSpecialtySection = () => {

    const carousel = useRef(null)
    const [specialtyArr, setSpecialtyArr] = useState([])

    useEffect(async () => {
        try {
            let res = await specialtyService.getSpecialty()
            if (res && res.errCode === 0) {
                let arr = res.data
                if (arr.length > 0) {
                    arr = arr.map(item => {
                        let imageBase64 = ''
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                        }
                        return {
                            ...item,
                            image: imageBase64
                        }
                    })
                }
                setSpecialtyArr(arr)
            } else {
                setSpecialtyArr([])
            }
        } catch (error) {
            console.log(error)
            setSpecialtyArr([])
        }
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

    return <div className='popular-specialty-section'>
        <div className="header-section">
            <h3 className='title-section'>Chuyên khoa phổ biến</h3>
            <Link to={path.SPECIALTY_LIST} className="more-info-section">Xem thêm</Link>
        </div>
        <Slider {...settings} ref={carousel} >
            {specialtyArr && specialtyArr.length > 0 && specialtyArr.map(slide => {
                return <div className='slide-item' key={slide.id}>
                    <Link to={`/specialty-${slide.id}`} className="slide-body">
                        <div className="slide-img">
                            <img src={slide.image} alt="" />
                        </div>
                        <h6>{slide.name}</h6>
                    </Link>
                </div>
            })}
        </Slider>
    </div>;
};
