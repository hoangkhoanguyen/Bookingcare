import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import { PatientManage } from '../../containers/System/PatientManage/PatientManage';
import { ScheduleManage } from '../../containers/System/ScheduleManage/ScheduleManage';
import { path } from '../../utils';

class Doctor extends Component {
    render() {
        return (
            <Switch>
                <Route path={path.DOCTOR_SYSTEM_SCHEDULE_MANAGE} component={ScheduleManage} />
                <Route path={path.DOCTOR_SYSTEM_PATIENT_MANAGE} component={PatientManage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
