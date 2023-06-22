import React from 'react'
import "../Styles/Modal.css"
import {AiOutlineClose} from "react-icons/ai"

const Modal = ({children , setModalOpen}) => {

  return (
    <div className='modalMain'>
        <div onClick={()=>setModalOpen(previos=>!previos)} className='crossButton'>
        <AiOutlineClose />
        </div>
        {children}
    </div>
  )
}

export default Modal