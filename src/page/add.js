import React, { Component } from 'react'
import { InputField } from '../components'
import { Col, Row, Button, Form } from 'react-bootstrap'
import moment from 'moment-timezone'

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leave: {}
        }
    }
    render() {
        let { leave } = this.state
        const onChangeInput = ({ target: { name, value } }) => {
            let { leave } = this.state
            leave[name] = value
            this.setState({ leave })
        }

        const onSelectDate = (name, date) => {
            let { leave } = this.state
            leave[name] = moment(date).format("DD/MM/yyyy")
            this.setState({ leave })
        }

        const onGoBack = () => {
            this.props.history.goBack()
        }

        console.log(this.state.leave)
        return (
            <div>
                <div onClick={() => onGoBack()}><ion-icon name="chevron-back-outline" id="icon-btn"></ion-icon></div>
                <h3 className="primary_paragraph">เพิ่มใบลา</h3>
                <Form validated >
                    <Row><Col><InputField type='select' label='ประเภทใบลา' placeholder='เลือกประเภทใบลา' name='type' value={leave.type} onChange={onChangeInput} options={['ลากิจ', 'ลาป่วย']} /></Col></Row>
                    <Row><Col><InputField label='รหัสวิชา' placeholder='กรอกรหัสวิชา' name='class_code' value={leave.class_code} onChange={onChangeInput} /></Col></Row>
                    <Row><Col><InputField type='textarea' label='เหตุผล' placeholder='กรอกเหตุผล' name='note' value={leave.note} onChange={onChangeInput} /></Col></Row>
                    <Row><Col><InputField type='date' label='วันที่เริ่มการลา' placeholder='เลือกวันที่' name='start_date' value={leave.start_date} onChange={(date) => onSelectDate('start_date', date)} /></Col></Row>
                    <Row><Col><InputField type='date' label='วันที่สิ้นสุดการลา' placeholder='เลือกวันที่' name='end_date' value={leave.end_date} onChange={(date) => onSelectDate('end_date', date)} /></Col></Row>
                    <Row><Col><InputField type='check' label='พักอยู่กับ' placeholder='อื่นๆ ระบุ' name='stay' value={leave.stay} onChange={onChangeInput} options={['บิดา', 'มารดา']} /></Col></Row>
                    <Row><Col><InputField type='sign' label='ลายเซ็นนักเรียน' /></Col></Row>
                    <Row><Col><InputField label='ชื่อ-นามสกุล ผู้ปกครอง' placeholder='กรอกชื่อ-นามสกุล ผู้ปกครอง' name='parent' value={leave.class_code} onChange={onChangeInput} /></Col></Row>
                    <Row><Col><InputField type='sign' label='ลายเซ็นผู้ปกครอง' /></Col></Row>
                    <Row><Col xs={12}><Button variant="primary" type="submit" onClick={() => console.log(this.state.leave)}>เพิ่มใบลา</Button></Col></Row>
                </Form>

            </div>
        )
    }
}
