import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { BoxContainer } from '../components'
import { GET, POST } from '../api'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role_id: this.props.location.state.role_id,
            profile: this.props.location.state.profile,
            unapprovedArr: [
                { title: "วิชา 340000", status: "สถานะ: รอครูประจำวิชาอนุมัติ" },
                { title: "วิชา 341000", status: "สถานะ: รอครูประจำวิชาอนุมัติ" },
            ],
            approvedArr: [
                { id: 0, title: "วิชา 110000", status: "ดาวน์โหลดเอกสารใบลา" },
            ]
        }
    }
    fetchData = async() => {
        try {
            let res = await POST('/leave/to_app', {role_id: 1})
            console.log(res)
        } catch(err) {
            console.log(err)
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    render() {
        let { role_id, profile, unapprovedArr, approvedArr } = this.state
        console.log(this.props.location.state.role_id)

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

        const renderStudentField = () => {
            return (
                <>
                    <h3 className="primary_paragraph">คำขอที่ยังไม่อนุมัติ</h3>
                    {unapprovedArr.map((list, i) => (
                        <BoxContainer key={i} title={list.title} status={list.status} style="unapproved" />
                    ))}

                    <h3 className="primary_paragraph">คำขอที่อนุมัติสำเร็จ</h3>
                    {approvedArr.map((list, i) => (
                        <BoxContainer key={i} title={list.title} status={list.status} style="approved" />
                    ))}

                    <Button variant="primary" onClick={() => onAdd()} >+ เพิ่มใบลา</Button>
                </>
            )
        }

        const renderTeacherField = () => {
            return (
                <>
                    <h3 className="primary_paragraph">คำขอที่ยังไม่อนุมัติ</h3>
                    {unapprovedArr.map((list, i) => (
                        <BoxContainer key={i} type='teacher' title={list.title} status={list.status} style="unapproved" onClick={() => onAdd()} />
                    ))}

                    <h3 className="primary_paragraph">คำขอที่อนุมัติสำเร็จ</h3>
                    {approvedArr.map((list, i) => (
                        <BoxContainer key={i} type='teacher' title={list.title} status={list.status} style="approved" />
                    ))}
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
