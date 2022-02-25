import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../../store/actions/appActions'
import { languages } from '../../utils'
import '../LanguageSelection/LanguageSelection.scss'

export const LanguageSelection = () => {
    const language = useSelector(state => state.app.language)
    const dispatch = useDispatch()
    const handleChangeLanguage = (language) => {
        dispatch(changeLanguage(language))
    }
    return (
        <div className="change-language">
            <span className={language == languages.VI ? 'language-item active' : 'language-item'} onClick={() => { handleChangeLanguage('vi') }}>VI</span>
            <span className={language == languages.EN ? 'language-item active' : 'language-item'} onClick={() => { handleChangeLanguage('en') }}>EN</span>
        </div>
    )
}
