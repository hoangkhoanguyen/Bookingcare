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
import { fetchGetAllDoctorStart, fetchAllCodeStart } from '../../store/actions/doctorSystemAction';
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
    const priceList = useSelector(state => state.system.priceList)
    const paymentList = useSelector(state => state.system.paymentList)
    const provinceList = useSelector(state => state.system.provinceList)
    const language = useSelector(state => state.app.language)
    const [contentMarkdown, setContentMarkdown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const [selectedOption, setSelectedOption] = useState({
        doctor: {},
        price: {},
        payment: {},
        province: {},
        addressClinic: '',
        nameClinic: '',
        note: '',
    })
    const [description, setDescription] = useState('')


    useEffect(() => {
        dispatch(fetchGetAllDoctorStart())
        dispatch(fetchAllCodeStart('PRICE'))
        dispatch(fetchAllCodeStart('PROVINCE'))
        dispatch(fetchAllCodeStart('PAYMENT'))
    }, [])

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html)
        setContentMarkdown(text)
    }

    const handleClickSave = async () => {
        if (selectedOption.doctor != {}) {
            let result = await doctorService.saveDoctorDetails({
                doctorId: selectedOption.doctor.value,
                contentHTML,
                contentMarkdown,
                description,
                priceId: selectedOption.price.value,
                provinceId: selectedOption.province.value,
                paymentId: selectedOption.payment.value,
                addressClinic: selectedOption.addressClinic,
                nameClinic: selectedOption.nameClinic,
                note: selectedOption.note,
            })
            if (result && result.errCode === 0) {
                resetDoctorDetailsForm()
                dispatch(fetchGetAllDoctorStart())
                toast.success('Save successfully!')
            }
            if (result && result.errCode !== 0) {
                toast.error(result.errMessage)
            }
            if (!result) {
                toast.error('Something error!')
            }
        }
    }

    const resetDoctorDetailsForm = () => {
        setContentMarkdown('')
        setSelectedOption({
            doctor: {},
            price: {},
            payment: {},
            province: {},
            addressClinic: '',
            nameClinic: '',
            note: '',
        })
        setDescription('')
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeSelection = async (key, value) => {
        let currentState = selectedOption

        setSelectedOption({
            ...currentState,
            [key]: value
        })
        if (key == 'doctor') {
            let resDocDetails = await doctorService.getDoctorDetailsById(value.value)
            if (resDocDetails && resDocDetails.errCode === 0) {
                if (resDocDetails.data) {
                    setContentMarkdown(resDocDetails.data.details.contentMarkdown)
                    setContentHTML(resDocDetails.data.details.contentHTML)
                    setDescription(resDocDetails.data.details.description)
                    setSelectedOption({
                        doctor: value,
                        price: resDocDetails.data.priceId ? {
                            label: language == languages.EN ? resDocDetails.data.priceData.valueEn : resDocDetails.data.priceData.valueVi,
                            value: resDocDetails.data.priceId
                        } : {},
                        payment: resDocDetails.data.paymentId ? {
                            label: language == languages.EN ? resDocDetails.data.paymentData.valueEn : resDocDetails.data.paymentData.valueVi,
                            value: resDocDetails.data.paymentId
                        } : {},
                        province: resDocDetails.data.provinceId ? {
                            label: language == languages.EN ? resDocDetails.data.provinceData.valueEn : resDocDetails.data.provinceData.valueVi,
                            value: resDocDetails.data.provinceId
                        } : {},
                        addressClinic: resDocDetails.data.addressClinic,
                        nameClinic: resDocDetails.data.nameClinic,
                        note: resDocDetails.data.note,
                    })
                } else {
                    setContentMarkdown('')
                    setDescription('')
                }
            }
            if (resDocDetails && resDocDetails.errCode !== 0) {
                toast.error(resDocDetails.errMessage)
            }
            if (!resDocDetails) {
                toast.error('Something error!')
            }
        }
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
                            value={selectedOption.doctor}
                            onChange={(value) => { handleChangeSelection('doctor', value) }}
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
                <div className="row">
                    <div className="col-4">
                        <label >Chọn giá</label>
                        <Select
                            value={selectedOption.price}
                            onChange={(value) => { handleChangeSelection('price', value) }}
                            options={priceList && priceList.length > 0 && priceList.map(item => {
                                return {
                                    value: item.keyMap,
                                    label: language == languages.VI ? item.valueVi : item.valueEn
                                }
                            })}
                        />
                    </div>
                    <div className="col-4">
                        <label >Chọn phương thức thanh toán</label>
                        <Select
                            value={selectedOption.payment}
                            onChange={(value) => { handleChangeSelection('payment', value) }}
                            options={paymentList && paymentList.length > 0 && paymentList.map(item => {
                                return {
                                    value: item.keyMap,
                                    label: language == languages.VI ? item.valueVi : item.valueEn
                                }
                            })}
                        />
                    </div>
                    <div className="col-4">
                        <label >Chọn tỉnh</label>
                        <Select
                            value={selectedOption.province}
                            onChange={(value) => { handleChangeSelection('province', value) }}
                            options={provinceList && provinceList.length > 0 && provinceList.map(item => {
                                return {
                                    value: item.keyMap,
                                    label: language == languages.VI ? item.valueVi : item.valueEn
                                }
                            })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label >Tên phòng khám</label>
                        <input type="text" className='form-control'
                            onChange={(e) => { handleChangeSelection('nameClinic', e.target.value) }}
                            value={selectedOption.nameClinic} />
                    </div>
                    <div className="col-4 form-group">
                        <label >Địa chỉ phòng khám</label>
                        <input type="text" className='form-control'
                            onChange={(e) => { handleChangeSelection('addressClinic', e.target.value) }}
                            value={selectedOption.addressClinic} />
                    </div>
                    <div className="col-4 form-group">
                        <label >Ghi chú</label>
                        <input type="text" className='form-control'
                            onChange={(e) => { handleChangeSelection('note', e.target.value) }}
                            value={selectedOption.note} />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        value={contentMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange} />
                </div>
                <button className='submit-button'
                    onClick={handleClickSave}
                >Lưu thông tin</button>
            </div>
        </>
    )
}
