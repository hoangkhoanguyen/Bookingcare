import React from 'react';
import { NewsSection } from './NewsSection/NewsSection';
import { PopularSpecialtySection } from './PopularSpecialtySection/PopularSpecialtySection';
import { MainContent } from './MainContent/MainContent';
import '../HomeBody/HomeBody.scss'
import { MedicalFacilitySection } from './MedicalFacilitySection/MedicalFacilitySection';
import { DoctorOfWeek } from './DoctorOfWeek/DoctorOfWeek';
import { AboutMe } from './AboutMe/AboutMe';
import { AboutPage } from '../../AboutPage/AboutPage';

export const HomeBody = () => {
    return <div className='home-body'>
        <MainContent />
        <NewsSection />
        <PopularSpecialtySection />
        <MedicalFacilitySection />
        <DoctorOfWeek />
    </div>;
};
