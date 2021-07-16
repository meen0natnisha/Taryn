import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import SignatureCanvas from 'react-signature-canvas'

export default class InputField extends Component {
    render() {
        let { type, label, placeholder, name, value, onChange, options, textInputType, disabled, required } = this.props
        switch (type) {
            case "date":
                return (
                    <Form.Group>
                        <Form.Label><p className="primary_paragraph">{label}*</p></Form.Label>
                        <DatePicker placeholderText={placeholder} value={value} onChange={onChange} required disabled={disabled} />
                    </Form.Group>
                )
            case "select":
                return (
                    <Form.Group>
                        <Form.Label><p className="primary_paragraph">{label}*</p></Form.Label>
                        <Form.Control as="select" onChange={onChange} name={name} required value={value} required>
                            <option>{placeholder}</option>
                            {options.map((option, i) => <option value={option} key={i}>{option}</option>)}
                        </Form.Control>
                    </Form.Group>
                )
            case "textarea":
                return (
                    <Form.Group>
                        <Form.Label><p className="primary_paragraph">{label}*</p></Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder={placeholder}
                            style={{ height: '100px' }}
                            onChange={onChange}
                            required={required}
                        />
                    </Form.Group>
                )
            case "check":
                return (
                    <Form.Group>
                        <Form.Label><p className="primary_paragraph">{label}*</p></Form.Label>
                        <div>
                            {options.map((option, i) =>
                                <Form.Check key={i} inline type={'checkbox'} name={name} value={option} label={option} checked={value === option} onChange={onChange} />
                            )}
                        </div>
                        <Form.Control onChange={onChange} name={name} placeholder={placeholder} />
                    </Form.Group>
                )
            case "sign":
                return (
                    <Form.Group>
                        <Form.Label><p className="primary_paragraph">{label}*</p></Form.Label>
                        <div><SignatureCanvas canvasProps={{ className: 'SignCanvas'}} ref={onChange} /></div>
                    </Form.Group>
                )
            default: return (
                <Form.Group>
                    <Form.Label><p className="primary_paragraph">{label}*</p></Form.Label>
                    <Form.Control type={textInputType ? textInputType : ""} onChange={onChange} name={name} required value={value} placeholder={placeholder} disabled={disabled} />
                </Form.Group>
            )
        }

    }
}
