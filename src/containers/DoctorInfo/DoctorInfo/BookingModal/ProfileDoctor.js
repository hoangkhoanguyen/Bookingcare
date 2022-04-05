import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import doctorService from '../../../../services/doctorService'
import '../BookingModal/ProfileDoctor.scss'
import moment from 'moment'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { languages } from '../../../../utils'
import 'moment/locale/vi'

export const ProfileDoctor = (props) => {
    const { id, date, time, isShowDescription } = props
    const [doctor, setDoctor] = useState()
    const language = useSelector(state => state.app.language)
    const [timeDateDisplay, setTimeDateDisplay] = useState('')

    useEffect(() => {
        if (time && !_.isEmpty(time)) {
            let timeDisplay = language == languages.EN ? time.valueEn : time.valueVi
            let dateDisplay = language == languages.EN ?
                moment.unix(+date / 1000).locale('en').format('ddd - DD/MM/YYYY')
                :
                moment.unix(+date / 1000).locale('vi').format('dddd - DD/MM/YYYY')
            setTimeDateDisplay(`${timeDisplay} - ${dateDisplay}`)
        }
    }, [date, time])

    useEffect(async () => {

        try {
            let result = await doctorService.getProfileDoctor(id)
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

    // useEffect(() => {
    //     if (doctor && doctor.details && isShowDescription) {
    //         document.querySelector('.profile-doctor .doctor-description').innerText = doctor.details.description
    //     }

    // }, [doctor])

    return (<>
        {doctor && <div className="profile-doctor">
            <div className="doctor-avatar">
                <img src={doctor.image} alt="Doctor Avatar" />
            </div>
            <div className="info">
                {doctor.positionData &&
                    <div className="doctor-name">
                        {`${doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}`}
                    </div>
                }
                {doctor.details &&
                    <div className="doctor-description" dangerouslySetInnerHTML={{ __html: doctor.details.description }}>

                    </div>}
                {!isShowDescription &&
                    <div className="date-time">
                        <p>{timeDateDisplay}</p>
                        <p>Miễn phí đặt lịch</p>
                    </div>}
                {doctor.priceData &&
                    <div className="modal-price">
                        <span>Giá khám:</span>
                        <NumberFormat
                            value={doctor.priceData.valueVi || 0}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                            renderText={(value, props) => <div {...props}>{value}</div>}
                        />
                    </div>
                }
            </div>
        </div>}
        {!doctor &&
            <div className="profile-doctor-loading">
                <div className="doctor-avatar">
                    <div className="loading"></div>
                </div>
                <div className="info">
                    <div className="doctor-name">
                        <div className="loading"></div>
                    </div>
                    <div className="doctor-description">
                        <div className="loading"></div>
                    </div>
                </div>
            </div>
        }
    </>
    )
}
