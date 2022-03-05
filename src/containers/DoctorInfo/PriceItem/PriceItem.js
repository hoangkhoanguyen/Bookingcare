import React, { useEffect, useState } from 'react'
import doctorService from '../../../services/doctorService'
import NumberFormat from 'react-number-format'
import { languages } from '../../../utils'
import { useSelector } from 'react-redux'

export const PriceItem = (props) => {

    const { id } = props
    const [isMorePrice, setIsMorePrice] = useState(false)
    const [doctor, setDoctor] = useState()
    const [payment, setPayment] = useState('')
    const language = useSelector(state => state.app.language)

    useEffect(async () => {
        if (!id) return
        try {
            let res = await doctorService.getDoctorDetailsById(id)
            if (res && res.errCode === 0) {
                setDoctor(res.data)
            }
        } catch (error) {

        }
    }, [id])

    useEffect(() => {
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
        <div>
            haha
            {doctor &&
                <div className="address">
                    <h5>Địa chỉ khám</h5>
                    <p><b>{doctor.nameClinic}</b></p>
                    <p>{doctor.addressClinic}</p>
                </div>}
            {!isMorePrice ?
                <div className="price">Giá khám
                    <span>
                        {doctor &&
                            <NumberFormat
                                value={(doctor.priceData && doctor.priceData.valueVi) || 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                                renderText={(value, props) => <div {...props}>{value}</div>}
                            />}
                    </span>
                    <span className='more-btn' onClick={handleChangeMorePriceMode}>Xem chi tiết</span>
                </div> :
                <div className='price'>
                    <div className="price-details"><span>Giá khám</span>
                        <span>
                            {doctor &&
                                <NumberFormat
                                    value={(doctor.priceData && doctor.priceData.valueVi) || 0}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                    renderText={(value, props) => <div {...props}>{value}</div>}
                                />}
                        </span>
                    </div>
                    <div className="price-foreing">Giá khám dành cho người nước ngoài: {doctor.priceData && doctor.priceData.valueEn}</div>
                    <div className="payment-details">{payment}</div>
                    <div className="less-btn" onClick={handleChangeMorePriceMode}>Ẩn bảng giá</div>
                </div>}
        </div>
    )
}
