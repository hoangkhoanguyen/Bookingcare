import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import { path, USER_ROLE } from '../../utils';
import Admin from './Admin';
import Doctor from './Doctor';
import './System.scss'

class System extends Component {

    render() {
        const { systemMenuPath, role } = this.props;
        return (
            <div className="system-container">
                <Header />
                <div className='body-system-page'>
                    <Switch>
                        <Route path={path.DOCTOR_SYSTEM} component={Doctor} />
                        <Route path={path.ADMIN_SYSTEM} component={Admin} />
                        <Route component={() => {
                            return (<Redirect to={
                                role == USER_ROLE.ADMIN ? path.ADMIN_SYSTEM : path.DOCTOR_SYSTEM
                            } />)
                        }} />

                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        role: state.user.userInfo && state.user.userInfo.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
