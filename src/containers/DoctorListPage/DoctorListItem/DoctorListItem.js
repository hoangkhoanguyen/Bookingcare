import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../../../utils'
import './DoctorListItem.scss'


export const DoctorListItem = (props) => {

    const { doctor } = props
    const language = useSelector(state => state.app.language)
    const [image, setImage] = useState()

    useEffect(() => {
        if (doctor && doctor.image && doctor.image.type == 'Buffer') {
            let imageBase64 = new Buffer(doctor.image, 'base64').toString('binary')
            setImage(imageBase64)
        }
    }, [doctor])

    const handleClickChooseDoctor = () => {
        if (doctor) {
            window.location.href = `/doctor-${doctor.id}`
        }
    }
    return (
        <div className='doctor-item-container' onClick={handleClickChooseDoctor}>
            <div className="avatar-doctor">
                {image &&
                    <img src={image} alt="" />
                }
            </div>
            <div className="doctor-name">
                {doctor && doctor.roleData &&
                    <p>
                        {language == languages.VI ? doctor.roleData.valueVi : doctor.roleData.valueEn} {language == languages.VI ? `${doctor.lastName} ${doctor.firstName}` : `${doctor.firstName} ${doctor.lastName}`}
                    </p>
                }
            </div>
        </div>
    )
}
