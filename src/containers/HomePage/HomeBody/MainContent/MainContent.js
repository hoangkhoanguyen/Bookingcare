import React, { useEffect, useState } from 'react';
import '../MainContent/MainContent.scss'
import { FormattedMessage } from 'react-intl';

export const MainContent = () => {
    const [placeholderText, setPlaceholder] = useState("main-content.search-specialty")

    useEffect(() => {
        let timer
        timer = setTimeout(() => {
            if (placeholderText == "main-content.search-specialty") {
                setPlaceholder("main-content.search-hospital")
            } else {
                setPlaceholder("main-content.search-specialty")
            }
        }, 3000)
        return () => {
            clearTimeout(timer)
        };
    }, [placeholderText]);


    return <div className="main-content" >
        <div className="title">
            <h1><FormattedMessage id="main-content.health-base" /></h1>
            <h1><FormattedMessage id="main-content.general-health-care" /></h1>
        </div>
        <div className="search-area">
            <i className="fas fa-search"></i>
            <FormattedMessage id={placeholderText} >
                {placeholder =>
                    <input placeholder={placeholder} />
                }
            </FormattedMessage>
        </div>
        <div className="download-app"></div>
        <div className="category">
            <div className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.specialty-test" /></h6>
            </div>
            <div className="category-item">
                <i className="fas fa-mobile-alt"></i>
                <h6 className="name"><FormattedMessage id="main-content.remote-test" /></h6>
            </div>
            <div className="category-item">
                <i className="fas fa-notes-medical"></i>
                <h6 className="name"><FormattedMessage id="main-content.general-test" /></h6>
            </div>
            <div className="category-item">
                <i className="fas fa-vials"></i>
                <h6 className="name"><FormattedMessage id="main-content.medical-test" /></h6>
            </div>
            <div className="category-item">
                <i class="far fa-smile"></i>
                <h6 className="name"><FormattedMessage id="main-content.mental-health" /></h6>
            </div>
            <div className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.dental-test" /></h6>
            </div>
            <div className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.surgery pack" /></h6>
            </div>
            <div className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.medical-product" /></h6>
            </div>
        </div>
    </div>
};
