import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { BoxContainer } from '../components'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role_id: this.props.location.state.role_id,
            unapprovedArr: [
                { title: "วิชา 340000", status: "สถานะ: รอครูประจำวิชาอนุมัติ" },
                { title: "วิชา 341000", status: "สถานะ: รอครูประจำวิชาอนุมัติ" },
            ],
            approvedArr: [
                { id: 0, title: "วิชา 110000", status: "ดาวน์โหลดเอกสารใบลา" },
            ]
        }
    }

    render() {

        let { role_id, unapprovedArr, approvedArr } = this.state

        const onProfileIcon = () => {
            this.props.history.push({
                pathname: '/profile',
                state: { role_id: role_id, id: "000001" }
            })
        }

        const onAdd = () => {
            this.props.history.push({
                pathname: '/add',
                state: { role_id: role_id }
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
                        <BoxContainer type='teacher' title={list.title} status={list.status} style="unapproved" />
                    ))}

                    <h3 className="primary_paragraph">คำขอที่อนุมัติสำเร็จ</h3>
                    {approvedArr.map((list, i) => (
                        <BoxContainer type='teacher' title={list.title} status={list.status} style="approved" />
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
