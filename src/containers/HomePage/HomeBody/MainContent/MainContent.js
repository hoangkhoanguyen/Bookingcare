import React, { useEffect, useState } from 'react';
import '../MainContent/MainContent.scss'
import { FormattedMessage } from 'react-intl';
import ggp from '../MainContent/logo-google-play.jpg'
import aps from '../MainContent/logo-appstore.png'

export const MainContent = () => {
    const [placeholderText, setPlaceholder] = useState("main-content.search-specialty")
    const [searchText, setSearchText] = useState('')
    const [isEmpty, setIsEmpty] = useState(true)

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

    const handleChangeSearchInput = (e) => {
        if (e.target.value == '') {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        }
        setSearchText(e.target.value)
    }

    return <div className="main-content" >
        <div className="title">
            <h1><FormattedMessage id="main-content.health-base" /></h1>
            <h1><FormattedMessage id="main-content.general-health-care" /></h1>
        </div>
        <div className="search-area">
            <i className="fas fa-search"></i>
            <FormattedMessage id={placeholderText} >
                {placeholder => <input onChange={handleChangeSearchInput} placeholder={placeholder} />}
            </FormattedMessage>
            {!isEmpty && <i className="fasdownload-app fa-times"></i>}
        </div>
        <div className="download-app">
            <img src={ggp} className="app-item"></img>
            <img src={aps} className="app-item"></img>
        </div>
        <div className="category">
            <a className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.specialty-test" /></h6>
            </a>
            <a className="category-item">
                <i className="fas fa-mobile-alt"></i>
                <h6 className="name"><FormattedMessage id="main-content.remote-test" /></h6>
            </a>
            <a className="category-item">
                <i className="fas fa-notes-medical"></i>
                <h6 className="name"><FormattedMessage id="main-content.general-test" /></h6>
            </a>
            <a className="category-item">
                <i className="fas fa-vials"></i>
                <h6 className="name"><FormattedMessage id="main-content.medical-test" /></h6>
            </a>
            <a className="category-item">
                <i className="far fa-smile"></i>
                <h6 className="name"><FormattedMessage id="main-content.mental-health" /></h6>
            </a>
            <a className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.dental-test" /></h6>
            </a>
            <a className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.surgery pack" /></h6>
            </a>
            <a className="category-item">
                <i className="far fa-hospital"></i>
                <h6 className="name"><FormattedMessage id="main-content.medical-product" /></h6>
            </a>
        </div>
    </div>
};
