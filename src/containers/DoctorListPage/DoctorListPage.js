import React, { useEffect, useState } from 'react'
import doctorService from '../../services/doctorService'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { DoctorListItem } from './DoctorListItem/DoctorListItem'
import './DoctorListPage.scss'

export const DoctorListPage = () => {

    const [isLoading, setLoading] = useState(false)
    const [doctorList, setDoctorList] = useState()
    const [allDoctor, setAllDoctor] = useState()
    const [keyWord, setKeyWord] = useState('')

    useEffect(async () => {
        setLoading(true)
        try {
            let result = await doctorService.getAllDoctor()
            if (result && result.errCode === 0) {
                setAllDoctor(result.data)
                setLoading(false)
            } else {
                setAllDoctor()
            }
        } catch (error) {
            console.log(error)
            setAllDoctor()
        }
    }, [])

    useEffect(() => {
        console.log('all', allDoctor)
        if (!allDoctor || allDoctor.length == 0) {
            setDoctorList()
            return
        }
        console.log('max:', process.env.MAX_DOCTORS)
        let currentList = allDoctor.filter((item, index) => index < 4)
        setDoctorList(currentList)
    }, [allDoctor])

    const handleChangeValue = (e) => {
        let value = e.target.value
        setKeyWord(value)
        let newList = allDoctor.filter(item => item.firstName.toUpperCase().indexOf(value.toUpperCase()) != -1 || item.lastName.toUpperCase().indexOf(value.toUpperCase()) != -1)
        setDoctorList(newList)
    }

    return (<>
        <HomeHeader />
        <div className='doctor-list-background'>
            <div className="doctor-list-body">
                <h2 >Bác sĩ</h2>
                <div className="search-area">
                    <i class="fas fa-search"></i>
                    <input onChange={(e) => { handleChangeValue(e) }} value={keyWord} type="text" placeholder='Nhập tên bác sĩ...' />
                </div>
                <div className="list">
                    {console.log(doctorList)}
                    {isLoading && 'Loading...'}
                    {!isLoading && <ul>
                        {doctorList && doctorList.map(item => {
                            return <li className='item' key={item.id}>
                                <DoctorListItem doctor={item} />
                            </li>
                        })}
                    </ul>}
                </div>
                <div className="load-more">
                    <span>Xem thêm</span>
                </div>
            </div>
        </div>
    </>
    )
}
