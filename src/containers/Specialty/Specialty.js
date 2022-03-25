import React from 'react'
import { useParams } from 'react-router-dom'
import { AboutPage } from '../AboutPage/AboutPage'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { DoctorListBySpecialty } from './DoctorListBySpecialty/DoctorListBySpecialty'
import { SpecialtyDetails } from './SpecialtyDetails/SpecialtyDetails'
import { HomeFooter } from '../HomePage/HomeFooter/HomeFooter'

export const Specialty = () => {

    const { id } = useParams()
    return (
        <>
            <HomeHeader />
            <div className="specialty-details">
                <SpecialtyDetails id={id} />
            </div>
            <div className="doctor-list-by-specialty">
                <DoctorListBySpecialty id={id} />
            </div>
            <AboutPage />
            <HomeFooter />
        </>
    )
}
