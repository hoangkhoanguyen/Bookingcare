import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../../../utils'
import './ClinicListItem.scss'


export const ClinicListItem = (props) => {

    const { clinic } = props
    const language = useSelector(state => state.app.language)
    const [image, setImage] = useState()

    useEffect(() => {
        if (clinic && clinic.image && clinic.image.type == 'Buffer') {
            let imageBase64 = new Buffer(clinic.image, 'base64').toString('binary')
            setImage(imageBase64)
        }
    }, [clinic])

    const handleClickChooseclinic = () => {
        if (clinic) {
            window.location.href = `/clinic-${clinic.id}`
        }
    }
    return (
        <div className='clinic-item-container' onClick={handleClickChooseclinic}>
            <div className="avatar-clinic">
                {image &&
                    <img src={image} alt="" />
                }
            </div>
            <div className="clinic-name">
                {clinic &&
                    <p>
                        {clinic.name}
                    </p>
                }
            </div>
        </div>
    )
}
