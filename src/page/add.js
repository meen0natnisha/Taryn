import React, { Component } from 'react'
import { InputField } from '../components'
import { Col, Row, Button, Form } from 'react-bootstrap'
import moment from 'moment-timezone'
import swal from 'sweetalert';

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leave: {},
            role_id: "",
            validated: false,
            date_start: "",
            date_end: ""
        }
    }

    componentDidMount = () => {
        let { role_id } = this.state
        if (this.props.location.state) {
            role_id = this.props.location.state.role_id
        }
        this.setState({ role_id })
    }
    render() {
        let { userSigPad, parentSigPad, appSigPad } = {}
        let { leave, role_id, validated, date_start, date_end } = this.state

        const onChangeInput = ({ target: { name, value } }) => {
            let { leave } = this.state
            leave[name] = value
            this.setState({ leave })
        }

        const onSelectDate = (name, date) => {
            leave[name] = moment(date).format("yyyy-MM-DD")
            if (name === "date_start") {
                this.setState({ date_start: moment(date).format("DD/MM/yyyy")})
            } else if(name === "date_end") {
                this.setState({ date_end: moment(date).format("DD/MM/yyyy")})
            }
            this.setState({ leave })
        }

        const onChangeInputArea = (name, { target: { value }} ) => {
            leave[name] = value
            this.setState({ leave })
        }

        const onSign = () => {
            leave["user_sign"] = userSigPad.getTrimmedCanvas().toDataURL()
            leave["parent_sign"] = parentSigPad.getTrimmedCanvas().toDataURL()
            this.setState({ leave })
        }

        const onGoBack = () => {
            this.props.history.goBack()
        }

        const handleStudentSubmit = () => {
            if ( leave.class_code && userSigPad && parentSigPad) {
                onSign()
                this.setState({ validated: true })
                console.log("Add ", leave)
                this.props.history.push({
                    pathname: '/confirm'
                })
            } else {
                swal({
                    title: "ผิดพลาด",
                    text: "กรุณากรอกข้อมูลให้ครบ",
                    icon: "warning",
                });
            }
        }

        const renderAdd = () => {
            return (
                <Form validated={validated} >
                    <Row><Col><InputField type='select' label='ประเภทใบลา' placeholder='เลือกประเภทใบลา' name='type' value={leave.type} onChange={onChangeInput} options={['ลากิจ', 'ลาป่วย']} /></Col></Row>
                    <Row><Col><InputField label='รหัสวิชา' placeholder='กรอกรหัสวิชา' name='class_code' value={leave.class_code} onChange={onChangeInput} /></Col></Row>
                    <Row><Col><InputField type='textarea' label='เหตุผล' placeholder='กรอกเหตุผล' name='note' value={leave.note} onChange={(value) => onChangeInputArea("note", value)} /></Col></Row>
                    <Row><Col><InputField type='date' label='วันที่เริ่มการลา' placeholder='เลือกวันที่' name='date_start' value={date_start} onChange={(date) => onSelectDate('date_start', date)} /></Col></Row>
                    <Row><Col><InputField type='date' label='วันที่สิ้นสุดการลา' placeholder='เลือกวันที่' name='date_end' value={date_end} onChange={(date) => onSelectDate('date_end', date)} /></Col></Row>
                    <Row><Col><InputField type='check' label='พักอยู่กับ' placeholder='อื่นๆ ระบุ' name='live_with' value={leave.live_with} onChange={onChangeInput} options={['บิดา', 'มารดา']} /></Col></Row>
                    <Row><Col><InputField type='sign' label='ลายเซ็นนักเรียน' onChange={(ref) => { userSigPad = ref }} /></Col></Row>
                    <Row><Col><InputField label='ชื่อ-นามสกุล ผู้ปกครอง' placeholder='กรอกชื่อ-นามสกุล ผู้ปกครอง' name='parent' value={leave.parent_name} onChange={onChangeInput} /></Col></Row>
                    <Row><Col><InputField type='sign' label='ลายเซ็นผู้ปกครอง' onChange={(ref) => { parentSigPad = ref }} /></Col></Row>
                    <Row><Col xs={12}><Button variant="primary" onClick={() => handleStudentSubmit()}>เพิ่มใบลา</Button></Col></Row>
                </Form>
            )
        }


        return (
            <div>
                <div onClick={() => onGoBack()}><ion-icon name="chevron-back-outline" id="icon-btn"></ion-icon></div>
                <h3 className="primary_paragraph">เพิ่มใบลา</h3>
                {role_id === "1"
                    ? renderAdd() :
                    <></>
                }

            </div>
        )
    }
}
