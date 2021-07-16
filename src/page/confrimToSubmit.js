import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { POST, ip } from '../api'
import axios from 'axios'

export default class ConfrimToSubmit extends Component {
    render() {

        const onGoBack = () => {
            this.props.history.goBack()
        }

        const onOpenPDF = async () => {
            await axios.post(`${ip}/leave/create_pdf`,
                { leave_id: 1 },
                {
                    responseType: "blob",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            ).then(async (res) => {
                const pdfBlob = new Blob([res.data], {
                    type: "application/pdf",
                });
                const fileURL = URL.createObjectURL(pdfBlob);
                window.open(fileURL);

            })
        }

        return (
            <div>
                <div onClick={() => onGoBack()}><ion-icon name="chevron-back-outline" id="icon-btn"></ion-icon></div>
                <h3 className="primary_paragraph">ยืนยันใบลา</h3>
                <Button variant='primary' onClick={() => onOpenPDF()}>กดเพื่อดาวน์โหลด หรือดูเอกสาร</Button>
                <Button variant='warning' onClick={() => onOpenPDF()}>ส่งเอกสาร</Button>
            </div>
        )
    }
}
