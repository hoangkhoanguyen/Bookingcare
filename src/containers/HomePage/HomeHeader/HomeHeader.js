import React from 'react';
import { FormattedMessage } from 'react-intl';

export const HomeHeader = () => {
    return <div className='home-header'>
        <div className="nav-header">
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
        <div className="support">
            <FormattedMessage id="home-header.support" />
        </div>
    </div>;
};
