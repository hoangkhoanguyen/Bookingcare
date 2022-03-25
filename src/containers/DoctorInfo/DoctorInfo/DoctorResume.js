import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import doctorService from '../../../services/doctorService'
import { languages } from '../../../utils'
import '../DoctorInfo/DoctorResume.scss'

export const DoctorResume = (props) => {
    const { id } = props
    const language = useSelector(state => state.app.language)
    const [doctor, setDoctor] = useState()

    useEffect(async () => {
        try {
            if (!id) return
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
            } else {
                setDoctor(null)
            }
        } catch (error) {
            console.log(error)
            setDoctor(null)
        }
    }, [id])
    return (
        <>
            {doctor &&
                <div className="introduction">
                    {doctor.image && <div className="doctor-avatar">
                        <img src={doctor.image} alt="Doctor Avatar" />
                    </div>}
                    {doctor.positionData &&
                        <div className="info">
                            <div className="doctor-name">
                                {language == languages.VI ?
                                    `${doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}` :
                                    `${doctor.positionData.valueEn} ${doctor.firstName} ${doctor.lastName}`}
                            </div>
                            {doctor.details &&
                                <div className="doctor-description" >
                                    {doctor.details.description}
                                </div>}
                        </div>}
                </div>}
            {!doctor &&
                <div className="introduction-loading">
                    <div className="doctor-avatar">
                        <div className="loading"></div>
                    </div>
                    <div className="info">
                        <div className="doctor-name">
                            <div className="loading"></div>
                        </div>

                        <div className="doctor-description" >
                            <div className="loading"></div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
