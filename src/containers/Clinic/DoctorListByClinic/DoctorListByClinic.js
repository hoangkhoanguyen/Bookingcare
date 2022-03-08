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
            if (res && res.errCode === 0) {
                setDoctorList(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [id])
    return (
        <div className='doctor-list-contain er'>
            {doctorList && doctorList.length > 0 && doctorList.map((item, index) => {
                return <div key={index} className="doctor-info-item">
                    <DoctorItem id={item} />
                </div>
            })}
        </div>
    )
}
