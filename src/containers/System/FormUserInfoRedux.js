
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../../utils'
import { FormattedMessage } from 'react-intl';
import { fetchStart, updateChosenUser } from '../../store/actions/userActions';
import '../System/UserRedux.scss'
import userService from '../../services/userService'
import Validate from '../../services/Validate';

export const FormUserInfoRedux = () => {
    const dispatch = useDispatch()
    const genderArr = useSelector(state => state.user.genderArr)
    const posArr = useSelector(state => state.user.posArr)
    const roleArr = useSelector(state => state.user.roleArr)
    const isEditting = useSelector(state => state.user.isEditting)
    const userEdit = useSelector(state => state.user.userEdit)

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
    })

    const language = useSelector(state => state.app.language)

    useEffect(async () => {
        dispatch(fetchStart('GENDER'))
        dispatch(fetchStart('POSITION'))
        dispatch(fetchStart('ROLE'))
    }, [])

    const handleChangeInput = (key, e) => {
        if (!isEditting) {
            setNewUserInfo({
                ...newUserInfo,
                [key]: e.target.value
            })
        }
        if (isEditting) {
            dispatch(updateChosenUser({
                ...userEdit,
                [key]: e.target.value
            }))
        }
    }

    const handleClickCreate = () => {
        if (!isEditting) {
            let { isValid, errMsg } = validateInputValue(newUserInfo)
            if (!isValid) {
                setErrorMessage(errMsg)
                return
            }
            userService.sendRequestCreateNewUser(newUserInfo)
        }
        if (isEditting) {
            console.log(userEdit)
            let { isValid, errMsg } = validateInputValue({
                email: userEdit.email,
                password: userEdit.password,
                firstName: userEdit.firstName,
                lastName: userEdit.lastName,
                phoneNumber: userEdit.phoneNumber,
                address: userEdit.address,
                gender: userEdit.gender,
                position: userEdit.position,
                role: userEdit.role,
            })
            console.log(isValid, errMsg)
            // if (!isValid) {
            //     setErrorMessage(errMsg)
            //     return
            // }
            // userService.sendRequestUpdateUser(userEdit)
        }
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
    return (
        <div className="container">
            <div className=" row mb-2">
                <div class="form-group col-3 position-relative">
                    <label >Email</label>
                    <FormattedMessage id='form-register.enter-email'>
                        {
                            placeholder => <input disabled={isEditting} value={isEditting ? userEdit.email : newUserInfo.email} type="email" class="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('email', e) }}
                                onInput={() => { handleStartType('email') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.email != '' && <div className="warning-message position-absolute top-0 ">{errMessage.email}</div>}
                </div>
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.password' /></label>
                    <FormattedMessage id='form-register.enter-password'>
                        {
                            placeholder => <input disabled={isEditting} value={newUserInfo.password} type="password" class="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('password', e) }}
                                onInput={() => { handleStartType('password') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.password != '' && <div className="warning-message position-absolute top-0 ">{errMessage.password}</div>}
                </div>
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.first-name' /></label>
                    <FormattedMessage id='form-register.enter-first-name'>
                        {
                            placeholder => <input value={isEditting ? userEdit.firstName : newUserInfo.firstName} type="text" class="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('firstName', e) }}
                                onInput={() => { handleStartType('firstName') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.firstName != '' && <div className="warning-message position-absolute top-0 ">{errMessage.firstName}</div>}
                </div>
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.last-name' /></label>
                    <FormattedMessage id='form-register.enter-last-name'>
                        {
                            placeholder => <input value={isEditting ? userEdit.lastName : newUserInfo.lastName} type="text" class="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('lastName', e) }}
                                onInput={() => { handleStartType('lastName') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.lastName != '' && <div className="warning-message position-absolute top-0 ">{errMessage.lastName}</div>}
                </div>
            </div>
            <div className="row mb-2">
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.phone-number' /></label>
                    <FormattedMessage id='form-register.enter-phone-number'>
                        {
                            placeholder => <input value={isEditting ? userEdit.phoneNumber : newUserInfo.phoneNumber} type="text" class="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('phoneNumber', e) }}
                                onInput={() => { handleStartType('phoneNumber') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.phoneNumber != '' && <div className="warning-message position-absolute top-0 ">{errMessage.phoneNumber}</div>}
                </div>
                <div class="form-group col-9 position-relative">
                    <label ><FormattedMessage id='form-register.address' /></label>
                    <FormattedMessage id='form-register.enter-address'>
                        {
                            placeholder => <input value={isEditting ? userEdit.address : newUserInfo.address} type="text" class="form-control" placeholder={placeholder}
                                onChange={(e) => { handleChangeInput('address', e) }}
                                onInput={() => { handleStartType('address') }}
                            />
                        }
                    </FormattedMessage>
                    {errMessage.address != '' && <div className="warning-message position-absolute top-0 ">{errMessage.address}</div>}
                </div>
            </div>
            <div className="row mb-3">
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.gender' /></label>
                    <select class="form-control" value={isEditting ? userEdit.gender : newUserInfo.gender}
                        onChange={(e) => { handleChangeInput('gender', e) }}
                        onClick={() => { handleStartType('gender') }}
                    >
                        <option selected>...</option>
                        {genderArr && genderArr.length > 0 && genderArr.map(gender => {
                            return <option key={gender.id} value={gender.key}>
                                {language == languages.EN ? gender.valueEn : gender.valueVi}
                            </option>
                        })}
                    </select>
                    {errMessage.gender != '' && <div className="warning-message position-absolute top-0 ">{errMessage.gender}</div>}
                </div>
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.position' /></label>
                    <select class="form-control" value={isEditting ? userEdit.position : newUserInfo.position}
                        onChange={(e) => { handleChangeInput('position', e) }}
                        onClick={() => { handleStartType('position') }}
                    >
                        <option selected>...</option>
                        {posArr && posArr.length > 0 && posArr.map(pos => {
                            return <option key={pos.id} value={pos.key}>
                                {language == languages.EN ? pos.valueEn : pos.valueVi}
                            </option>
                        })}
                    </select>

                    {errMessage.position != '' && <div className="warning-message position-absolute top-0 ">{errMessage.position}</div>}
                </div>
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.role' /></label>
                    <select class="form-control" value={isEditting ? userEdit.role : newUserInfo.role}
                        onChange={(e) => { handleChangeInput('role', e) }}
                        onClick={() => { handleStartType('role') }}
                    >
                        <option selected>...</option>
                        {roleArr && roleArr.length > 0 && roleArr.map(role => {
                            return <option key={role.id} value={role.key}>
                                {language == languages.EN ? role.valueEn : role.valueVi}
                            </option>
                        })}
                    </select>
                    {errMessage.role != '' && <div className="warning-message position-absolute top-0 ">{errMessage.role}</div>}
                </div>
                <div class="form-group col-3 position-relative">
                    <label ><FormattedMessage id='form-register.avatar' /></label>
                    <input type="text" class="form-control" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6 text-center">
                    <FormattedMessage id='form-register.create'>
                        {
                            value => <input onClick={handleClickCreate} className='form-control' type="button" value={value} />
                        }
                    </FormattedMessage>
                </div>
            </div>
        </div>
    )
}
