import React from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../../../utils'
import './UserInfo.scss'

export const UserInfo = () => {

    const user = useSelector(state => state.user.userInfo)
    const language = useSelector(state => state.app.language)

    return (
        <>
            {user &&
                <div className='user-info-container'>
                    {language == languages.EN ? `${user.firstName} ${user.lastName}` : `${user.lastName} ${user.firstName}`}
                </div>
            }
        </>
    )
}
