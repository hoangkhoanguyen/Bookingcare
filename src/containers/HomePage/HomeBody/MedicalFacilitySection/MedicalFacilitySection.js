import { set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import clinicService from '../../../../services/clinicService';
import { path } from '../../../../utils';

import '../MedicalFacilitySection/MedicalFacilitySection.scss'

export const MedicalFacilitySection = () => {

    const carousel = useRef(null)
    const [number, setNumber] = useState(0)
    const [clinicList, setClinicList] = useState()

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
    useEffect(async () => {
        try {
            let res = await clinicService.getClinic()
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
                setClinicList(arr)
            } else {
                setClinicList([])
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    return <div className='medical-facility-section'>
        <div className="header-section">
            <h3 className='title-section'>Cơ sở y tế nổi bật</h3>
            <Link to={path.CLINIC_LIST} className="more-info-section">Xem thêm</Link>
        </div>
        <Slider {...settings} ref={carousel} >
            {clinicList && clinicList.length > 0 && clinicList.map(slide => {
                return (
                    <div className='slide-item' key={slide.id}>
                        <Link to={`/clinic-${slide.id}`} className="slide-body">
                            <div className="slide-img">
                                <img src={slide.image} alt="" />
                            </div>
                            <h6>{slide.name}</h6>
                        </Link>
                    </div>
                )
            })}
        </Slider>
    </div>;
};
