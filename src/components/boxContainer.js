import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class BoxContainer extends Component {
    render() {
        let { type, title, status, style, onClick} = this.props
        switch (type) {
            case "teacher":
                return (
                    <div className={style === "unapproved" ? "Box-container unapp" : "Box-container app"} >
                    <div className="p-4">
                        <strong>{title}</strong>
                        <p>{status}</p>
                        { style === "unapproved" && <Button variant='warning' onClick={onClick}>จัดการใบลา</Button>}
                    </div>
                </div>
                )
            default:
                return (
                    <div className={style === "unapproved" ? "Box-container unapp" : "Box-container app"} >
                        <div className="p-4">
                            <strong>{title}</strong>
                            <p>{status}</p>
                        </div>
                    </div>
                )
        }
    }
}
