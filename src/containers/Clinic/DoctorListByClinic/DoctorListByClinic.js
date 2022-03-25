import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import clinicService from '../../../services/clinicService'
import { languages } from '../../../utils'
import { DoctorItem } from '../../Specialty/DoctorItem/DoctorItem'
import './DoctorListByClinic.scss'

export const DoctorListByClinic = (props) => {

    const { id } = props
    const language = useSelector(state => state.app.language)
    const [doctorList, setDoctorList] = useState()


    useEffect(async () => {
        if (!id) return
        try {
            let res = await clinicService.getDoctorListByClinicId(id)
            if (res && res.errCode === 0) {
                setDoctorList(res.data)
            } else {
                setDoctorList(null)
            }
        } catch (error) {
            console.log(error)
            setDoctorList(null)
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
                {doctorList && doctorList.length == 0 &&
                    <div >
                        {language == languages.VI ?
                            'Hiện hệ thống chưa có bác sĩ thuộc chuyên khoa này' :
                            'There is no doctor in this specialty now'}
                    </div>
                }
            </div>
        </div>
    )
}
