import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export default class InputField extends Component {
    render() {
        let { type, label, placeholder } = this.props

        switch (type) {
            case "date":
                return (
                    <div>date</div>
                )
            default: return (
                <Form.Group>
                    <Form.Label><p className="primary_paragraph">{label}</p></Form.Label>
                    <Form.Control placeholder={placeholder} />
                </Form.Group>
            )
        }

    }
}
