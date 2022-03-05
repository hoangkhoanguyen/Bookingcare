import React, { useEffect, useState } from 'react'
import specialtyService from '../../../services/specialtyService'
import '../DoctorListBySpecialty/DoctorListBySpecialty.scss'
import userService from '../../../services/userService'
import { languages } from '../../../utils'
import { useSelector } from 'react-redux'
import { DoctorItem } from '../DoctorItem/DoctorItem'

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
                if (res && res.data && res.data.data) {
                    setDoctorList(res.data.data)
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
            if (res && res.data && res.data.errCode === 0) {
                setDoctorList(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='doctor-list-container'>
            <select onChange={handleChangeSelectProvince} value={selectedProvince} className="province-selection">
                <option value="all">All</option>
                {provinceList && provinceList.length > 0 && provinceList.map(item => {
                    return <option key={item.keyMap} value={item.keyMap}>
                        {language == languages.EN ? item.valueEn : item.valueVi}
                    </option>
                })}
            </select>
            <div className="doctor-info-container">
                {doctorList && doctorList.length > 0 && doctorList.map((item, index) => {
                    return <div key={index} className="doctor-info-item">
                        <DoctorItem id={item} />
                    </div>
                })}

            </div>
        </div>
    )
}
