import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import '../VerifyAppointment/VerifyAppointment.scss'
import axios from 'axios'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { FormattedMessage } from 'react-intl';

export const VerifyAppointment = () => {

    const { search } = useLocation()
    const [token, setToken] = useState()
    const [doctorId, setDoctorId] = useState()
    const [isVerified, setIsVerified] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const query = React.useMemo(() => new URLSearchParams(search), [search])
    useEffect(() => {
        setToken(query.get('token'))
        setDoctorId(query.get('doctorId'))
    }, [])

    useEffect(async () => {
        if (token && doctorId) {
            setIsLoaded(false)
            try {
                let body = { doctorId, token }
                let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/patient/verify-booking-appointment`, body)
                let result = res.data
                if (result && result.errCode === 0) {
                    setIsVerified(true)
                } else {
                    setIsVerified(false)
                }
            } catch (error) {
                console.log(error)
            }
            setIsLoaded(true)
        }
    }, [token, doctorId])

    return (
        <>
            <HomeHeader />
            {isLoaded &&
                <div className="verify-container">
                    {isVerified &&
                        <div className="verify-card-success">
                            <div className="verify-title">
                                <FormattedMessage id='common.verify-success' />
                            </div>
                            <div className="verify-content">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div className="actions-backhome">
                                <button><FormattedMessage id='common.back-homepage' /></button>
                            </div>
                        </div>
                    }
                    {!isVerified &&
                        <div className="verify-card-fail">
                            <div className="verify-title">
                                <FormattedMessage id='common.verify-fail' />
                            </div>
                            <div className="verify-content">
                                <i class="fas fa-times-circle"></i>
                            </div>
                            <div className="actions-backhome">
                                <button><FormattedMessage id='common.back-homepage' /></button>
                            </div>
                        </div>
                    }
                </div>
            }
            {!isLoaded &&
                <div className="page-loading">
                    <div className="loader">
                        <span style={{ '--i': 1 }}></span>
                        <span style={{ '--i': 2 }}></span>
                        <span style={{ '--i': 3 }}></span>
                        <span style={{ '--i': 4 }}></span>
                        <span style={{ '--i': 5 }}></span>
                        <span style={{ '--i': 6 }}></span>
                        <span style={{ '--i': 7 }}></span>
                        <span style={{ '--i': 8 }}></span>
                        <span style={{ '--i': 9 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        <span style={{ '--i': 11 }}></span>
                        <span style={{ '--i': 12 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 14 }}></span>
                        <span style={{ '--i': 15 }}></span>
                        <span style={{ '--i': 16 }}></span>
                        <span style={{ '--i': 17 }}></span>
                        <span style={{ '--i': 18 }}></span>
                        <span style={{ '--i': 19 }}></span>
                        <span style={{ '--i': 20 }}></span>
                    </div>
                </div>
            }
        </>
    )
}
