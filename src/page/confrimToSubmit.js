import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class ConfrimToSubmit extends Component {
    render() {

        const onGoBack = () => {
            this.props.history.goBack()
        }

        return (
            <div>
                <div onClick={() => onGoBack()}><ion-icon name="chevron-back-outline" id="icon-btn"></ion-icon></div>
                <h3 className="primary_paragraph">ยืนยันใบลา</h3>
                <Button variant='primary'>กดเพื่อดาวน์โหลด หรือดูเอกสาร</Button>
            </div>
        )
    }
}
