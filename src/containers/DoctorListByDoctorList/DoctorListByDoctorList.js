import React from 'react'
import { DoctorItem } from './DoctorItem/DoctorItem'
import './DoctorListByDoctorList.scss'

export const DoctorListByDoctorList = (props) => {
    const { doctorList } = props

    return (
        <div className="doctor-list-container">
            {doctorList && doctorList.length > 0 && doctorList.map((item, index) => {
                return <div key={index} className="doctor-list-item">
                    <DoctorItem id={item} />
                </div>
            })}
        </div>
    )
}
