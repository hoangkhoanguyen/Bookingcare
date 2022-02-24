import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { fetchDoctorOfWeekStart } from '../../../../store/actions/homePageAction';
import { languages } from '../../../../utils';
import '../DoctorOfWeek/DoctorOfWeek.scss'


export const DoctorOfWeek = () => {
    const slideList = useSelector(state => state.homePage.doctorOfWeek)
    const language = useSelector(state => state.app.language)
    const carousel = useRef(null)

    useEffect(() => {
        dispatch(fetchDoctorOfWeekStart(8))
        if (document.querySelector('.doctor-of-week-section .slick-prev')) {
            document.querySelector('.doctor-of-week-section .slick-prev').classList.add('disabled-arrow')

        }
    }, [carousel])

    // useEffect(() => {

    // }, [slideList])

    const dispatch = useDispatch()

    const [number, setNumber] = useState(0)

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: (index) => {
            if (index == 0) {
                console.log('start')
                document.querySelector('.doctor-of-week-section .slick-prev').classList.add('disabled-arrow')
            } else {
                document.querySelector('.doctor-of-week-section .slick-prev').classList.remove('disabled-arrow')
            }

        }
    };

    // const slideList = [
    //     {
    //         id: 1,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     },
    //     {
    //         id: 2,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     },
    //     {
    //         id: 3,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     },
    //     {
    //         id: 4,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     },
    //     {
    //         id: 5,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     },
    //     {
    //         id: 6,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     },
    //     {
    //         id: 7,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     },
    //     {
    //         id: 8,
    //         linkImg: '/Img/Homepage/DoctorOfWeek/103848anh-dai-dien-bs.jpg',
    //         name: 'Khám Nam học, Bệnh viên Nam học và Hiếm muộn Hà Nội',
    //         specialty: 'Nam học'
    //     }
    // ]

    const handleClickDoctorInfo = (id) => {

        window.location.href = `doctor/doctor-${id}`
    }

    return <div className='doctor-of-week-section'>
        {console.log(slideList)}
        <div className="header-section">
            <h3 className='title-section'>Bác sĩ nổi bật tuần qua</h3>
            <div className="more-info-section">Xem thêm</div>
        </div>
        <Slider {...settings} ref={carousel} >
            {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div className='slide-item' key={slide.id}>
                    {/* <a className="slide-body" href={`/doctor-${slide.id}`}> */}
                    <div className='slide-body' onClick={() => { handleClickDoctorInfo(slide.id) }}>
                        <img src={slide.image} alt="" />
                        <h6 className='name'>{`${language == languages.EN ? slide.roleData.valueEn : slide.roleData.valueVi} ${slide.firstName} ${slide.lastName}`}</h6>
                        {/* <h6 className='sub-name'>{slide.specialty}</h6> */}
                    </div>
                </div>
            })}
        </Slider>
    </div>;
};
