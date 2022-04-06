import { set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import clinicService from '../../../../services/clinicService';

import '../MedicalFacilitySection/MedicalFacilitySection.scss'

export const MedicalFacilitySection = () => {

    const carousel = useRef(null)
    const [number, setNumber] = useState(0)
    const [clinicList, setClinicList] = useState()

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    useEffect(async () => {
        try {
            let res = await clinicService.getClinic()
            console.log('clinic', res)
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
                console.log(arr)
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
            <div className="more-info-section">Xem thêm</div>
        </div>
        <Slider {...settings} ref={carousel} >
            {console.log(clinicList)}
            {clinicList && clinicList.length > 0 && clinicList.map(slide => {
                return (
                    <div className='slide-item' key={slide.id}>
                        {console.log('item', slide.name)}
                        <a href={`/clinic-${slide.id}`} className="slide-body">
                            <div className="slide-img">
                                <img src={slide.image} alt="" />
                            </div>
                            <h6>{slide.name}</h6>
                        </a>
                    </div>
                )
            })}
        </Slider>
    </div>;
};
