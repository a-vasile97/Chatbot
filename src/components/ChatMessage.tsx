import React from "react"

export const ChatMessage = (props) => {
    return (
        <div className="chat-message">
            <div className="chat-message-title">{props.message}</div>
            {props.data && props.data.map((value) => {
                return (
                <div className="chat-message-item" key={value.code} onClick={() => {props.selectNext(value)}}>{value[props.field]}</div>
                )
            })}
            {props.isActive &&
            <div>
                {props.reset && <div className="chat-message-item" onClick={() => {props.reset({})}}>Main menu</div>}
                {props.goBack && <div className="chat-message-item" onClick={() => {props.goBack({})}}>Go Back</div>}
            </div>
            }
            
        </div>
    )
}