import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import doctorService from '../../../../services/doctorService';
import 'moment/locale/vi'
import { languages } from '../../../../utils/constant';
import '../DoctorSchedule/DoctorSchedule.scss'
import { BookingModal } from '../BookingModal/BookingModal';
import { FormattedMessage } from 'react-intl';

export const DoctorSchedule = (props) => {


    const { doctorId } = props
    const [arrayDays, setArrayDays] = useState([])
    const language = useSelector(state => state.app.language)
    const [day, setDay] = useState(arrayDays[0])
    const [schedule, setSchedule] = useState()
    const [chosenDate, setChosenDate] = useState('')
    const [chosenTime, setChosenTime] = useState('')
    const [isShowModal, setIsShowModal] = useState(false)

    useEffect(() => {
        let arr = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language == languages.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').locale('vi').format('dddd - DD/MM')
                    object.label = capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    let labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                    object.label = labelEn
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arr.push(object)
        }
        setDay(arr[0].value)
        setArrayDays(arr)
    }, [language])

    useEffect(async () => {
        if (!day) return
        try {
            let res = await doctorService.getDoctorScheduleByDate(doctorId, day)
            if (res && res.errCode === 0) {
                setSchedule(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [day])

    const capitalizeFirstLetter = (string) => {
        return string.at(0).toUpperCase() + string.slice(1)
    }

    const handleChangeSelectDay = async (e) => {
        setDay(e.target.value)
    }

    const handleClickAvailableButton = (time) => {
        setChosenDate(day)
        setChosenTime(time)
        setIsShowModal(true)
    }

    const closeModal = () => {
        setIsShowModal(false)
    }

    return (
        <div className='doctor-schedule-section'>
            <div className="date-select">
                <select name="" id="" onChange={handleChangeSelectDay} value={day}>
                    {arrayDays && arrayDays.length > 0 && arrayDays.map((item, index) => {
                        return <option key={index} value={item.value}>{item.label}</option>
                    })}
                </select>
            </div>
            <div className="schedule-title">
                <i class="fa fa-calendar" ></i>
                <span><FormattedMessage id='common.schedule' /></span>
            </div>
            <div className="all-available-time">
                {schedule && schedule.length > 0 ? schedule.map((item, index) => {
                    return <button
                        onClick={() => { handleClickAvailableButton({ timeType: item.timeType, ...item.timeTypeData }) }}
                        className={'btn'} key={item.id}>
                        {language == languages.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueVi}
                    </button>
                }) : <div><FormattedMessage id='common.no-schedule-in-this-time' /></div>}
            </div>
            <div className="description">
                <span><FormattedMessage id='common.choose' /> </span>
                <i class="far fa-hand-point-up"></i>
                <span> <FormattedMessage id='common.and-booking-free' /> (0đ)</span>
            </div>
            {isShowModal && <BookingModal
                doctorId={doctorId}
                date={chosenDate}
                time={chosenTime}
                firstName={schedule && schedule[0] && schedule[0].doctorData && schedule[0].doctorData.firstName}
                lastName={schedule && schedule[0] && schedule[0].doctorData && schedule[0].doctorData.lastName}
                closeModal={closeModal}
            />}
        </div>
    )
}
