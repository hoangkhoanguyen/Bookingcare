import React, { useEffect, useState } from 'react'
import clinicService from '../../../services/clinicService'
import './ClinicDetails.scss'


export const ClinicDetails = (props) => {

    const { id } = props
    const [clinic, setClinic] = useState()

    useEffect(async () => {
        try {
            if (!id) return
            let res = await clinicService.getClinic(id)
            if (res && res.errCode === 0) {
                // console.log(res.data.descriptionMarkdown)
                let arr = res.data
                if (arr) {
                    let imageBase64 = ''
                    if (arr.image) {
                        imageBase64 = new Buffer(arr.image, 'base64').toString('binary')
                        arr.image = imageBase64
                    }
                }
                setClinic(arr)
            } else {
                setClinic([])
            }
        } catch (error) {
            console.log(error)
        }
    }, [id])
    return (<>
        {clinic &&
            <div className='clinic-details-content' >
                {console.log(clinic)}
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
    </>
    )
}
