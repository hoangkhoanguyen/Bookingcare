import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import clinicService from '../../services/clinicService'
import { languages } from '../../utils'
import { DoctorListByDoctorList } from '../DoctorListByDoctorList/DoctorListByDoctorList'
import './Clinic.scss'
import { ClinicDetails } from './ClinicDetails/ClinicDetails'

export const Clinic = () => {

    const { id } = useParams()
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
        <div className='clinic-body'>
            <div className="clinic-details">
                <ClinicDetails id={id} />
            </div>
            <div className="doctor-list-by-clinic">
                {doctorList && doctorList.length > 0 && <DoctorListByDoctorList doctorList={doctorList} />}
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
