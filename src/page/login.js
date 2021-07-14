import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import "./login.scss"
import { InputField } from '../components'

export default class Login extends Component {
    onLogin = () => {
        window.location.assign('/dashboard')
    }

    render() {
        return (
            <div>
                <Form>
                    <Row><Col><InputField label='รหัสประจำตัวนักเรียน/เจ้าหน้าที่' placeholder='รหัสประจำตัว' /></Col></Row>
                    <Row><Col><InputField label='รหัสผ่าน' placeholder='รหัสผ่าน' /></Col></Row>
                    <Row><Col xs={12}><Button variant="primary" onClick={() => this.onLogin()}>เข้าสู่ระบบ</Button></Col></Row>
                </Form>
            </div>
        )
    }
}
