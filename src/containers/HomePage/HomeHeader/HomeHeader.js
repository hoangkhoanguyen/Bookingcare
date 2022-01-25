import React from 'react';

import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../../../store/actions/appActions';
import '../HomeHeader/HomeHeader.scss'


export const HomeHeader = () => {

    const handleChangeLanguage = (language) => {
        dispatch(changeLanguage(language))
    }

    const dispatch = useDispatch()
    return <div className='home-header'>
        <div className="nav-left">
            <div className="menu-icon">
                <i class="fas fa-bars"></i>
            </div>
            <div className="logo">
                <img src="/img/Homepage/main-logo.png" alt="" />
            </div>
        </div>
        <div className="nav-center">
            <div className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.specialty" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.search-doctor-by-specialty" /></span>
            </div>
            <div className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.health-facility" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.select-clinic" /></span>
            </div>
            <div className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.doctor" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.select-doctor" /></span>
            </div>
            <div className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.check-pagekage" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.general-check" /></span>
            </div>
        </div>
        <div className="nav-right">
            <i class="fas fa-question-circle"></i>
            <span><FormattedMessage id="home-header.support" />
            </span>
        </div>
        <div className="change-language">
            <button onClick={() => { handleChangeLanguage('vi') }}>VI</button>
            <button onClick={() => { handleChangeLanguage('en') }}>EN</button>
        </div>
    </div>;
};
