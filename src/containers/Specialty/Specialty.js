import React from 'react'
import { useParams } from 'react-router-dom'
import { HomeHeader } from '../HomePage/HomeHeader/HomeHeader'
import { SpecialtyDetails } from './SpecialtyDetails/SpecialtyDetails'

export const Specialty = () => {

    const { id } = useParams()
    return (
        <>
            <HomeHeader />
            <SpecialtyDetails id={id} />
        </>
    )
}
