import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import { UserRedux } from '../containers/System/UserRedux';
import Header from '../containers/Header/Header';
import { DoctorManage } from '../containers/System/DoctorManage';
import { SpecialtyManage } from '../containers/System/SpecialtyManage/SpecialtyManage';
import { ClinicManage } from '../containers/System/ClinicManage/ClinicManage';
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

class Guest extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <>
                {/* // <div className="system-container">
            //     <div className="system-list"> */}
                <HomeHeader />
                <Switch>
                    <Route path={path.HOME} exact component={HomeBody} />
                    <Route path={path.DOCTOR_LIST} component={DoctorListPage} />
                    <Route path={path.SPECIALTY_LIST} component={SpecialtyListPage} />
                    <Route path={path.CLINIC_LIST} component={ClinicListPage} />
                    <Route path={path.DOCTOR} component={Doctor} />
                    <Route path={path.SPECIALTY} component={Specialty} />
                    <Route path={path.CLINIC} component={Clinic} />

                    {/* <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/doctor-manage" component={DoctorManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/specialty-manage" component={SpecialtyManage} />
                        <Route path="/system/clinic-manage" component={ClinicManage} /> */}
                    {/* <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} /> */}
                    {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
                </Switch>
                <AboutPage />
                <HomeFooter />
                {/* //     </div>
            // </div> */}
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
