import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../../utils'
import { FormattedMessage } from 'react-intl';
import { fetchStart } from '../../store/actions/userActions';

export const UserRedux = () => {

    const dispatch = useDispatch()
    const genderArr = useSelector(state => state.user.genderArr)
    const posArr = useSelector(state => state.user.posArr)
    const roleArr = useSelector(state => state.user.roleArr)

    const language = useSelector(state => state.app.language)

    useEffect(async () => {
        dispatch(fetchStart('GENDER'))
        dispatch(fetchStart('POSITION'))
        dispatch(fetchStart('ROLE'))
    }, [])

    return (
        <>
            <h1 className="title-section text-center">
                USER REDUX
            </h1>
            <div className="container">
                <div className=" row mb-2">
                    <div class="form-group col-3">
                        <label >Email</label>
                        <FormattedMessage id='form-register.enter-email'>
                            {
                                placeholder => <input type="email" class="form-control" placeholder={placeholder} />
                            }
                        </FormattedMessage>

                    </div>
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.password' /></label>
                        <FormattedMessage id='form-register.enter-password'>
                            {
                                placeholder => <input type="password" class="form-control" placeholder={placeholder} />
                            }
                        </FormattedMessage>
                    </div>
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.first-name' /></label>
                        <FormattedMessage id='form-register.enter-first-name'>
                            {
                                placeholder => <input type="text" class="form-control" placeholder={placeholder} />
                            }
                        </FormattedMessage>

                    </div>
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.last-name' /></label>
                        <FormattedMessage id='form-register.enter-last-name'>
                            {
                                placeholder => <input type="text" class="form-control" placeholder={placeholder} />
                            }
                        </FormattedMessage>
                    </div>
                </div>
                <div className="row mb-2">
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.phone-number' /></label>
                        <FormattedMessage id='form-register.enter-phone-number'>
                            {
                                placeholder => <input type="number" class="form-control" placeholder={placeholder} />
                            }
                        </FormattedMessage>

                    </div>
                    <div class="form-group col-9">
                        <label ><FormattedMessage id='form-register.address' /></label>
                        <FormattedMessage id='form-register.enter-address'>
                            {
                                placeholder => <input type="text" class="form-control" placeholder={placeholder} />
                            }
                        </FormattedMessage>

                    </div>
                </div>
                <div className="row mb-2">
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.gender' /></label>
                        <select class="form-control" >
                            {genderArr && genderArr.length > 0 && genderArr.map(gender => {
                                return <option key={gender.id} value={gender.key}>
                                    {language == languages.EN ? gender.valueEn : gender.valueVi}
                                </option>
                            })}
                        </select>
                    </div>
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.position' /></label>
                        <select class="form-control" >
                            {posArr && posArr.length > 0 && posArr.map(pos => {
                                return <option key={pos.id} value={pos.key}>
                                    {language == languages.EN ? pos.valueEn : pos.valueVi}
                                </option>
                            })}
                        </select>
                    </div>
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.role' /></label>
                        <select class="form-control" >
                            {roleArr && roleArr.length > 0 && roleArr.map(role => {
                                return <option key={role.id} value={role.key}>
                                    {language == languages.EN ? role.valueEn : role.valueVi}
                                </option>
                            })}
                        </select>
                    </div>
                    <div class="form-group col-3">
                        <label ><FormattedMessage id='form-register.avatar' /></label>
                        <input type="text" class="form-control" />
                    </div>
                </div>
            </div>
        </>
    )
}
