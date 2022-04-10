import React from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { DoctorInfo } from './DoctorInfo/DoctorInfo';

export const Doctor = () => {

    const { id } = useParams()

    return (
        <>
            <DoctorInfo id={id} />
        </>
    )
}
