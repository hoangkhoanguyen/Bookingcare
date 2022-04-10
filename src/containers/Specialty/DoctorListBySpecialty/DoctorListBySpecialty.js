import React, { useEffect, useState } from 'react'
import specialtyService from '../../../services/specialtyService'
import '../DoctorListBySpecialty/DoctorListBySpecialty.scss'
import userService from '../../../services/userService'
import { languages } from '../../../utils'
import { useSelector } from 'react-redux'
import { DoctorListByDoctorList } from '../../DoctorListByDoctorList/DoctorListByDoctorList'
// import { DoctorItem } from '../DoctorItem/DoctorItem'

export const DoctorListBySpecialty = (props) => {

    const { id } = props
    const [provinceList, setProvinceList] = useState([])
    const [doctorList, setDoctorList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('all')
    const language = useSelector(state => state.app.language)

    useEffect(async () => {
        try {
            if (id) {
                let res = await specialtyService.getDoctorListBySpecialtyId(id)
                if (res && res.data) {
                    setDoctorList(res.data)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(async () => {
        try {
            let res = await userService.getAllCodesService('PROVINCE')
            if (res && res.data) {
                setProvinceList(res.data)
            }

        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleChangeSelectProvince = async (e) => {
        setSelectedProvince(e.target.value)
        try {
            let provinceId = e.target.value == 'all' ? null : e.target.value
            let res = await specialtyService.getDoctorListBySpecialtyId(id, provinceId)
            if (res && res.errCode === 0) {
                setDoctorList(res.data)
            } else {
                setDoctorList(null)
            }
        } catch (error) {
            console.log(error)
            setDoctorList(null)
        }
    }

    return (
        <>
            <div className="province-selection">
                <select onChange={handleChangeSelectProvince} value={selectedProvince} className="province-selection">
                    <option value="all">{language == languages.EN ? 'All' : 'Toàn quốc'}</option>
                    {provinceList && provinceList.length > 0 && provinceList.map(item => {
                        return <option key={item.keyMap} value={item.keyMap}>
                            {language == languages.EN ? item.valueEn : item.valueVi}
                        </option>
                    })}
                </select>
            </div>
            <div className="doctor-by-specialty-container">
                {doctorList && doctorList.length > 0 && <DoctorListByDoctorList doctorList={doctorList} />}
                {doctorList && doctorList.length == 0 &&
                    <div >
                        Hiện hệ thống chưa có bác sĩ tại khu vực này
                    </div>
                }
            </div>
        </>
    )
}
