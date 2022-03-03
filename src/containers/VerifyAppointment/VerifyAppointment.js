import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import '../VerifyAppointment/VerifyAppointment.scss'
import axios from 'axios'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'

export const VerifyAppointment = () => {

    const { search } = useLocation()
    const [token, setToken] = useState()
    const [doctorId, setDoctorId] = useState()
    const [isVerified, setIsVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const query = React.useMemo(() => new URLSearchParams(search), [search])
    useEffect(() => {
        setToken(query.get('token'))
        setDoctorId(query.get('doctorId'))
    }, [])

    useEffect(async () => {
        if (token && doctorId) {
            try {
                setIsLoading(true)
                let body = { doctorId, token }
                let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/patient/verify-booking-appointment`, body)
                let result = res.data
                if (result && result.errCode === 0) {
                    setIsVerified(true)
                } else {
                    setIsVerified(false)
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)

            }
        }
    }, [token, doctorId])

    return (
        <>
            <HomeHeader />
            <div className="verify-container">
                {isLoading && <div className='loading'>Loading...</div>}
                <div className="content">
                    {isVerified ? 'Appointment is activated successfully!' : 'Appointment has been activated or does not exist!'}
                </div>
            </div>
        </>
    )
}
