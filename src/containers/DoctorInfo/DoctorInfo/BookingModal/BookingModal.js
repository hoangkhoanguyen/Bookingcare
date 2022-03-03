import React, { useEffect } from 'react'
import { useState } from 'react'
import DatePicker from 'react-flatpickr'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import patientService from '../../../../services/patientService'
import { fetchStart } from '../../../../store/actions/userActions'
import { languages } from '../../../../utils'
import '../BookingModal/BookingModal.scss'
import { ProfileDoctor } from './ProfileDoctor'
import moment from 'moment'
import 'moment/locale/vi'
import _, { pick } from 'lodash'

export const BookingModal = (props) => {

    const dispatch = useDispatch()
    const { doctorId, lastName, firstName, closeModal, date, time } = props
    const [clientInfo, setClientInfo] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: '',
        gender: '',
    })
    const genderArr = useSelector(state => state.user.genderArr)
    const language = useSelector(state => state.app.language)
    const [birthday, setBirthday] = useState('')

    useEffect(() => {
        dispatch(fetchStart('GENDER'))
    }, [])

    const buildTimeDateDisplay = (timeData, dateData) => {
        if ({ timeData, dateData } && !_.isEmpty({ timeData, dateData })) {
            let timeDisplay = language == languages.EN ?
                timeData.valueEn : timeData.valueVi
            let dateDisplay = language == languages.EN ?
                moment.unix(+dateData / 1000).format('ddd - DD/MM/YYYY') :
                moment.unix(+dateData / 1000).locale('vi').format('dddd - DD/MM/YYYY')
            return `${timeDisplay} - ${dateDisplay}`
        }
    }

    const buildNameDisplay = (first, last) => {
        return language == languages.EN ?
            `${first} ${last}` :
            `${last} ${first}`
    }

    const handleClickSubmitBtn = async () => {
        //validate
        // console.log(clientInfo)
        // return
        //send request to server
        try {
            let timeString = buildTimeDateDisplay({
                valueEn: time.valueEn,
                valueVi: time.valueVi
            }, date)
            let doctorName = buildNameDisplay(firstName, lastName)
            let body = {
                ...clientInfo,
                doctorId,
                timeString,
                language,
                doctorName,
                birthday: new Date(birthday).getTime()
            }
            // console.log('body: ', body)

            let result = await patientService.sendRequestBookingAppointment(body)
            console.log(result)
            if (result && result.errCode === 0) {
                toast.success(result.errMessage)
                resetInput()
            }
            if (result && result.errCode !== 0) {
                toast.error(result.errMessage)
            }
            if (!result) {
                toast.error('Something wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const resetInput = () => {
        setClientInfo({})
    }

    const validateBeforSubmit = () => {

    }

    const handleChangeInput = (value, key) => {
        let current = clientInfo
        setClientInfo({
            ...current,
            [key]: value
        })
    }

    const handleChangeDatePicker = (pickerDate) => {
        setBirthday(pickerDate[0])
    }
    return (
        <div className='booking-modal'>
            <div className="booking-body">
                <div className="modal-booking-title">Thông tin đặt lịch khám bệnh</div>
                <div className="modal-booking-content">
                    <ProfileDoctor id={doctorId} date={date} time={time} isShowDescription={false} />
                    <div className="row">
                        <div className="col-6">
                            <label >Họ và tên</label>
                            <input value={clientInfo.fullName} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'fullName') }} />

                        </div>
                        <div className="col-6">
                            <label >Số điện thoại</label>
                            <input value={clientInfo.phoneNumber} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'phoneNumber') }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label >Địa chỉ email</label>
                            <input value={clientInfo.email} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'email') }} />
                        </div>
                        <div className="col-6">
                            <label >Địa chỉ liên hệ</label>
                            <input value={clientInfo.address} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'address') }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label >Lí do khám</label>
                            <input value={clientInfo.reason} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'reason') }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label >Ngày sinh</label>
                            <DatePicker
                                className='col-6 form-control'
                                onChange={handleChangeDatePicker}
                                value={birthday}
                            />
                        </div>
                        <div className="col-6">
                            <label >Giới tính</label>
                            <select className="form-control" value={clientInfo.gender}
                                onChange={(e) => { handleChangeInput(e.target.value, 'gender') }}
                            >
                                <option value='...'>...</option>
                                {genderArr && genderArr.length > 0 && genderArr.map(gender => {
                                    return <option key={gender.id} value={gender.keyMap}>
                                        {language == languages.EN ? gender.valueEn : gender.valueVi}
                                    </option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="modal-booking-footer">
                    <div className="actions-btn">
                        <button className="accept-btn btn" onClick={handleClickSubmitBtn}>Xác nhận</button>
                        <button className="cancel-btn btn" onClick={closeModal}>Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
