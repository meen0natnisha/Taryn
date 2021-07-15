import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { BoxContainer } from '../components'

export default class Dashboard extends Component {

    onAdd = () => {
        window.location.assign(`/add`)
    }

    render() {
        const unapprovedArr = [
            { title: "วิชา 340000", status: "สถานะ: รอครูประจำวิชาอนุมัติ" },
            { title: "วิชา 341000", status: "สถานะ: รอครูประจำวิชาอนุมัติ" },
        ]
        const approvedArr = [
            { title: "วิชา 110000", status: "ดาวน์โหลดเอกสารใบลา" },
        ]
        return (
            <div>
                <ion-icon name="person" id="icon-btn"></ion-icon>
                <h3 className="primary_paragraph">คำขอที่ยังไม่อนุมัติ</h3>
                {unapprovedArr.map((list, i) => (
                    <BoxContainer title={list.title} status={list.status} style="unapproved" />
                ))}

                <h3 className="primary_paragraph">คำขอที่อนุมัติสำเร็จ</h3>
                {approvedArr.map((list, i) => (
                    <BoxContainer title={list.title} status={list.status} style="approved" />
                ))}

                <Button variant="primary" onClick={() => this.onAdd()} >+ เพิ่มใบลา</Button>
            </div>
        )
    }
}