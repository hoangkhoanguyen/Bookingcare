import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import doctorService from '../../../../services/doctorService';
import 'moment/locale/vi'
import { languages } from '../../../../utils/constant';
import '../DoctorSchedule/DoctorSchedule.scss'

export const DoctorSchedule = (props) => {


    const { doctorId } = props
    const [arrayDays, setArrayDays] = useState([])
    const language = useSelector(state => state.app.language)
    const [day, setDay] = useState(arrayDays[0])
    const [schedule, setSchedule] = useState()

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
        setArrayDays(arr)
    }, [language])

    const capitalizeFirstLetter = (string) => {
        return string.at(0).toUpperCase() + string.slice(1)
    }

    const handleChangeSelectDay = async (e) => {
        setDay(e.target.value)
        let res = await doctorService.getDoctorScheduleByDate(doctorId, e.target.value)
        if (res && res.errCode === 0) {
            setSchedule(res.data.map(item => { return { ...item, isSelected: false } }))
        }
    }

    const handleClickAvailableButton = (id) => {
        let currentArr = schedule
        currentArr = currentArr.map((item, index) => {
            return index == id ? {
                ...item,
                isSelected: !item.isSelected
            } : item
        })
        setSchedule(currentArr)
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
            <div className="all-available-time">
                {schedule && schedule.length > 0 ? schedule.map((item, index) => {
                    return <button
                        onClick={() => { handleClickAvailableButton(index) }}
                        className={item.isSelected ? 'btn active' : 'btn'} key={item.id}>
                        {language == languages.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueVi}
                    </button>
                }) : <div>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác</div>}
            </div>
        </div>
    )
}
