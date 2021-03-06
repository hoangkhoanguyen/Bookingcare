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

    const buildNameDisplay = (first, last) => {
        return language == languages.EN ?
            `${first} ${last}` :
            `${last} ${first}`
    }

    const buildDMY = (dateData) => {
        let a = new Date(+dateData);
        let year = a.getFullYear();
        let month = a.getMonth() + 1
        month = month < 10 ? '0' + month : month;
        let day = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
        let result = day + '/' + month + '/' + year;
        return result
    }

    const handleClickSubmitBtn = async () => {
        //validate

        //send request to server
        try {
            let doctorName = buildNameDisplay(firstName, lastName)
            let body = {
                ...clientInfo,
                doctorId,
                timeString: time.timeType,
                language,
                doctorName,
                date: buildDMY(date),
                birthday: new Date(birthday).getTime()
            }

            let result = await patientService.sendRequestBookingAppointment(body)
            console.log(result)
            if (result && result.errCode === 0) {
                console.log('ok')
                toast.success(result.errMessage)
                resetInput()
                closeModal()

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
        setClientInfo({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
        })
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
        <div className='booking-modal' onClick={closeModal}>
            <div className="booking-body" onClick={(e) => { e.stopPropagation() }}>
                <div className="modal-booking-title">Th??ng tin ?????t l???ch kh??m b???nh</div>
                <div className="modal-booking-content">
                    <ProfileDoctor id={doctorId} date={date} time={time} isShowDescription={false} />
                    <div className="row">
                        <div className="col-6">
                            <label >H??? v?? t??n</label>
                            <input value={clientInfo.fullName} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'fullName') }} />
                        </div>
                        <div className="col-6">
                            <label >S??? ??i???n tho???i</label>
                            <input value={clientInfo.phoneNumber} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'phoneNumber') }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label >?????a ch??? email</label>
                            <input value={clientInfo.email} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'email') }} />
                        </div>
                        <div className="col-6">
                            <label >?????a ch??? li??n h???</label>
                            <input value={clientInfo.address} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'address') }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label >L?? do kh??m</label>
                            <input value={clientInfo.reason} type="text" className="form-control"
                                onChange={(e) => { handleChangeInput(e.target.value, 'reason') }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label >Ng??y sinh</label>
                            <DatePicker
                                className='col-6 form-control'
                                onChange={handleChangeDatePicker}
                                value={birthday}
                            />
                        </div>
                        <div className="col-6">
                            <label >Gi???i t??nh</label>
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
                        <button className="accept-btn btn" onClick={handleClickSubmitBtn}>X??c nh???n</button>
                        <button className="cancel-btn btn" onClick={closeModal}>H???y</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
