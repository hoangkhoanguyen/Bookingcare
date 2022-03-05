import React, { useEffect, useState } from 'react'
import doctorService from '../../../services/doctorService'
import '../DoctorInfo/DoctorResume.scss'

export const DoctorResume = (props) => {
    const { id } = props
    const [doctor, setDoctor] = useState({})

    useEffect(async () => {
        if (!id) {
            return
        }
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
    }, [id])
    return (
        <div className="introduction">
            {doctor && <div className="doctor-avatar">
                <img src={doctor.image} alt="Doctor Avatar" />
            </div>}
            {doctor && <div className="info">
                <div className="doctor-name">
                    {`${doctor.positionData && doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}`}
                </div>
                {doctor.details &&
                    <div className="doctor-description" >
                        {doctor.details.description}
                    </div>}
            </div>}
        </div>
    )
}
