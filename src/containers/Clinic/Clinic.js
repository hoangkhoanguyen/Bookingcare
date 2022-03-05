import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import './Clinic.scss'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { ClinicInfoItem } from './ClinicInfoItem/ClinicInfoItem'
import { ClinicNavigation } from './ClinicNavigation/ClinicNavigation'
import clinicService from '../../services/clinicService'

export const Clinic = () => {

    const { id } = useParams()

    useEffect(async () => {
        if (!id) return
        // console.log(id)
        try {
            let res = await clinicService.getClinic(id)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }, [id])
    return (
        <>
            <HomeHeader />
            <ClinicNavigation />
            <div className="clinic-details">
            </div>
        </>
    )
}
