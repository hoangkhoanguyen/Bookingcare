import React, { useEffect, useState } from 'react'
import './PatientManage.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { useSelector } from 'react-redux';
import patientService from '../../../services/patientService';
import moment from 'moment'
import { languages } from '../../../utils'

export const PatientManage = () => {

    const userInfo = useSelector(state => state.user.userInfo)
    const language = useSelector(state => state.app.language)
    const [patientList, setPatientList] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [day2Send, setDay2Send] = useState(moment(new Date()).format("DD/MM/YYYY"))

    useEffect(async () => {
        if (!userInfo) return
        try {
            let id = userInfo.id
            let day = day2Send
            let res = await patientService.getPatientListByDoctorId(id, day)
            if (res && res.errCode === 0) {
                setPatientList(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [userInfo, day2Send])

    const handleChangeDatePicker = (date) => {
        setCurrentDate(date[0])
        let day = moment.unix(+date[0] / 1000).format('DD/MM/YYYY')
        setDay2Send(day)
    }

    const handleClickConfirmBtn = () => {

    }

    const handleClickSendBillBtn = () => {

    }

    return (
        <>
            <h2 className='text-center'>Quản lý bệnh nhân khám bệnh</h2>
            <div className="patient-manage-body container">
                <div className="row">
                    <div className="col-4">
                        <label >Chọn ngày khám</label>
                        <DatePicker
                            className='form-control'
                            onChange={handleChangeDatePicker}
                            value={currentDate}
                        />
                    </div>
                </div>
                <div className="row">
                    <table className='col-12'>
                        <thead>
                            <th>STT</th>
                            <th>Thời gian</th>
                            <th>Họ và tên</th>
                            <th>Địa chỉ</th>
                            <th>Giới tính</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {patientList && patientList.length > 0 && patientList.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.timeType}</td>
                                        {item.patientInfo &&
                                            <td>{item.patientInfo.firstName}</td>}
                                        {item.patientInfo &&
                                            <td>{item.patientInfo.address}</td>}
                                        {item.patientInfo && item.patientInfo.genderData &&
                                            <td>{language == languages.EN ?
                                                item.patientInfo.genderData.valueEn :
                                                item.patientInfo.genderData.valueVi}
                                            </td>}
                                        <td>
                                            <button className='btn confirm-btn'
                                                onClick={() => { handleClickConfirmBtn() }}
                                            >
                                                Xác nhận</button>
                                            <button className='btn send-bill-btn'
                                                onClick={() => { handleClickSendBillBtn() }}
                                            >Gửi hóa đơn</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
