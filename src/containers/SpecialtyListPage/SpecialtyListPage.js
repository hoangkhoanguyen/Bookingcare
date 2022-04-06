import React, { useEffect, useState } from 'react'
import specialtyService from '../../services/specialtyService'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { SpecialtyListItem } from './SpecialtyListItem/SpecialtyListItem'
import './SpecialtyListPage.scss'

export const SpecialtyListPage = () => {

    const [specialtyList, setSpecialtyList] = useState()
    const [allSpecialty, setAllSpecialty] = useState()
    const [keyWord, setKeyWord] = useState('')

    useEffect(async () => {
        try {
            let result = await specialtyService.getSpecialty()
            if (result && result.errCode === 0) {
                setAllSpecialty(result.data)
            } else {
                setAllSpecialty()
            }
        } catch (error) {
            console.log(error)
            setAllSpecialty()
        }
    }, [])

    useEffect(() => {
        if (!allSpecialty || allSpecialty.length == 0) {
            setSpecialtyList()
            return
        }
        console.log(process.env.MAX_SPECIALTY)
        let currentList = allSpecialty.filter((item, index) => index < 4)
        setSpecialtyList(currentList)
    }, [allSpecialty])

    const handleChangeValue = (e) => {
        let value = e.target.value
        setKeyWord(value)
        let newList = allSpecialty.filter(item => item.name.toUpperCase().indexOf(value.toUpperCase()) != -1)
        setSpecialtyList(newList)
    }

    const handleLoadMore = () => {
        let oldList = specialtyList
        let moreList = allSpecialty.filter(item => oldList.indexOf(item) == -1).filter((item, index) => index < 4)
        let newList = oldList.concat(moreList)
        setSpecialtyList(newList)
    }

    return (<>
        <HomeHeader />
        <div className='specialty-list-background'>
            <div className="specialty-list-body">
                <h2 >Chuyên khoa</h2>
                <div className="search-area">
                    <i className="fas fa-search"></i>
                    <input onChange={(e) => { handleChangeValue(e) }} value={keyWord} type="text" placeholder='Nhập tên chuyên khoa...' />
                </div>
                <div className="list">
                    <ul>
                        {specialtyList && specialtyList.map(item => {
                            return <li className='item' key={item.id}>
                                <SpecialtyListItem specialty={item} />
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
