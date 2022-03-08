import React, { useState } from 'react'
import './ClinicManage.scss'
import CommonUtils from '../../../utils/CommonUtils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import clinicService from '../../../services/clinicService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

export const ClinicManage = () => {

    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [image, setImage] = useState()
    const [imageBase64, setImageBase64] = useState()
    const [contentMarkdown, setContentMarkdown] = useState('')
    const [contentHTML, setContentHTML] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
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
            toast.error('Name of clinic is required')
            return
        }
        if (!imageBase64) {
            toast.error('Picture of clinic is required')
            return
        }
        if (!address) {
            toast.error('Address of clinic is required')
            return
        }
        let data2Send = {
            name, address,
            image: imageBase64,
            descriptionHTML: contentHTML,
            descriptionMarkdown: contentMarkdown
        }
        console.log(data2Send)
        // return
        try {
            let res = await clinicService.saveClinicInfo(data2Send)
            console.log(res)
            if (res && res.data && res.data.errCode === 0) {
                resetForm()
                toast.success(res.data.errMessage)
            }
            if (res && res.data && res.data.errCode !== 0) {
                toast.error(res.data.errMessage)
            }
            if (!res.data) {
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
        setAddress('')
        setImage('')
        setImageBase64('')
        setContentHTML('')
    }

    return (
        <div className='specialty-manage'>
            <h2 className='text-center'>Quản lý phòng khám</h2>
            <div className="specialty-manage-body container">
                <div className="row">
                    <div className="form-group col-6">
                        <label >Tên phòng khám</label>
                        <input className='form-control' type="text" value={name} onChange={handleChangeName} />
                    </div>
                    <div className="form-group col-6">
                        <label >Ảnh phòng khám</label>
                        <input className='form-control' value={image} type="file" onChange={handleChangeImage} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-6">
                        <label >Địa chỉ phòng khám</label>
                        <input className='form-control' type="text" value={address} onChange={handleChangeAddress} />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12 ">
                        <MdEditor
                            value={contentMarkdown}
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange}
                        />
                    </div>
                    <div className="col-12 action-btns">
                        <button className='btn save-btn' onClick={handleClickSaveBtn}>Lưu thông tin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
