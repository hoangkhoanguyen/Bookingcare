import { useState } from 'react';
import Select from 'react-select';
import '../System/ManageDoctor.scss'
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchGetAllDoctorStart, fetchAllCodeStart, fetchSpecialtyName } from '../../store/actions/doctorSystemAction';
import { languages } from '../../utils';
import doctorService from '../../services/doctorService';
import clinicService from '../../services/clinicService';
import { toast } from 'react-toastify';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!

export const DoctorManage = () => {

    const dispatch = useDispatch()

    const specialtyList = useSelector(state => state.system.specialtyList)
    const provinceList = useSelector(state => state.system.provinceList)
    const paymentList = useSelector(state => state.system.paymentList)
    const doctorList = useSelector(state => state.system.allDoctor)
    const priceList = useSelector(state => state.system.priceList)
    const language = useSelector(state => state.app.language)

    const [doctorOptions, setDoctorOptions] = useState([])
    const [priceOptions, setPriceOptions] = useState([])
    const [provinceOptions, setProvinceOptions] = useState([])
    const [paymentOptions, setPaymentOptions] = useState([])
    const [specialtyOptions, setSpecialtyOptions] = useState([])
    const [clinicOptions, setClinicOptions] = useState([])
    const [contentMarkdown, setContentMarkdown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState({})
    const [selectedPrice, setSelectedPrice] = useState({})
    const [selectedPayment, setSelectedPayment] = useState({})
    const [selectedProvince, setSelectedProvince] = useState({})
    const [selectedOption, setSelectedOption] = useState({
        addressClinic: '',
        nameClinic: '',
        note: '',
        specialty: '',
        clinic: '',
        description: ''
    })

    useEffect(() => {
        dispatch(fetchGetAllDoctorStart())
        dispatch(fetchAllCodeStart('PRICE'))
        dispatch(fetchAllCodeStart('PROVINCE'))
        dispatch(fetchAllCodeStart('PAYMENT'))
        dispatch(fetchSpecialtyName())
    }, [])

    const buildArrOptions = (originArr) => {
        let finalArr = originArr.map(item => {
            return {
                value: item.keyMap,
                label: language == languages.VI ? item.valueVi : item.valueEn
            }
        })
        return finalArr
    }

    useEffect(() => {
        if (doctorList && doctorList.length > 0) {
            let originArr = doctorList.map(item => {
                return {
                    value: item.id,
                    label: language == languages.VI ? `${item.lastName} ${item.firstName}` : `${item.firstName} ${item.lastName}`
                }
            })
            setDoctorOptions(originArr)
            if (selectedDoctor) {
                setSelectedDoctor(originArr.filter(item => item.value == selectedDoctor.value)[0])
            }
        }
    }, [doctorList, language])

    useEffect(async () => {
        let clinicList = []
        try {
            let res = await clinicService.getClinic()
            if (res && res.errCode === 0) {
                clinicList = res.data
                if (clinicList && clinicList.length > 0) {
                    let originArr = clinicList.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })
                    setClinicOptions(originArr)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (specialtyList && specialtyList.length > 0) {
            let originArr = specialtyList.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setSpecialtyOptions(originArr)
        }
    }, [specialtyList])

    useEffect(() => {
        if (priceList && priceList.length > 0) {
            let arr = buildArrOptions(priceList)
            setPriceOptions(arr)
            if (selectedPrice) {
                setSelectedPrice(arr.filter(item => item.value == selectedPrice.value)[0])
            }
        }
    }, [priceList, language])

    useEffect(() => {
        if (provinceList && provinceList.length > 0) {
            let arr = buildArrOptions(provinceList)
            setProvinceOptions(arr)
            if (selectedProvince) {
                setSelectedProvince(arr.filter(item => item.value == selectedProvince.value)[0])
            }
        }
    }, [provinceList, language])
    useEffect(() => {
        if (paymentList && paymentList.length > 0) {
            let arr = buildArrOptions(paymentList)
            setPaymentOptions(arr)
            if (selectedPayment) {
                setSelectedPayment(arr.filter(item => item.value == selectedPayment.value)[0])
            }
        }
    }, [paymentList, language])

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html)
        setContentMarkdown(text)
    }

    const handleClickSave = async () => {
        if (selectedOption.doctor != {}) {
            let result = await doctorService.saveDoctorDetails({
                doctorId: selectedDoctor.value,
                contentHTML,
                contentMarkdown,
                description: selectedOption.description,
                priceId: selectedPrice.value,
                provinceId: selectedProvince.value,
                paymentId: selectedPayment.value,
                addressClinic: selectedOption.addressClinic,
                nameClinic: selectedOption.nameClinic,
                clinicId: selectedOption.clinic.value,
                note: selectedOption.note,
                specialtyId: selectedOption.specialty.value
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
        setSelectedDoctor({})
        setSelectedPrice({})
        setSelectedPayment({})
        setSelectedProvince({})
        setSelectedOption({
            addressClinic: '',
            nameClinic: '',
            note: '',
            specialty: '',
            clinic: '',
            description: ''
        })
    }

    const handleChangeSelection = async (key, value) => {
        let currentState = selectedOption

        setSelectedOption({
            ...currentState,
            [key]: value
        })
    }

    const handleChangeSelectedDoctor = async (value) => {
        setSelectedDoctor(value)
        let resDocDetails = await doctorService.getDoctorDetailsById(value.value)
        if (resDocDetails && resDocDetails.errCode === 0) {
            if (resDocDetails.data) {
                setContentMarkdown(resDocDetails.data.details.contentMarkdown)
                setContentHTML(resDocDetails.data.details.contentHTML)
                setSelectedProvince(resDocDetails.data.provinceId ? provinceOptions.filter(item => item.value == resDocDetails.data.provinceId)[0] : {})
                setSelectedPayment(resDocDetails.data.paymentId ? paymentOptions.filter(item => item.value == resDocDetails.data.paymentId)[0] : {})
                setSelectedPrice(resDocDetails.data.priceId ? priceOptions.filter(item => item.value == resDocDetails.data.priceId)[0] : {})
                setSelectedOption({
                    description: resDocDetails.data.details.description,
                    clinic: resDocDetails.data.details.clinicId ? clinicOptions.filter(item => item.value == resDocDetails.data.details.clinicId)[0] : {},
                    addressClinic: resDocDetails.data.addressClinic,
                    nameClinic: resDocDetails.data.nameClinic,
                    note: resDocDetails.data.note,
                    specialty: resDocDetails.data.details.specialtyId ? specialtyOptions.filter(item => item.value == resDocDetails.data.details.specialtyId)[0] : {},
                })
            } else {
                resetDoctorDetailsForm()
            }
        }
        if (resDocDetails && resDocDetails.errCode !== 0) {
            toast.error(resDocDetails.errMessage)
            resetDoctorDetailsForm()
        }
        if (!resDocDetails) {
            toast.error('Something error!')
            resetDoctorDetailsForm()
        }
    }

    const handleChangeSelectedPrice = (value) => {
        setSelectedPrice(value)
    }

    const handleChangeSelectedPayment = (value) => {
        setSelectedPayment(value)
    }

    const handleChangeSelectedProvince = (value) => {
        setSelectedProvince(value)
    }

    return (
        <>
            <div className="doctor-manage-container container">
                <div className="manage-doctor-title">
                    <FormattedMessage id='doctor-info.add-doctor-info' />
                </div>
                <div className="more row info mb-4">
                    <div className="content-left form-group col-5">
                        <label htmlFor=""><FormattedMessage id='doctor-info.choose-doctor' /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={handleChangeSelectedDoctor}
                            options={doctorOptions}
                        />
                    </div>
                    <div className="content-right form-group col-7">
                        <label htmlFor=""><FormattedMessage id='doctor-info.intro-info' /></label>
                        <textarea value={selectedOption.description} onChange={(e) => { handleChangeSelection('description', e.target.value) }} className='form-control' cols="30" rows="4">
                        </textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label ><FormattedMessage id='doctor-info.choose-price' /></label>
                        <Select
                            value={selectedPrice}
                            onChange={handleChangeSelectedPrice}
                            options={priceOptions}
                        />
                    </div>
                    <div className="col-4">
                        <label ><FormattedMessage id='doctor-info.choose-payment' /></label>
                        <Select
                            value={selectedPayment}
                            onChange={handleChangeSelectedPayment}
                            options={paymentOptions}
                        />
                    </div>
                    <div className="col-4">
                        <label ><FormattedMessage id='doctor-info.choose-province' /></label>
                        <Select
                            value={selectedProvince}
                            onChange={handleChangeSelectedProvince}
                            options={provinceOptions}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label ><FormattedMessage id='doctor-info.clinic-name' /></label>
                        <input type="text" className='form-control'
                            onChange={(e) => { handleChangeSelection('nameClinic', e.target.value) }}
                            value={selectedOption.nameClinic} />
                    </div>
                    <div className="col-4 form-group">
                        <label ><FormattedMessage id='doctor-info.clinic-address' /></label>
                        <input type="text" className='form-control'
                            onChange={(e) => { handleChangeSelection('addressClinic', e.target.value) }}
                            value={selectedOption.addressClinic} />
                    </div>
                    <div className="col-4 form-group">
                        <label ><FormattedMessage id='doctor-info.note' /></label>
                        <input type="text" className='form-control'
                            onChange={(e) => { handleChangeSelection('note', e.target.value) }}
                            value={selectedOption.note} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label ><FormattedMessage id='doctor-info.choose-specialty' /></label>
                        <Select
                            value={selectedOption.specialty}
                            onChange={(value) => { handleChangeSelection('specialty', value) }}
                            options={specialtyOptions}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label ><FormattedMessage id='doctor-info.choose-clinic' /></label>
                        <Select
                            value={selectedOption.clinic}
                            onChange={(value) => { handleChangeSelection('clinic', value) }}
                            options={clinicOptions}
                        />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        value={contentMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange} />
                </div>
                <div className="action-btn">
                    <button className='submit-button'
                        onClick={handleClickSave}
                    ><FormattedMessage id='doctor-info.save' /></button>
                </div>
            </div>
        </>
    )
}
