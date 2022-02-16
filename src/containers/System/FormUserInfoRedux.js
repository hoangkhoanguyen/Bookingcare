
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../../utils'
import { FormattedMessage } from 'react-intl';
import { fetchStart, updateChosenUser, fetchGetAllUsersStart, setEditMode } from '../../store/actions/userActions';
import '../System/UserRedux.scss'
import userService from '../../services/userService'
import Validate from '../../services/Validate';
import CommonUtils from '../../utils/CommonUtils'
import { toast } from 'react-toastify';


export const FormUserInfoRedux = () => {
    const dispatch = useDispatch()
    const genderArr = useSelector(state => state.user.genderArr)
    const posArr = useSelector(state => state.user.posArr)
    const roleArr = useSelector(state => state.user.roleArr)
    const isEditting = useSelector(state => state.user.isEditting)
    const userEdit = useSelector(state => state.user.userEdit)

    const [imgBase64, setImgBase64] = useState('')

    const [newUserInfo, setNewUserInfo] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        image: ''
    })
    const [errMessage, setErrorMessage] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        image: ''
    })

    const language = useSelector(state => state.app.language)

    useEffect(async () => {
        dispatch(fetchStart('GENDER'))
        dispatch(fetchStart('POSITION'))
        dispatch(fetchStart('ROLE'))
    }, [])

    const handleChangeInput = async (key, e) => {
        if (!isEditting) {
            if (key == 'image') {
                let file = e.target.files[0]
                if (file) {
                    setNewUserInfo({
                        ...newUserInfo,
                        [key]: URL.createObjectURL(file)
                    })
                    let dataBase64 = await CommonUtils.getBase64(file)
                    setImgBase64(dataBase64)
                }
                return
            }
            setNewUserInfo({
                ...newUserInfo,
                [key]: e.target.value
            })
        }
        if (isEditting) {
            if (key == 'image') {
                let file = e.target.files[0]
                if (file) {
                    dispatch(updateChosenUser({
                        ...userEdit,
                        [key]: URL.createObjectURL(file)
                    }))
                    let dataBase64 = await CommonUtils.getBase64(file)
                    setImgBase64(dataBase64)
                }
                return
            }
            dispatch(updateChosenUser({
                ...userEdit,
                [key]: e.target.value
            }))
        }
    }

    const handleClickSubmit = async () => {
        if (!isEditting) {
            let { isValid, errMsg } = validateInputValue(newUserInfo)
            if (!isValid) {
                setErrorMessage(errMsg)
                return
            }
            let res = await userService.sendRequestCreateNewUser({
                ...newUserInfo,
                image: imgBase64
            })
            if (res && res.errCode === 0) {
                toast.success('Create a new user successfully!')
                dispatch(fetchGetAllUsersStart())
                resetFormInputValue()
            } else {
                toast.error(res.errMessage)
            }
        }
        if (isEditting) {
            let { isValid, errMsg } = validateInputValue({
                firstName: userEdit.firstName,
                lastName: userEdit.lastName,
                phoneNumber: userEdit.phoneNumber,
                address: userEdit.address,
                gender: userEdit.gender,
                position: userEdit.position,
                role: userEdit.role,
                image: userEdit.image
            })
            if (!isValid) {
                setErrorMessage(errMsg)
                return
            }
            let res = await userService.sendRequestUpdateUser({
                ...userEdit,
                image: imgBase64
            })
            if (res && res.errCode === 0) {
                toast.success('Update user successfully!')
                dispatch(fetchGetAllUsersStart())
                dispatch(setEditMode(false))
                resetFormInputValue()
            } else {
                toast.error(res.errMessage)
            }
        }
    }

    const handleClickCancel = () => {
        resetFormInputValue()
        dispatch(setEditMode(false))
    }

    const validateInputValue = (info) => {
        let errMsg = {}
        let isValid = {}
        for (const key in info) {
            if (!Validate.ValidateMustNotEmpty(info[key])) {
                errMsg[key] = `Is required!`
                isValid[key] = false
            } else {
                errMsg[key] = ''
                isValid[key] = true
            }
            if (key == 'gender' || key == 'position' || key == 'role') {
                if (info[key] == '...') {
                    errMsg[key] = `Is required!`
                    isValid[key] = false
                }
            }
        }
        for (const key in isValid) {
            if (isValid[key]) {
                switch (key) {
                    case 'email':
                        if (!Validate.ValidateEmail(info[key])) {
                            errMsg[key] = 'Must be an email'
                            isValid[key] = false
                        }
                        break;
                    case 'firstName':
                    case 'lastName':
                        if (!Validate.ValidateNormalLetter(info[key])) {
                            errMsg[key] = `Only normal letters and numbers`
                            isValid[key] = false
                        }
                        break
                    case 'phoneNumber':
                        if (!Validate.ValidateOnlyNumbers(info[key])) {
                            errMsg[key] = 'Only numbers'
                            isValid[key] = false
                        }
                        break
                    default:
                        break;
                }
            }
        }
        let finalValid = true
        for (const key in isValid) {
            finalValid = finalValid && isValid[key]
        }
        return {
            isValid: finalValid,
            errMsg: errMsg
        }
    }

    const handleStartType = (key) => {
        setErrorMessage({
            ...errMessage,
            [key]: ''
        })
    }

    const resetFormInputValue = () => {
        setNewUserInfo({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
        })
        setErrorMessage({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
        })
        dispatch(updateChosenUser({}))
    }
    return (
        <div className="container">
            <div className=" row mb-2">
                <div className="form-group col-3 position-relative">
                    <label >Email</label>
                    <FormattedMessage id='form-register.enter-email'>
                        {
                            placeholder => <input disabled={isEditting} value={isEditting ? userEdit.email : newUserInfo.email} type="email" className="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('email', e) }}
                                onInput={() => { handleStartType('email') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.email != '' && <div className="warning-message position-absolute top-0 ">{errMessage.email}</div>}
                </div>
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.password' /></label>
                    <FormattedMessage id='form-register.enter-password'>
                        {
                            placeholder => <input disabled={isEditting} value={newUserInfo.password} type="password" className="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('password', e) }}
                                onInput={() => { handleStartType('password') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.password != '' && <div className="warning-message position-absolute top-0 ">{errMessage.password}</div>}
                </div>
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.first-name' /></label>
                    <FormattedMessage id='form-register.enter-first-name'>
                        {
                            placeholder => <input value={isEditting ? userEdit.firstName : newUserInfo.firstName} type="text" className="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('firstName', e) }}
                                onInput={() => { handleStartType('firstName') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.firstName != '' && <div className="warning-message position-absolute top-0 ">{errMessage.firstName}</div>}
                </div>
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.last-name' /></label>
                    <FormattedMessage id='form-register.enter-last-name'>
                        {
                            placeholder => <input value={isEditting ? userEdit.lastName : newUserInfo.lastName} type="text" className="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('lastName', e) }}
                                onInput={() => { handleStartType('lastName') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.lastName != '' && <div className="warning-message position-absolute top-0 ">{errMessage.lastName}</div>}
                </div>
            </div>
            <div className="row mb-2">
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.phone-number' /></label>
                    <FormattedMessage id='form-register.enter-phone-number'>
                        {
                            placeholder => <input value={isEditting ? userEdit.phoneNumber : newUserInfo.phoneNumber} type="text" className="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('phoneNumber', e) }}
                                onInput={() => { handleStartType('phoneNumber') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.phoneNumber != '' && <div className="warning-message position-absolute top-0 ">{errMessage.phoneNumber}</div>}
                </div>
                <div className="form-group col-9 position-relative">
                    <label ><FormattedMessage id='form-register.address' /></label>
                    <FormattedMessage id='form-register.enter-address'>
                        {
                            placeholder => <input value={isEditting ? userEdit.address : newUserInfo.address} type="text" className="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('address', e) }}
                                onInput={() => { handleStartType('address') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.address != '' && <div className="warning-message position-absolute top-0 ">{errMessage.address}</div>}
                </div>
            </div>
            <div className="row mb-3">
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.gender' /></label>
                    <select className="form-control" value={isEditting ? userEdit.gender : newUserInfo.gender}
                        onChange={(e) => { handleChangeInput('gender', e) }}
                        onClick={() => { handleStartType('gender') }}
                    >
                        <option value='...'>...</option>
                        {genderArr && genderArr.length > 0 && genderArr.map(gender => {
                            return <option key={gender.id} value={gender.keyMap}>
                                {language == languages.EN ? gender.valueEn : gender.valueVi}
                            </option>
                        })}
                    </select>
                    {errMessage.gender != '' && <div className="warning-message position-absolute top-0 ">{errMessage.gender}</div>}
                </div>
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.position' /></label>
                    <select className="form-control" value={isEditting ? userEdit.position : newUserInfo.position}
                        onChange={(e) => { handleChangeInput('position', e) }}
                        onClick={() => { handleStartType('position') }}
                    >
                        <option value='...'>...</option>
                        {posArr && posArr.length > 0 && posArr.map(pos => {
                            return <option key={pos.id} value={pos.keyMap}>
                                {language == languages.EN ? pos.valueEn : pos.valueVi}
                            </option>
                        })}
                    </select>

                    {errMessage.position != '' && <div className="warning-message position-absolute top-0 ">{errMessage.position}</div>}
                </div>
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.role' /></label>
                    <select className="form-control" value={isEditting ? userEdit.role : newUserInfo.role}
                        onChange={(e) => { handleChangeInput('role', e) }}
                        onClick={() => { handleStartType('role') }}
                    >
                        <option value='...'>...</option>
                        {roleArr && roleArr.length > 0 && roleArr.map(role => {
                            return <option key={role.id} value={role.keyMap}>
                                {language == languages.EN ? role.valueEn : role.valueVi}
                            </option>
                        })}
                    </select>
                    {errMessage.role != '' && <div className="warning-message position-absolute top-0 ">{errMessage.role}</div>}
                </div>
                <div className="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.avatar' /></label>
                    <label htmlFor="input-img" className='preview'>
                        {!isEditting && newUserInfo && newUserInfo.image && <img src={newUserInfo.image} alt="" />}
                        {isEditting && userEdit && userEdit.image && <img src={userEdit.image} alt="" />}
                        <i className="fas fa-cloud-upload-alt icon-upload"></i>
                    </label>
                    <input type="file" hidden id='input-img' onChange={(e) => { handleChangeInput('image', e) }} />
                    {errMessage.image != '' && <div className="warning-message position-absolute top-0 ">{errMessage.image}</div>}
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-3 text-center">
                    <FormattedMessage id={isEditting ? 'form-register.save' : 'form-register.create'}>
                        {
                            value => <input onClick={handleClickSubmit} className='form-control bg-success text-light' type="button" value={value} />
                        }
                    </FormattedMessage>
                </div>
                {isEditting && <div className="col-3 text-center">

                    <FormattedMessage id='form-register.cancel'>
                        {
                            value => <input onClick={handleClickCancel} className='form-control' type="button" value={value} />
                        }
                    </FormattedMessage>
                </div>}
            </div>
        </div>
    )
}
