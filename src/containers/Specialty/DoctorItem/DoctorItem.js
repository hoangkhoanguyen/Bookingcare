import React from 'react'
import { DoctorResume } from '../../DoctorInfo/DoctorInfo/DoctorResume'
import { DoctorSchedule } from '../../DoctorInfo/DoctorInfo/DoctorSchedule/DoctorSchedule'
import { PriceItem } from '../../DoctorInfo/PriceItem/PriceItem'
import '../DoctorItem/DoctorItem.scss'

export const DoctorItem = (props) => {
    const { id } = props

    return (
        <div className='doctor-info-card'>
            <div className="doctor-info">
                <DoctorResume id={id} />
            </div>
            <div className="doctor-booking">
                <div className="schedule-info">
                    <DoctorSchedule doctorId={id} />
                </div>
                <div className="price-info">
                    <PriceItem id={id} />
                </div>
            </div>
        </div>
    )
}
