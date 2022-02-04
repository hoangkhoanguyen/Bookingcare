import React, { useRef, useState } from 'react';
import Slider from "react-slick";

import '../HomeSlider/HomeSlider.scss'

export const HomeSlider = () => {

    const carousel = useRef(null)
    const [number, setNumber] = useState(0)

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const slideList = [
        {
            id: 1,
            linkImg: '/Img/Homepage/autoscroll1.png',
            title: 'Nhận diện COVID bằng tiếng ho',
            content: [
                {
                    id: 1,
                    title: `Quyên góp môt tiếng Ho giúp huấn luyện "A.I - trí tuệ nhân tạo" phát hiện Covid-19 trong cộng đồng`
                }
            ],
            action: 'XEM CHI TIẾT'
        },
        {
            id: 2,
            linkImg: '/Img/Homepage/autoscroll1.png',
            title: 'Nhận diện COVID bằng tiếng ho',
            content: [
                {
                    id: 1,
                    title: `Quyên góp môt tiếng Ho giúp huấn luyện "A.I - trí tuệ nhân tạo" phát hiện Covid-19 trong cộng đồng`
                }
            ],
            action: 'XEM CHI TIẾT'
        },
        {
            id: 3,
            linkImg: '/Img/Homepage/autoscroll1.png',
            title: 'Nhận diện COVID bằng tiếng ho',
            content: [
                {
                    id: 1,
                    title: `Quyên góp môt tiếng Ho giúp huấn luyện "A.I - trí tuệ nhân tạo" phát hiện Covid-19 trong cộng đồng`
                }
            ],
            action: 'XEM CHI TIẾT'
        },
        {
            id: 4,
            linkImg: '/Img/Homepage/autoscroll1.png',
            title: 'Nhận diện COVID bằng tiếng ho',
            content: [
                {
                    id: 1,
                    title: `Quyên góp môt tiếng Ho giúp huấn luyện "A.I - trí tuệ nhân tạo" phát hiện Covid-19 trong cộng đồng`
                }
            ],
            action: 'XEM CHI TIẾT'
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
    return <div className='slide-scroll'>
        <Slider {...settings} ref={carousel}>
            {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div className='slide-item' key={slide.id}>
                    <div className="slide-body">
                        <img src={slide.linkImg} alt="" />
                        <h5>{slide.title}</h5>
                        <ul>
                            {slide.content && slide.content.length > 0 && slide.content.map(content => {
                                return <li key={content.id}>{content.title}</li>
                            })}
                        </ul>
                    </div>
                </div>
            })}
        </Slider>
    </div>;
};
