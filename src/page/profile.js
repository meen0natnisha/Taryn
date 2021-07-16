import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { InputField } from '../components'

export default class Profile extends Component {

    componentDidMount = () => {
        console.log(window.location)
    }

    render() {
        return (
            <div>
                <h3 className="primary_paragraph">ข้อมูลส่วนตัว</h3>
                <Form>
                    <Row><Col><InputField label='ตำแหน่ง' placeholder='นักเรียน' /></Col></Row>
                    <Row><Col><InputField label='คำนำหน้า' placeholder='นาย/นาง/นางสาว' /></Col></Row>
                    <Row><Col><InputField label='ชื่อ-นามสกุล' placeholder='ชื่อ-นามสกุล' /></Col></Row>
                    <Row><Col><InputField label='หอพัก' placeholder='หอพัก' /></Col></Row>
                    <Row><Col xs={6}><InputField label='ยูนิต' placeholder='กรอกยูนิต' /></Col><Col xs={6}><InputField label='ห้องพัก' placeholder='เลขห้องพัก' /></Col> </Row>
                    <Row><Col><InputField label='ชั้นเรียน' placeholder='กรอกชั้นเรียน' /></Col></Row>
                    <Row><Col xs={6}><InputField label='ที่อยู่บ้านเลขที่' placeholder='ที่อยู่บ้านเลขที่' /></Col><Col xs={6}><InputField label='หมู่' placeholder='กรอกหมู่' /></Col> </Row>
                </Form>
            </div>
        )
    }

}