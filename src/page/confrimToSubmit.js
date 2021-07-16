import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { POST, ip } from '../api'
import axios from 'axios'

export default class ConfrimToSubmit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leave: {},
            role_id: "",
            profile: "",
            leave_id: ""
        }
    }

    componentDidMount = () => {
        let { role_id, profile, leave_id } = this.state
        if (this.props.location.state) {
            role_id = this.props.location.state.role_id
            profile = this.props.location.state.profile
            leave_id = this.props.location.state.leave_id
        }
        this.setState({ role_id, profile, leave_id })
    }

    render() {
        let { leave_id, role_id, profile } = this.state
        const onGoBack = () => {
            this.props.history.goBack()
        }

        const onOpenPDF = async () => {
            await axios.post(`${ip}/leave/create_pdf`,
                { leave_id: leave_id.leave_id },
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
        const onSubmitApproved = () => {
            this.props.history.push({
                pathname: '/dashboard',
                state: { role_id: role_id, profile: profile }
            })
        }

        return (
            <div>
                <div onClick={() => onGoBack()}><ion-icon name="chevron-back-outline" id="icon-btn"></ion-icon></div>
                <h3 className="primary_paragraph">ยืนยันใบลา</h3>
                <Button variant='primary' onClick={() => onOpenPDF()}>กดเพื่อดาวน์โหลด หรือดูเอกสาร</Button>
                <Button variant='warning' onClick={() => onSubmitApproved()}>ส่งเอกสาร</Button>
            </div>
        )
    }
}
