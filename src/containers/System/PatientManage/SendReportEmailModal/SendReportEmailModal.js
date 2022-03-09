import React, { useEffect, useState } from 'react'
import './SendReportEmailModal.scss'
import CommonUtils from '../../../../utils/CommonUtils'
import doctorService from '../../../../services/doctorService'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export const SendReportEmailModal = (props) => {

    const { info, closeModal } = props
    const language = useSelector(state => state.app.language)
    const [email2Send, setEmail2Send] = useState('')
    const [image, setImage] = useState()
    const [imageBase64, setImageBase64] = useState()

    useEffect(() => {
        setEmail2Send(info.patientInfo.email)
    }, [])

    const handleChangeEmail = () => {

    }

    const handleChangeInputFile = async (e) => {
        setImage(e.target.value)
        let file = e.target.files[0]
        if (file) {
            let dataBase64 = await CommonUtils.getBase64(file)
            setImageBase64(dataBase64)
        }
    }

    const handleSendRequest = async () => {
        try {
            let data = {
                id: info.id,
                language,
                email: email2Send,
                patientName: info.patientInfo.firstName,
                imgBase64: imageBase64
            }
            let res = await doctorService.confirmStatusDone(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                closeModal()
            }
            else {
                toast.error(res.errMessage)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong!')
        }
    }

    return (
        <div className='modal-container' onClick={closeModal}>
            <div className="modal-card " onClick={(e) => { e.stopPropagation() }}>
                <div className="row">
                    Gửi hóa đơn khám bệnh thành công
                </div>
                <div className="row">
                    <div className=" col-6">
                        <label >Email</label>
                        <input type="text" value={email2Send} onChange={handleChangeEmail} />
                    </div>
                    <div className=" col-6">
                        <input type="file" value={image} onChange={handleChangeInputFile} />
                    </div>
                </div>
                <div className="row action-btns">
                    <button onClick={handleSendRequest}>Send</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
