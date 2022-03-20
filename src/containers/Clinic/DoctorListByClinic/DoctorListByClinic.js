import React, { useEffect, useState } from 'react'
import clinicService from '../../../services/clinicService'
import { DoctorItem } from '../../Specialty/DoctorItem/DoctorItem'
import './DoctorListByClinic.scss'

export const DoctorListByClinic = (props) => {

    const { id } = props

    const [doctorList, setDoctorList] = useState([])

    useEffect(async () => {
        if (!id) return
        try {
            let res = await clinicService.getDoctorListByClinicId(id)
            console.log(res)
            if (res && res.errCode === 0) {
                setDoctorList(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [id])
    return (
        <div className='doctor-list-container'>
            <div className="doctor-info-container">
                {doctorList && doctorList.length > 0 && doctorList.map((item, index) => {
                    return <div key={index} className="doctor-info-item">
                        <DoctorItem id={item} />
                    </div>
                })}
            </div>
        </div>
    )
}
