import React from 'react'
import { useParams } from 'react-router-dom'
import { DoctorListBySpecialty } from './DoctorListBySpecialty/DoctorListBySpecialty'
import { SpecialtyDetails } from './SpecialtyDetails/SpecialtyDetails'
import './Specialty.scss'
export const Specialty = () => {

    const { id } = useParams()

    return (
        <div className='specialty-body'>
            <div className="specialty-details">
                <SpecialtyDetails id={id} />
            </div>
            <div className="doctor-list-by-specialty">
                <DoctorListBySpecialty id={id} />
            </div>
        </div>
    )
}
