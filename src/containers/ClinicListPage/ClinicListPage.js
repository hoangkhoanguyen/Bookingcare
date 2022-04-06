import React, { useEffect, useState } from 'react'
import clinicService from '../../services/clinicService'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { ClinicListItem } from './ClinicListItem/ClinicListItem'
import './ClinicListPage.scss'

export const ClinicListPage = () => {

    const [isLoading, setLoading] = useState(false)
    const [clinicList, setClinicList] = useState()
    const [allClinic, setAllClinic] = useState()
    const [keyWord, setKeyWord] = useState('')

    useEffect(async () => {
        // setLoading(true)
        try {
            let result = await clinicService.getClinic()
            if (result && result.errCode === 0) {
                setAllClinic(result.data)
                // setLoading(false)
            } else {
                setAllClinic()
            }
        } catch (error) {
            console.log(error)
            setAllClinic()
        }
    }, [])

    useEffect(() => {
        if (!allClinic || allClinic.length == 0) {
            setClinicList()
            return
        }
        console.log(process.env.MAX_clinicS)
        let currentList = allClinic.filter((item, index) => index < 4)
        setClinicList(currentList)
    }, [allClinic])

    const handleChangeValue = (e) => {
        let value = e.target.value
        setKeyWord(value)
        let newList = allClinic.filter(item => item.name.toUpperCase().indexOf(value.toUpperCase()) != -1)
        setClinicList(newList)
    }

    const handleLoadMore = () => {
        let oldList = clinicList
        let moreList = allClinic.filter(item => oldList.indexOf(item) == -1).filter((item, index) => index < 4)
        let newList = oldList.concat(moreList)
        setClinicList(newList)
    }

    return (<>
        <HomeHeader />
        <div className='clinic-list-background'>
            <div className="clinic-list-body">
                <h2 >Phòng khám</h2>
                <div className="search-area">
                    <i className="fas fa-search"></i>
                    <input onChange={(e) => { handleChangeValue(e) }} value={keyWord} type="text" placeholder='Nhập tên phòng khám...' />
                </div>
                <div className="list">
                    <ul>
                        {clinicList && clinicList.map(item => {
                            return <li className='item' key={item.id}>
                                <ClinicListItem clinic={item} />
                            </li>
                        })}
                    </ul>
                </div>
                <div className="load-more">
                    <span onClick={handleLoadMore}>Xem thêm</span>
                </div>
            </div>
        </div>
    </>
    )
}
