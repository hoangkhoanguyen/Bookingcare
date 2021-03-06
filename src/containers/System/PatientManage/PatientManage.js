import React, { useEffect, useState } from 'react'
import './PatientManage.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { useSelector } from 'react-redux';
import patientService from '../../../services/patientService';
import moment from 'moment'
import { languages } from '../../../utils'
import doctorService from '../../../services/doctorService';
import { toast } from 'react-toastify';
import { SendReportEmailModal } from './SendReportEmailModal/SendReportEmailModal';

export const PatientManage = () => {

    const userInfo = useSelector(state => state.user.userInfo)
    const language = useSelector(state => state.app.language)
    const [patientList, setPatientList] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [info, setInfo] = useState({})
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

    const reloadPatientList = async () => {
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
    }

    const sendConfirm = async (idBooking) => {
        try {
            let result = await doctorService.confirmStatusDone(idBooking)
            if (result && result.errCode === 0) {
                toast.success(result.errMessage)
                let id = userInfo.id
                let day = day2Send
                let res = await patientService.getPatientListByDoctorId(id, day)
                if (res && res.errCode === 0) {
                    setPatientList(res.data)
                }
            } else {
                toast.error(result.errMessage)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong!')
        }
    }

    const handleClickConfirmBtn = (item) => {
        console.log(item)
        setInfo(item)
        setIsShowModal(true)
    }

    const closeModal = () => {
        setIsShowModal(false)
    }

    return (
        <>
            <h2 className='text-center'>Qu???n l?? b???nh nh??n kh??m b???nh</h2>
            <div className="patient-manage-body container">
                <div className="row">
                    <div className="col-4">
                        <label >Ch???n ng??y kh??m</label>
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
                            <th>Th???i gian</th>
                            <th>H??? v?? t??n</th>
                            <th>?????a ch???</th>
                            <th>Gi???i t??nh</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {patientList && patientList.length > 0 && patientList.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        {item.timeData ?
                                            <td>{language == languages.EN ?
                                                item.timeData.valueEn :
                                                item.timeData.valueVi}
                                            </td> :
                                            <td></td>
                                        }
                                        {item.patientInfo ?
                                            <td>{item.patientInfo.firstName}</td> :
                                            <td></td>}
                                        {item.patientInfo ?
                                            <td>{item.patientInfo.address}</td> :
                                            <td></td>}
                                        {item.patientInfo && item.patientInfo.genderData ?
                                            <td>{language == languages.EN ?
                                                item.patientInfo.genderData.valueEn :
                                                item.patientInfo.genderData.valueVi}
                                            </td> :
                                            <td></td>}
                                        <td>
                                            <button className='btn confirm-btn'
                                                onClick={() => { handleClickConfirmBtn(item) }}
                                            >
                                                X??c nh???n</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {isShowModal && <SendReportEmailModal info={info}
                closeModal={closeModal} reloadPatientList={reloadPatientList} />}
        </>
    )
}
