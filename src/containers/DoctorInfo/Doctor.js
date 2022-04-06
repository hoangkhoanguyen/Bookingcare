import React from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { AboutPage } from '../AboutPage/AboutPage';
import { HomeFooter } from '../HomePage/HomeFooter/HomeFooter';
import { DoctorInfo } from './DoctorInfo/DoctorInfo';

export const Doctor = () => {

    const { id } = useParams()


    return (
        <div className="doctor-details-page">
            <DoctorInfo id={id} />
        </div>
    )
}
