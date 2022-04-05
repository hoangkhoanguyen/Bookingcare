import React from 'react'
import { useEffect } from 'react'
import '../SpecialtyDetails/SpecialtyDetails.scss'
import specialtyService from '../../../services/specialtyService'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

export const SpecialtyDetails = (props) => {
    const { id } = props
    const [specialtyInfo, setSpecialtyInfo] = useState()
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(async () => {
        try {
            let res = await specialtyService.getSpecialty(id)
            if (res && res.errCode === 0) {
                let item = res.data
                item = {
                    ...item,
                    image: new Buffer(item.image, 'base64').toString('binary')
                }
                setSpecialtyInfo(item)
                document.querySelector('specialty-container specialty-content')
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }
    return (
        <div className='specialty-container'>
            {specialtyInfo &&
                <div className={isExpanded ? "specialty-content expanded" : "specialty-content"} style={{ backgroundImage: `linear-gradient(to top,#fff, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.8) 100%), url(${specialtyInfo.image})` }}>
                    <h3>{specialtyInfo.name}</h3>
                    <div className="specialty-details" dangerouslySetInnerHTML={{ __html: specialtyInfo.descriptionHTML }}>
                    </div>
                </div>}
            {!specialtyInfo &&
                <div className="specialty-content-loading">
                    <div className='specialty-title'>
                        <div className='loading'></div>
                    </div>
                    <div className="specialty-details">
                        <div className='loading'></div>
                    </div>
                </div>
            }
            <div className="actions-btns" onClick={handleToggleExpanded}>
                {isExpanded ? <FormattedMessage id='common.less' /> : <FormattedMessage id='common.read-more' />}
            </div>
        </div>
    )
}
