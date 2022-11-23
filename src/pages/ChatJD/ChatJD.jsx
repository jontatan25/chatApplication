import React from 'react'
import Chat from '../../components/Chat/Chat'
import "./style.css"


const ChatJD = () => {
  return (
    <div className="chat__container -flex">

        <div className="chat__window">
            <div className="chat__window__title -title -flex">Chat</div>
          <Chat/>
        </div>
        <div className="chat__users"></div>
    </div>
  )
}

export default ChatJD