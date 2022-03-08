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
                if (arr.length > 0) {
                    arr = arr.map(item => {
                        let imageBase64 = ''
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                        }
                        return {
                            ...item,
                            image: imageBase64
                        }
                    })
                }
                setClinic(arr)
            } else {
                setClinic([])
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (<>
        {clinic && <div className='clinic-details-content' dangerouslySetInnerHTML={{ __html: clinic.descriptionHTML }}>

        </div>}
    </>
    )
}
