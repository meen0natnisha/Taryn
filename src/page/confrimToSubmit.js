import React, { Component } from 'react'
import { Button, Spinner, Row } from 'react-bootstrap'
import { POST, ip } from '../api'
import axios from 'axios'

export default class ConfrimToSubmit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leave: {},
            role_id: "",
            profile: "",
            leave_id: this.props.location.state.leave_id,
            loading: true,
            fileURL: "",
        }
    }
    handlePDF = async () => {
        let { leave_id } = this.state
        console.log("leave_id ", leave_id)
        await axios.post(`${ip}/leave/create_pdf`,
            { leave_id: leave_id },
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
            this.setState({ fileURL })
            this.setState({ loading: false })
        })
    }

    fetchData = () => {
        let { role_id, profile, fileURL } = this.state
        if (this.props.location.state) {
            role_id = this.props.location.state.role_id
            profile = this.props.location.state.profile
            // leave_id = this.props.location.state.leave_id
        }
        this.setState({ role_id, profile })
    }

    componentDidMount = () => {
        if (this.props.location.state.profile) {
            this.fetchData()
        }
        if (this.props.location.state.leave_id) {
            this.handlePDF()
        }
    }

    render() {
        let { role_id, profile, loading, fileURL, leave_id } = this.state
        const onGoBack = () => {
            this.props.history.goBack()
        }

        const onOpenPDF = () => {
            window.open(fileURL);
        }

        const onSubmitApproved = () => {
            this.props.history.push({
                pathname: '/dashboard',
                state: { role_id: role_id, profile: profile }
            })
        }

        const onCancel = async () => {
            try {
                await POST('/leave', { "leave_id": leave_id })
                this.props.history.push({
                    pathname: '/dashboard',
                    state: { role_id: role_id, profile: profile }
                })
            } catch (err) {
                console.log(err)
            }
        }

        return (
            <div>
                <div onClick={() => onGoBack()}><ion-icon name="chevron-back-outline" id="icon-btn"></ion-icon></div>
                <h3 className="primary_paragraph">ยืนยันใบลา</h3>
                {loading
                    ? <Row><Button variant='primary' disabled onClick={() => onOpenPDF()}><Spinner animation="grow" variant="light" size="sm" /> กดเพื่อดาวน์โหลด หรือดูเอกสาร</Button></Row>
                    : <Row><Button variant='primary' onClick={() => onOpenPDF()}>กดเพื่อดาวน์โหลด หรือดูเอกสาร</Button></Row>}
                <Row><Button variant='success' onClick={() => onSubmitApproved()}>ส่งเอกสาร</Button></Row>
                <Row><Button variant='warning' onClick={() => onCancel()}>ยกเลิก</Button></Row>
            </div>
        )
    }
}
