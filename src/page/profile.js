import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { InputField } from '../components'
import { GET } from '../api'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role_id: "",
            profile: {}
        }
    }

    checkAuth = async () => {
        try {
            let profile = await GET('/authen/check')
            this.setState({ profile })
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount = () => {
        let { role_id } = this.state
        this.checkAuth()
        if (this.props.location.state) {
            role_id = this.props.location.state.role_id
        }
        this.setState({ role_id })
    }


    render() {
        let { role_id, profile } = this.state
        const onGoBack = () => {
            this.props.history.goBack()
        }
        const onLogout = async () => {
            try {
                await GET('/authen/logout')
                this.props.history.push({
                    pathname: '/login',
                })
            } catch (err) {
                console.log(err)
            }
        }
        const renderStudentField = () => {
            return (
                <>
                    <Form>
                        <Row><Col><InputField label='ตำแหน่ง' placeholder='ตำแหน่ง' value={profile?.role_name} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='คำนำหน้า' placeholder='นาย/นาง/นางสาว' value={profile?.prefix} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='ชื่อ-นามสกุล' placeholder='ชื่อ-นามสกุล' value={profile?.name} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='หอพัก' placeholder='หอพัก' value={profile?.dome} disabled={true} /></Col></Row>
                        <Row>
                            <Col xs={6}><InputField label='ยูนิต' placeholder='กรอกยูนิต' value={profile?.unit} disabled={true} /></Col>
                            <Col xs={6}><InputField label='ห้องพัก' placeholder='เลขห้องพัก' value={profile?.dome_no} disabled={true} /></Col>
                        </Row>
                        <Row><Col><InputField label='ชั้นเรียน' placeholder='กรอกชั้นเรียน' value={profile?.class} disabled={true} /></Col></Row>
                        <Row>
                            <Col xs={6}><InputField label='ที่อยู่บ้านเลขที่' placeholder='ที่อยู่บ้านเลขที่' value={profile?.dome} disabled={true} value={profile?.adress} disabled={true} /></Col>
                            <Col xs={6}><InputField label='หมู่' placeholder='กรอกหมู่' value={profile?.moo} disabled={true} /></Col>
                        </Row>
                        <Row><Col><InputField label='ถนน' placeholder='ถนน' value={profile?.road} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='จังหวัด' placeholder='จังหวัด' value={profile?.provine} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='อำเภอ' placeholder='อำเภอ' value={profile?.district} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='ตำบล' placeholder='ตำบล' value={profile?.sub_district} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='ไปรษณีย์' placeholder='ไปรษณีย์' value={profile?.zipcode} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='โทรศัพท์' placeholder='โทรศัพท์' value={profile?.phone} disabled={true} /></Col></Row>
                    </Form>
                </>
            )
        }

        const renderTeacherField = () => {
            return (
                <>
                    <Form>
                        <Row><Col><InputField label='ตำแหน่ง' placeholder='คุณครูประจำวิชา' value={profile?.role_name} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='คำนำหน้า' placeholder='นาย/นาง/นางสาว' value={profile?.prefix} disabled={true} /></Col></Row>
                        <Row><Col><InputField label='ชื่อ-นามสกุล' placeholder='ชื่อ-นามสกุล' value={profile?.name} disabled={true} /></Col></Row>
                    </Form>
                </>
            )
        }

        return (
            <div>
                <div onClick={() => onGoBack()}><ion-icon name="chevron-back-outline" id="icon-btn"></ion-icon></div>
                <h3 className="primary_paragraph">ข้อมูลส่วนตัว</h3>
                {role_id === 7
                    ? renderStudentField()
                    : renderTeacherField()
                }
                <Button variant='warning' className="mb-5" onClick={() => onLogout()}>ออกจากระบบ</Button>
            </div>
        )
    }

}