import React from 'react'
import { useParams } from 'react-router'
import './Clinic.scss'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { ClinicNavigation } from './ClinicNavigation/ClinicNavigation'
import { ClinicDetails } from './ClinicDetails/ClinicDetails'
import { DoctorListByClinic } from './DoctorListByClinic/DoctorListByClinic'

export const Clinic = () => {

    const { id } = useParams()

    return (
        <>
            <HomeHeader />
            <div className="body">

                <div className="clinic-details">
                    <ClinicDetails id={id} />
                </div>
                <div className="doctor-list-by-clinic">
                    <DoctorListByClinic id={id} />
                </div>
            </div>
        </>
    )
}
