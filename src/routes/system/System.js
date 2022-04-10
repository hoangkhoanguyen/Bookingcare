import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import { path } from '../../utils';
import Admin from './Admin';
import Doctor from './Doctor';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <Header />
                <div className='body-system-page'>
                    <Switch>
                        <Route path={path.DOCTOR_SYSTEM} component={Doctor} />
                        <Route path={path.ADMIN_SYSTEM} component={Admin} />
                        {/* <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />  */}
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
