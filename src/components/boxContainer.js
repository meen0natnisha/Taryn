import React, { Component } from 'react'

export default class BoxContainer extends Component {
    render() {
        let { title, status, style } = this.props
        return (
            <div className={style == "unapproved" ? "Box-container unapp": "Box-container app"} >
                <div className="p-4">
                    <strong>{title}</strong>
                    <p>{status}</p>
                </div>
            </div>
        )
    }
}
