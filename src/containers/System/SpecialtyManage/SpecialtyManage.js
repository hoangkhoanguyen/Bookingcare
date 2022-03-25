import React, { useState } from 'react'
import '../SpecialtyManage/SpecialtyManage.scss'
import CommonUtils from '../../../utils/CommonUtils'
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import specialtyService from '../../../services/specialtyService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

export const SpecialtyManage = () => {

    const [name, setName] = useState()
    const [image, setImage] = useState()
    const [imageBase64, setImageBase64] = useState()
    const [contentMarkdown, setContentMarkdown] = useState('')
    const [contentHTML, setContentHTML] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html)
        setContentMarkdown(text)
    }

    const handleChangeImage = async (e) => {
        setImage(e.target.value)
        let file = e.target.files[0]
        if (file) {
            let dataBase64 = await CommonUtils.getBase64(file)
            setImageBase64(dataBase64)
        }
    }

    const handleClickSaveBtn = async () => {
        if (name == '') {
            toast.error('Name of specialty is required')
            return
        }
        if (!imageBase64) {
            toast.error('Picture of specialty is required')
            return
        }
        let data2Send = {
            name,
            image: imageBase64,
            descriptionHTML: contentHTML,
            descriptionMarkdown: contentMarkdown
        }
        try {
            let res = await specialtyService.saveSpecialtyInfo(data2Send)
            if (res && res.errCode === 0) {
                resetForm()
                toast.success(res.errMessage)
            }
            if (res && res.errCode !== 0) {
                toast.error(res.errMessage)
            }
            if (!res) {
                toast.error('Something error!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong!')
        }
    }

    const resetForm = () => {
        setContentMarkdown('')
        setName('')
        setImage('')
        setImageBase64('')
        setContentHTML('')
    }

    return (
        <div className='specialty-manage'>
            <h2 className='text-center'><FormattedMessage id='specialty-info.specialty-manage' /></h2>
            <div className="specialty-manage-body container">
                <div className="row">
                    <div className="form-group col-6">
                        <label ><FormattedMessage id='specialty-info.specialty-name' /></label>
                        <input className='form-control' type="text" value={name} onChange={handleChangeName} />
                    </div>
                    <div className="form-group col-6">
                        <label ><FormattedMessage id='specialty-info.specialty-image' /></label>
                        <input className='form-control' value={image} type="file" onChange={handleChangeImage} />
                    </div>
                    <div className="col-12 ">
                        <label><FormattedMessage id='specialty-info.specialty-details' /></label>
                        <MdEditor
                            value={contentMarkdown}
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange} />
                    </div>
                    <div className="col-12 action-btns">
                        <button className='btn save-btn' onClick={handleClickSaveBtn}><FormattedMessage id='specialty-info.save' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
