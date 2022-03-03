import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import doctorService from '../../../services/doctorService'
import { languages } from '../../../utils'
import { LanguageSelection } from '../../LanguageSelection/LanguageSelection'
import '../DoctorInfo/DoctorInfo.scss'
import { DoctorSchedule } from './DoctorSchedule/DoctorSchedule'
import NumberFormat from 'react-number-format'
import { BookingModal } from './BookingModal/BookingModal'

export const DoctorInfo = (props) => {

    const [doctor, setDoctor] = useState({})
    const [onTop, setOnTop] = useState(true)
    const [isMorePrice, setIsMorePrice] = useState(false)
    const [payment, setPayment] = useState('')
    const { id } = props
    const language = useSelector(state => state.app.language)

    useEffect(() => {
        const handleScrollEvent = () => {
            let pos = document.querySelector('.doctor-details-page').scrollTop
            if (pos == 0) {
                setOnTop(true)
            }
            if (pos != 0) {
                setOnTop(false)
            }
        }
        document.querySelector('.doctor-details-page').addEventListener('scroll', () => { handleScrollEvent() })

    }, [])

    useEffect(async () => {
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
    }, [])
    useEffect(() => {
        if (doctor && doctor.details) {
            document.querySelector('.doctor-detail-body .doctor-detail').innerHTML = doctor.details.contentHTML
            document.querySelector('.doctor-detail-body .doctor-description').innerText = doctor.details.description
        }
        if (doctor) {
            let contentPayment = ''
            let commonContentPayment = language == languages.VI ? 'Phòng khám chấp nhận thanh toán bằng hình thức ' : 'The clinic accepts payment by '
            switch (doctor.paymentId) {
                case 'PAY1':
                case 'PAY2':
                    contentPayment = language == languages.VI ? doctor.paymentData.valueVi : doctor.paymentData.valueEn
                    break;
                case 'PAY3':
                    contentPayment = language == languages.VI ? 'tiền mặt và quẹt thẻ' : 'cash and credit card'
                default:
                    break;
            }
            setPayment(commonContentPayment + contentPayment)
        }
    }, [doctor, language])

    const handleChangeMorePriceMode = () => {
        setIsMorePrice(!isMorePrice)
    }
    return (
        <>
            <div className='doctor-info-header'>
                <i className="fas fa-arrow-left" onClick={() => { window.location.href = '/homepage' }}></i>
                {!onTop && <div className="doctor-name">
                    {doctor && `${doctor.positionData && doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}`}
                </div>}
                <div className="content-right">
                    <LanguageSelection />
                </div>

            </div>
            <div className="doctor-details-breadcrum">

            </div>
            {doctor && <div className='doctor-detail-body'>
                <div className="introduction">
                    <div className="doctor-avatar">
                        <img src={doctor.image} alt="Doctor Avatar" />
                    </div>
                    <div className="info">
                        <div className="doctor-name">
                            {`${doctor.positionData && doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}`}
                        </div>
                        <div className="doctor-description">
                        </div>
                    </div>
                </div>
                <div className="booking-info">
                    <DoctorSchedule doctorId={id} />
                    <div className="more-detail">
                        <div className="address">
                            <h5>Địa chỉ khám</h5>
                            <p><b>{doctor.nameClinic}</b></p>
                            <p>{doctor.addressClinic}</p>
                        </div>
                        {!isMorePrice ? <div className="price">Giá khám <span>
                            <NumberFormat
                                value={(doctor.priceData && doctor.priceData.valueVi) || 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                                renderText={(value, props) => <div {...props}>{value}</div>}
                            />;</span>
                            <span className='more-btn' onClick={handleChangeMorePriceMode}>Xem chi tiết</span>
                        </div> : <div className='price'>
                            <div className="price-details"><span>Giá khám</span><span>
                                <NumberFormat
                                    value={(doctor.priceData && doctor.priceData.valueVi) || 0}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                    renderText={(value, props) => <div {...props}>{value}</div>}
                                />;
                            </span></div>
                            <div className="price-foreing">Giá khám dành cho người nước ngoài: {doctor.priceData && doctor.priceData.valueEn}</div>
                            <div className="payment-details">{payment}</div>
                            <div className="less-btn" onClick={handleChangeMorePriceMode}>Ẩn bảng giá</div>
                        </div>}
                    </div>
                </div>
                <div className="doctor-detail"></div>
                <div className="feedback-patient"></div>
            </div>}
        </>
    )
}
