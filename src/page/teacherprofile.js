import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { InputField } from '../components'

export default class Profile extends Component {
    render() {
        return (
            <div>
                <h3 className="primary_paragraph">ข้อมูลส่วนตัว</h3>
                <Form>
                    <Row><Col><InputField label='ตำแหน่ง' placeholder='คุณครูประจำวิชา' /></Col></Row>
                    <Row><Col><InputField label='คำนำหน้า' placeholder='นาย/นาง/นางสาว' /></Col></Row>
                    <Row><Col><InputField label='ชื่อ-นามสกุล' placeholder='ชื่อ-นามสกุล' /></Col></Row>
                </Form>
            </div>
        )
    }

}