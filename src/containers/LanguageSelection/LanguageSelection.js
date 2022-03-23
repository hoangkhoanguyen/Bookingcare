import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../../store/actions/appActions'
import { languages } from '../../utils'
import '../LanguageSelection/LanguageSelection.scss'

export const LanguageSelection = () => {
    const language = useSelector(state => state.app.language)
    const dispatch = useDispatch()
    const handleChangeLanguage = () => {
        if (language == languages.EN) {
            dispatch(changeLanguage(languages.VI))
        }
        if (language == languages.VI) {
            dispatch(changeLanguage(languages.EN))
        }
    }
    return (
        <div className="change-language-container"
            onClick={handleChangeLanguage} >
            <div className={language == languages.EN ? 'switch-item en-active' : 'switch-item vi-active'}></div>
            <span>VI</span>
            <span>EN</span>
        </div>
    )
}
