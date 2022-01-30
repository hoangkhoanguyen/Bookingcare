import React from 'react';
import Slider from "react-slick";

import '../HomeAutoSlider/HomeSliderAutoScroll.scss'

export const HomeSliderAutoScroll = () => {

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
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
    return <div className='slide-auto-scroll'>
        <Slider {...settings}>
            {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div >
                    {/* <div className="slide-body">
                        <img src={slide.linkImg} alt="" />
                        <h3>{slide.id}</h3>
                    </div> */}

                    <h3><img src={slide.linkImg} alt="" /></h3>
                </div>
            })}
            {/* {slideList && slideList.length > 0 && slideList.map(slide => {
                return <div className='slide-item'>
                    <div className="slide-body">
                        <img src={slide.linkImg} alt="" />

                    </div>
                </div>
            })} */}
            {/* <div>
                <div>1</div>
            </div>
            <div>
                <div>1</div>
            </div>
            <div>
                <div>1</div>
            </div>
            <div>
                <div>1</div>
            </div> */}

        </Slider>
    </div>;
};
