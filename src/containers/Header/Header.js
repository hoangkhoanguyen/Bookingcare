import React, { Component, } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { languages } from '../../utils/constant';

// import { changeLanguage } from '../../store/actions';


class Header extends Component {



    render() {

        const { processLogout, changeLanguage } = this.props;
        const handleChangeLanguage = (language) => {
            changeLanguage(language)
        }

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="header-right">
                    <div className="language">
                        <span className='language-vi' onClick={() => { handleChangeLanguage(languages.VI) }}>VN</span>
                        <span className='language-en' onClick={() => { handleChangeLanguage(languages.EN) }}>EN</span>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
