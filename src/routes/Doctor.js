import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import { PatientManage } from '../containers/System/PatientManage/PatientManage';
import { ScheduleManage } from '../containers/System/ScheduleManage/ScheduleManage';

class Doctor extends Component {
    render() {
        return (
            <div className="Doctor-container">
                <div className="Doctor-list">
                    <Header />
                    <Switch>
                        <Route path="/doctor-system/schedule-manage" component={ScheduleManage} />
                        <Route path="/doctor-system/patient-manage" component={PatientManage} />
                    </Switch>
                    <Switch>
                    </Switch>
                </div>
            </div>
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
