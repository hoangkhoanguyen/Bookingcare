import React, { useRef } from 'react';
import Slider from "react-slick";

import './NewsSection.scss'

export const NewsSection = () => {

    const carousel = useRef(null)

    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToSscroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
    return <div className='news-section'>
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
