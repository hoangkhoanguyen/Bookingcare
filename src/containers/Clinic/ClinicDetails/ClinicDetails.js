import React, { useEffect, useState } from 'react'
import clinicService from '../../../services/clinicService'
import './ClinicDetails.scss'


export const ClinicDetails = (props) => {

    const { id } = props
    const [clinic, setClinic] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(async () => {
        try {
            if (!id) return
            let res = await clinicService.getClinic(id)
            if (res && res.errCode === 0) {
                let arr = res.data
                if (arr) {
                    let imageBase64 = ''
                    if (arr.image) {
                        imageBase64 = new Buffer(arr.image, 'base64').toString('binary')
                        arr.image = imageBase64
                    }
                }
                setLoading(false)
                setClinic(arr)
            } else {
                setLoading(true)
                setClinic(null)
            }
        } catch (error) {
            console.log(error)
            setLoading(true)
            setClinic(null)
        }
    }, [id])
    return (<>
        {clinic &&
            <div className='clinic-details-content' >
                <div className="clinic-image" style={{ backgroundImage: `url(${clinic.image})` }}></div>
                <div className="details">
                    <div className="clinic-title">{clinic.name}</div>
                    <div className="clinic-address">
                        <i className="fas fa-map-marker-alt"></i>
                        {clinic.address}
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: clinic.descriptionHTML }}>

                    </div>
                </div>
            </div>}
        {isLoading &&
            <div className='clinic-details-content-loading' >
                <div className="clinic-image" >
                    <div className="loading"></div>
                </div>
                <div className="details">
                    <div className="clinic-title">
                        <div className="loading"></div>
                    </div>
                    <div className="clinic-address">
                        <div className="loading"></div>
                    </div>
                    <div className="description">
                        <div className="loading"></div>
                    </div>
                </div>
            </div>
        }
    </>
    )
}
