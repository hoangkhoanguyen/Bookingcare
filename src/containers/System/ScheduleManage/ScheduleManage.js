import React, { useState } from 'react'
import Select from 'react-select';
import '../ScheduleManage/ScheduleManage.scss'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchAllScheduleTimeStart, fetchGetAllDoctorStart } from '../../../store/actions/doctorSystemAction';
import { languages, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'
import FormattedDate from '../../../components/Formating/FormattedDate';
import { result } from 'lodash';
import { toast } from 'react-toastify';
import doctorService from '../../../services/doctorService';

export const ScheduleManage = () => {

    const dispatch = useDispatch()
    const doctorList = useSelector(state => state.system.allDoctor)
    const language = useSelector(state => state.app.language)
    const allScheduleTime = useSelector(state => state.system.allScheduleTime)
    const [selectedOption, setSelectedOption] = useState({})
    const [currentDate, setCurrentDate] = useState('')
    const [timeRange, setTimeRange] = useState([])

    useEffect(() => {
        dispatch(fetchGetAllDoctorStart())
        dispatch(fetchAllScheduleTimeStart())
    }, [])

    useEffect(() => {
        setTimeRange(allScheduleTime && allScheduleTime.map(time => { return { ...time, isSelected: false } }))
    }, [allScheduleTime])

    const handleChangeSelectedDoctor = (option) => {
        setSelectedOption(option)
    };

    const handleChangeDatePicker = (date) => {
        setCurrentDate(date[0])
    }

    const handleClickTimeButton = (index) => {

        const newCurrentRange = timeRange.map((item, idx) => {
            if (idx == index) {
                const updatedItem = {
                    ...item, isSelected: !item.isSelected
                }
                return updatedItem
            }
            return item
        })
        setTimeRange(newCurrentRange)
    }

    const handleClickSaveButton = async () => {
        let result = validateBeforeSubmit()
        if (!result.isValid) {
            toast.error(result.mess)
            return
        }
        // let date = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let date = new Date(currentDate).getTime()
        let finalData = timeRange.filter(item => item.isSelected == true).map(item => {
            return {
                doctorId: selectedOption.value,
                date: date,
                timeType: item.keyMap
            }
        })
        let res = await doctorService.saveDoctorSchedule(finalData)
        if (res && res.errCode === 0) {
            toast.success('Save successfully!')
            resetInput()
            return
        }
        if (res && res.errCode !== 0) {
            toast.error(res.errMessage)
            return
        }
        toast.error('Something wrong!')
    }

    const resetInput = () => {
        setSelectedOption({})
        setCurrentDate('')
        let newTimeRange = timeRange.map(item => { return { ...item, isSelected: false } })
        setTimeRange(newTimeRange)
    }

    const validateBeforeSubmit = () => {
        if (!selectedOption.value) {
            return {
                isValid: false,
                mess: 'Please select doctor!'
            }
        }
        if (currentDate == '') {
            return {
                isValid: false,
                mess: 'Please select date!'
            }
        }
        if (!timeRange.reduce((result, item) => result || item.isSelected, false)) {
            return {
                isValid: false,
                mess: 'Please select schedule!'
            }
        }
        return {
            isValid: true,
            mess: ''
        }
    }

    return (
        <div className='schedule-manage'>
            <h2 className='text-center'>Quản lý kế hoạch khám bệnh của bác sĩ</h2>
            <div className="schedule-manage-body container">
                <div className="row">
                    <div className="form-group col-6">
                        <label >Chọn bác sĩ</label>
                        <Select
                            className='col-12'
                            value={selectedOption}
                            onChange={handleChangeSelectedDoctor}
                            options={doctorList && doctorList.length > 0 && doctorList.map(doctor => {
                                return {
                                    value: `${doctor.id}`,
                                    label: language == languages.VI ? `${doctor.lastName} ${doctor.firstName}` : `${doctor.firstName} ${doctor.lastName}`
                                }
                            })}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label >Chọn ngày</label>
                        <DatePicker
                            className='col-12 form-control'
                            onChange={handleChangeDatePicker}
                            value={currentDate}
                            minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                        />
                    </div>
                    <div className="col-12 pick-hour-container">
                        {timeRange && timeRange.length > 0 && timeRange.map((item, index) => {
                            return <button key={item.id} className={item.isSelected ? 'btn active' : 'btn'}
                                onClick={() => {
                                    handleClickTimeButton(index)
                                }}>
                                {language == languages.EN ? item.valueEn : item.valueVi}
                            </button>
                        })}
                    </div>
                    <div className="col-12 action-btns">
                        <button className='btn btn-primary' onClick={handleClickSaveButton}>Lưu thông tin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
