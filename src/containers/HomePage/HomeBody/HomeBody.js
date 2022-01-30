import React from 'react';
import { HomeSliderAutoScroll } from './HomeAutoSlider/HomeSliderAutoScroll';
import { MainContent } from './MainContent/MainContent';

export const HomeBody = () => {
    return <div className='body'>
        <MainContent />
        <HomeSliderAutoScroll />
    </div>;
};
