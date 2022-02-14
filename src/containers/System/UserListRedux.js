import React from 'react'
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllUsersStart, setEditMode, updateChosenUser } from '../../store/actions/userActions';
import { languages } from '../../utils';

export const UserListRedux = () => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.user.userList)
    const language = useSelector(state => state.app.language)
    const genderArr = useSelector(state => state.user.genderArr)
    const genderKey = useSelector(state => state.user.genderArr).map(gender => gender.key)
    const posArr = useSelector(state => state.user.posArr)
    const posKey = useSelector(state => state.user.posArr).map(pos => pos.key)
    const roleArr = useSelector(state => state.user.roleArr)
    const roleKey = useSelector(state => state.user.roleArr).map(role => role.key)

    useEffect(async () => {
        dispatch(fetchGetAllUsersStart())
    }, [])

    const handleClickEdit = async (user) => {
        dispatch(setEditMode(true))
        let imageBase64 = ''
        if (user && user.image) {
            imageBase64 = await new Buffer(user.image, 'base64').toString('binary')
        }
        dispatch(updateChosenUser({
            ...user,
            image: imageBase64
        }))
    }

    return (

        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th><FormattedMessage id='form-register.first-name' /></th>
                        <th><FormattedMessage id='form-register.last-name' /></th>
                        <th><FormattedMessage id='form-register.gender' /></th>
                        <th><FormattedMessage id='form-register.phone-number' /></th>
                        <th><FormattedMessage id='form-register.address' /></th>
                        <th><FormattedMessage id='form-register.position' /></th>
                        <th><FormattedMessage id='form-register.role' /></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList.length > 0 && userList.map((user) => {
                        return <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{genderArr[genderKey.indexOf(user.gender)] && genderArr[genderKey.indexOf(user.gender)][language == languages.EN ? 'valueEn' : 'valueVi']}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{posArr[posKey.indexOf(user.position)] && posArr[posKey.indexOf(user.position)][language == languages.EN ? 'valueEn' : 'valueVi']}</td>
                            <td>{roleArr[roleKey.indexOf(user.role)] && roleArr[roleKey.indexOf(user.role)][language == languages.EN ? 'valueEn' : 'valueVi']}</td>
                            <td>
                                <i className="fas fa-edit" onClick={() => { handleClickEdit(user) }}></i>
                                <i className="fas fa-window-close"></i>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
