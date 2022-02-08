import React from 'react';
import { NewsSection } from './NewsSection/NewsSection';
import { PopularSpecialtySection } from './PopularSpecialtySection/PopularSpecialtySection';
import { MainContent } from './MainContent/MainContent';
import '../HomeBody/HomeBody.scss'

export const HomeBody = () => {
    return <div className='home-body'>
        <MainContent />
        <NewsSection />
        <PopularSpecialtySection />
    </div>;
};
