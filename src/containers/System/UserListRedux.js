import React from 'react'
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import userService from '../../services/userService';
import { fetchGetAllUsersStart, setEditMode, updateChosenUser } from '../../store/actions/userActions';
import { languages } from '../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
}

export const UserListRedux = () => {
    const dispatch = useDispatch()
    const isEditting = useSelector(state => state.user.isEditting)
    const userList = useSelector(state => state.user.userList)
    const language = useSelector(state => state.app.language)
    const genderArr = useSelector(state => state.user.genderArr)
    const genderKey = useSelector(state => state.user.genderArr).map(gender => gender.keyMap)
    const posArr = useSelector(state => state.user.posArr)
    const posKey = useSelector(state => state.user.posArr).map(pos => pos.keyMap)
    const roleArr = useSelector(state => state.user.roleArr)
    const roleKey = useSelector(state => state.user.roleArr).map(role => role.keyMap)

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

    const handleClickDelete = async (email) => {
        let result = await userService.sendRequestDeleteUser(email)
        if (result && result.errCode === 0) {
            toast.success('User is already deleted successfully!')
            dispatch(fetchGetAllUsersStart())
        }
        if (result && result.errCode !== 0) {
            toast.error(result.errMessage)
        }
        if (!result) {
            toast.error('Something wrong!')
        }
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
                                <i className="fas fa-window-close" onClick={() => { handleClickDelete(user.email) }}></i>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
        </div>
    )
}
