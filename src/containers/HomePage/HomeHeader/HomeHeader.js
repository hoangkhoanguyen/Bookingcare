import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { changeLanguage, showHideSidebar } from '../../../store/actions/appActions';
import { path } from '../../../utils';
import { LanguageSelection } from '../../LanguageSelection/LanguageSelection';
import '../HomeHeader/HomeHeader.scss'
import { HomeSidebar } from '../HomeSidebar/HomeSidebar';


export const HomeHeader = () => {

    const dispatch = useDispatch()
    const isShowSidebar = useSelector(state => state.app.isShowSidebar)
    const language = useSelector(state => state.app.language)

    const handleChangeLanguage = (language) => {
        dispatch(changeLanguage(language))
    }

    const handleShowSidebar = () => {
        dispatch(showHideSidebar(true))
    }

    const handleOpenListPage = (name) => {
        window.location.href = `/search-${name}-page`
    }

    return <div className='home-header'>
        <div className="nav-left">
            <div className="menu-icon">
                <i className="fas fa-bars" onClick={handleShowSidebar}></i>
            </div>
            <Link to={path.HOME_PAGE} className="logo">
                <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="" />
            </Link>
        </div>
        <div className="nav-center">
            <NavLink to={path.SPECIALTY_LIST} className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.specialty" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.search-doctor-by-specialty" /></span>
            </NavLink>
            <NavLink to={path.CLINIC_LIST} className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.health-facility" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.select-clinic" /></span>
            </NavLink>
            <NavLink to={path.DOCTOR_LIST} className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.doctor" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.select-doctor" /></span>
            </NavLink>
            <NavLink to={path.HOME_PAGE} className="nav-item">
                <h6 className="nav-title"><FormattedMessage id="home-header.check-pagekage" /></h6>
                <span className="sub-title"><FormattedMessage id="home-header.general-test" /></span>
            </NavLink>
        </div>
        <div className="nav-right">
            <div className="support">
                <i className="fas fa-question-circle"></i>
                <span><FormattedMessage id="home-header.support" />
                </span>
            </div>
            <div className="change-language">
                <LanguageSelection />
            </div>
        </div>
        {isShowSidebar && <HomeSidebar />}
    </div>;
};
