import React, { Component, } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { languages, USER_ROLE } from '../../utils/constant';
import { LanguageSelection } from '../LanguageSelection/LanguageSelection';

// import { changeLanguage } from '../../store/actions';


class Header extends Component {

    constructor(props) {
        super(props);
        this.acceptBtnRef = React.createRef();
    }

    state = {
        menu: [],
    }

    componentDidMount() {
        let { userRole } = this.props
        if (userRole == USER_ROLE.ADMIN) {
            this.setState({
                menu: adminMenu
            })
        }
        if (userRole == USER_ROLE.DOCTOR) {
            this.setState({
                menu: doctorMenu
            })
        }
    };

    render() {

        const { processLogout, changeLanguage } = this.props;
        const handleChangeLanguage = (language) => {
            changeLanguage(language)
        }

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menu} />
                </div>

                {/* nút logout */}
                <div className="header-right">
                    <div className="change-language">
                        <LanguageSelection />
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userRole: state.user.userInfo.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
