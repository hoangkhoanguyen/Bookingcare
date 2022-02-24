import { useState } from 'react';
import Select from 'react-select';
import '../System/ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchGetAllDoctorStart } from '../../store/actions/doctorSystemAction';
import { languages } from '../../utils';
import doctorService from '../../services/doctorService';
import { toast } from 'react-toastify';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!

export const DoctorManage = () => {

    const dispatch = useDispatch()
    const doctorList = useSelector(state => state.system.allDoctor)
    const language = useSelector(state => state.app.language)

    useEffect(() => {
        dispatch(fetchGetAllDoctorStart())
    }, [])

    const [contentMarkdown, setContentMarkdown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [description, setDescription] = useState('')

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html)
        setContentMarkdown(text)
    }

    const handleClickSave = async () => {
        if (selectedOption != '') {
            let result = await doctorService.saveDoctorDetails({
                doctorId: selectedOption.value,
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: description
            })
            if (result && result.errCode === 0) {
                resetDoctorDetailsForm()
                dispatch(fetchGetAllDoctorStart())
                toast.success('Save successfully!')
            }
        }
    }

    const resetDoctorDetailsForm = () => {
        setContentMarkdown('')
        setSelectedOption('')
        setDescription('')
    }
    const handleChangeSelectedDoctor = async (option) => {
        setSelectedOption(option)
        let res = await doctorService.getDoctorDetailsById(option.value)
        if (res && res.errCode === 0) {
            if (res.data) {
                console.log(res.data)
                setContentMarkdown(res.data.details.contentMarkdown)
                setContentHTML(res.data.details.contentHTML)
                setDescription(res.data.details.description)
            } else {
                setContentMarkdown('')
                setDescription('')
            }
        }
        if (res && res.errCode !== 0) {
            toast.error(res.errMessage)
        }
        if (!res) {
            toast.error('Something error!')
        }
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    return (
        <>
            <div className="doctor-manage-container container">
                <div className="manage-doctor-title">
                    Thêm thông tin doctor
                </div>
                <div className="more row info mb-4">
                    <div className="content-left form-group col-5">
                        <label htmlFor="">Chọn bác sĩ</label>
                        <Select
                            value={selectedOption}
                            onChange={handleChangeSelectedDoctor}
                            options={doctorList && doctorList.length > 0 && doctorList.map(doctor => {
                                return {
                                    value: `${doctor.id}`,
                                    label: language == languages.VI ? `${doctor.lastName} ${doctor.firstName}` : `${doctor.firstName} ${doctor.lastName}`
                                }
                            })}
                        />
                    </div>
                    <div className="content-right form-group col-7">
                        <label htmlFor="">Thông tin giới thiệu: </label>
                        <textarea value={description} onChange={handleChangeDescription} className='form-control' cols="30" rows="4">
                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        value={contentMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange} />
                </div>
                {/* <input className='submit-button' type="button" >Lưu thông tin</input> */}
                <button className='submit-button'
                    onClick={handleClickSave}
                >Lưu thông tin</button>
            </div>
        </>
    )
}
