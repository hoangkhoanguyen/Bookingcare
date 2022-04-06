import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../../../utils'
import './SpecialtyListItem.scss'


export const SpecialtyListItem = (props) => {

    const { specialty } = props
    const language = useSelector(state => state.app.language)
    const [image, setImage] = useState()

    useEffect(() => {
        if (specialty && specialty.image && specialty.image.type == 'Buffer') {
            let imageBase64 = new Buffer(specialty.image, 'base64').toString('binary')
            setImage(imageBase64)
        }
    }, [specialty])

    const handleClickChooseSpecialty = () => {
        if (specialty) {
            window.location.href = `/specialty-${specialty.id}`
        }
    }
    return (
        <div className='specialty-item-container' onClick={handleClickChooseSpecialty}>
            <div className="avatar-specialty">
                {image &&
                    <img src={image} alt="" />
                }
            </div>
            <div className="specialty-name">
                {specialty &&
                    <p>
                        {specialty.name}
                    </p>
                }
            </div>
        </div>
    )
}
