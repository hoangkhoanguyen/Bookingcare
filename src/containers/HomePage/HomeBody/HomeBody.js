import React from 'react';
import { HomeSliderAutoScroll } from './HomeAutoSlider/HomeSliderAutoScroll';
import { HomeSlider } from './HomeSlider/HomeSlider';
import { MainContent } from './MainContent/MainContent';

export const HomeBody = () => {
    return <div className='body'>
        <MainContent />
        <HomeSliderAutoScroll />
        <HomeSlider />
    </div>;
};
