import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import "./login.scss"
import { InputField } from '../components'
import { POST } from '../api'
import swal from 'sweetalert';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_no: "",
            id_card: "",
        }
    }
    render() {
        let { user_no, id_card } = this.state
        const onLogin = async () => {
            try {
                let res = await POST("/authen/login", { user_no: user_no, id_card: id_card })
                console.log("res", res)
                this.props.history.push({
                    pathname: '/dashboard',
                    state: { role_id: res.role_id, profile: res }
                })
            } catch (err) {
                swal({
                    title: "ผิดพลาด",
                    text: err,
                    icon: "warning",
                });
            }
        }

        const onChangeInput = ({ target: { name, value } }) => {
            this.setState({
                [name]: value
            })
        }

        return (
            <div>
                <Form> 
                    <Row><Col xs={6} md={4}><Image src="../../public/ms-icon-310x310.png" rounded /></Col></Row>
                    <Row><Col><InputField label='รหัสประจำตัวนักเรียน/เจ้าหน้าที่' placeholder='รหัสประจำตัว' name='user_no' value={user_no} onChange={onChangeInput} /></Col></Row>
                    <Row><Col><InputField label='รหัสผ่าน' textInputType='password' placeholder='รหัสผ่าน' name='id_card' value={id_card} onChange={onChangeInput} /></Col></Row>
                    <Row><Col xs={12}><Button variant="primary" onClick={() => onLogin()}>เข้าสู่ระบบ</Button></Col></Row>
                </Form>
            </div>
        )
    }
}
