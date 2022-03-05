import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import doctorService from '../../../services/doctorService'
import { languages } from '../../../utils'
import { LanguageSelection } from '../../LanguageSelection/LanguageSelection'
import '../DoctorInfo/DoctorInfo.scss'
import { DoctorSchedule } from './DoctorSchedule/DoctorSchedule'
import { DoctorResume } from './DoctorResume'
import { PriceItem } from '../PriceItem/PriceItem'

export const DoctorInfo = (props) => {

    const [doctor, setDoctor] = useState({})
    const [onTop, setOnTop] = useState(true)


    const { id } = props
    const language = useSelector(state => state.app.language)

    useEffect(() => {
        const handleScrollEvent = () => {
            let pos = document.querySelector('.doctor-details-page').scrollTop
            if (pos == 0) {
                setOnTop(true)
            }
            if (pos != 0) {
                setOnTop(false)
            }
        }
        document.querySelector('.doctor-details-page').addEventListener('scroll', () => { handleScrollEvent() })
    }, [])

    useEffect(async () => {
        try {
            let result = await doctorService.getDoctorDetailsById(id)
            if (result && result.errCode === 0) {
                if (result.data && result.data.image && result.data.image.type == "Buffer") {
                    let imageBase64 = new Buffer(result.data.image, 'base64').toString('binary')
                    setDoctor({
                        ...result.data,
                        image: imageBase64
                    })
                    return
                }
                setDoctor(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])


    return (
        <>
            <div className='doctor-info-header'>
                <i className="fas fa-arrow-left" onClick={() => { window.location.href = '/homepage' }}></i>
                {!onTop && <div className="doctor-name">
                    {doctor && `${doctor.positionData && doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}`}
                </div>}
                <div className="content-right">
                    <LanguageSelection />
                </div>

            </div>
            <div className="doctor-details-breadcrum">

            </div>
            {doctor && <div className='doctor-detail-body'>
                <div className="introduction-container">
                    <DoctorResume id={id} />
                </div>
                <div className="booking-info">
                    <DoctorSchedule doctorId={id} />
                    <div className="more-detail">
                        <PriceItem id={id} />

                    </div>
                </div>
                {doctor.details && <div className="doctor-detail" dangerouslySetInnerHTML={{ __html: doctor.details.contentHTML }}></div>}
                <div className="feedback-patient"></div>
            </div>}
        </>
    )
}
