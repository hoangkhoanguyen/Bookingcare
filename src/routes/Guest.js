import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomeHeader } from '../containers/HomePage/HomeHeader/HomeHeader';
import { path } from '../utils'
import { HomeBody } from '../containers/HomePage/HomeBody/HomeBody';
import { AboutPage } from '../containers/AboutPage/AboutPage';
import { HomeFooter } from '../containers/HomePage/HomeFooter/HomeFooter';
import { DoctorListPage } from '../containers/DoctorListPage/DoctorListPage';
import { SpecialtyListPage } from '../containers/SpecialtyListPage/SpecialtyListPage';
import { ClinicListPage } from '../containers/ClinicListPage/ClinicListPage';
import { Doctor } from '../containers/DoctorInfo/Doctor';
import { Specialty } from '../containers/Specialty/Specialty';
import { Clinic } from '../containers/Clinic/Clinic';
import './Guest.scss'

class Guest extends Component {
    render() {
        return (
            <>
                <HomeHeader />
                <div className='body-guest-page'>
                    <Switch>
                        <Route path={path.HOME} exact component={HomeBody} />
                        <Route path={path.DOCTOR_LIST} component={DoctorListPage} />
                        <Route path={path.SPECIALTY_LIST} component={SpecialtyListPage} />
                        <Route path={path.CLINIC_LIST} component={ClinicListPage} />
                        <Route path={path.DOCTOR} component={Doctor} />
                        <Route path={path.SPECIALTY} component={Specialty} />
                        <Route path={path.CLINIC} component={Clinic} />

                        {/* <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} /> */}
                        {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
                    </Switch>
                    <AboutPage />
                    <HomeFooter />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
