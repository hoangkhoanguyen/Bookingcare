import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import { UserRedux } from '../containers/System/UserRedux';
import Header from '../containers/Header/Header';
import { DoctorManage } from '../containers/System/DoctorManage';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Header />
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/doctor-manage" component={DoctorManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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
