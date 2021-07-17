import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { BoxContainer } from '../components'
import { GET, POST, ip } from '../api'
import axios from 'axios'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role_id: this.props.location.state.role_id,
            profile: this.props.location.state.profile,
            unapprovedArr: [],
            approvedArr: [],
            loading: true,
        }
    }

    fetchData = async () => {
        let unApp
        let app
        try {
            if (this.state.role_id != 7) {
                let data = await POST('/leave/to_app')
                unApp = data
            } else {
                let res = await GET('/leave/my')
                let data = res.filter((e) => e.status === "รออนุมัติ")
                let completeData = res.filter((e) => e.status === "อนุมัติ")
                unApp = data
                app = completeData
            }
            this.setState({
                unapprovedArr: unApp,
                approvedArr: app
            })
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    render() {
        let { role_id, profile, unapprovedArr, approvedArr, loading } = this.state

        const onProfileIcon = () => {
            this.props.history.push({
                pathname: '/profile',
                state: { role_id: role_id, profile: profile }
            })
        }

        const onAdd = () => {
            this.props.history.push({
                pathname: '/add',
                state: { role_id: role_id, profile: profile }
            })
        }

        const onApprove = (id) => {
            this.props.history.push({
                pathname: '/add',
                state: { role_id: role_id, leave_id: id }
            })
        }

        const handlePDF = async (leave_id) => {
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
                this.setState({ loading: false })
                window.open(fileURL)
            })
        }

        const renderStudentField = () => {
            return (
                <>
                    <h3 className="primary_paragraph">คำขอที่ยังไม่อนุมัติ</h3>
                    {unapprovedArr.length != 0 ?
                        unapprovedArr.map((list, i) => (
                            <BoxContainer key={i} title={`วิชา${list.class_code}`} status={list.status} style="unapproved" />
                        ))
                        : <p className="secondary_paragraph">ไม่พบคำร้อง</p>}

                    <h3 className="primary_paragraph">คำขอที่อนุมัติสำเร็จ</h3>
                    {approvedArr.length != 0
                        ? approvedArr.map((list, i) => (
                            < BoxContainer key={i} title={`วิชา${list.class_code}`} status={list.status} style="approved" onClick={() => handlePDF(list.leave_id)} />
                        ))
                        : <p className="secondary_paragraph">ไม่พบคำร้อง</p>}

                    <Button variant="primary" onClick={() => onAdd()} >+ เพิ่มใบลา</Button>
                </>
            )
        }

        const renderTeacherField = () => {
            return (
                <>
                    <h3 className="primary_paragraph">คำขอที่ยังไม่อนุมัติ</h3>
                    {unapprovedArr.length != 0 ?
                        unapprovedArr.map((list, i) => (
                            <BoxContainer key={i} type='teacher' title={`วิชา${list.class_code}`} status={list.status} style="unapproved" onClick={() => onApprove(list.leave_id)} />
                        ))
                        : <p className="secondary_paragraph">ไม่พบคำร้อง</p>}

                    {/* <h3 className="primary_paragraph">คำขอที่อนุมัติสำเร็จ</h3>
                    {approvedArr.map((list, i) => (
                        <BoxContainer key={i} type='teacher' title={list.title} status={list.status} style="approved" />
                    ))} */}
                </>
            )
        }

        return (
            <div>
                <div onClick={() => onProfileIcon()}><ion-icon name="person" id="icon-btn" ></ion-icon></div>
                {role_id === 7
                    ? renderStudentField()
                    : renderTeacherField()
                }
            </div>
        )
    }
}
