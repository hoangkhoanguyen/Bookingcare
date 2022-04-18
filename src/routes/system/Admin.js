import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { ClinicManage } from '../../containers/System/ClinicManage/ClinicManage';
import { DoctorManage } from '../../containers/System/DoctorManage';
import { SpecialtyManage } from '../../containers/System/SpecialtyManage/SpecialtyManage';
import { UserRedux } from '../../containers/System/UserRedux';
import { path } from '../../utils';

class Admin extends Component {
    render() {
        return (
            <Switch>
                <Route path={path.ADMIN_SYSTEM_USER_MANAGE} component={UserRedux} />
                <Route path={path.ADMIN_SYSTEM_DOCTOR_MANAGE} component={DoctorManage} />
                <Route path={path.ADMIN_SYSTEM_CLINIC_MANAGE} component={ClinicManage} />
                <Route path={path.ADMIN_SYSTEM_SPECIALTY_MANAGE} component={SpecialtyManage} />
                <Route component={() => { return (<Redirect to={path.ADMIN_SYSTEM_USER_MANAGE} />) }} />
            </Switch>

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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
