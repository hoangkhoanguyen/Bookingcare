import React from 'react';
import { NewsSection } from './NewsSection/NewsSection';
import { PopularSpecialtySection } from './PopularSpecialtySection/PopularSpecialtySection';
import { MainContent } from './MainContent/MainContent';
import '../HomeBody/HomeBody.scss'
import { MedicalFacilitySection } from './MedicalFacilitySection/MedicalFacilitySection';
import { DoctorOfWeek } from './DoctorOfWeek/DoctorOfWeek';

export const HomeBody = () => {
    return <>
        <MainContent />
        <NewsSection />
        <PopularSpecialtySection />
        <MedicalFacilitySection />
        <DoctorOfWeek />
    </>;
};
