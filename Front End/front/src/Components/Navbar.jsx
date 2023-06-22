import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiBell, FiPlus } from 'react-icons/fi';
import { IoMdPerson } from 'react-icons/io';
import Menu from './Menu';
import {Link} from "react-router-dom"


const Navbar = (props) => {
  const [showMenu ,setshowMenu ]=useState(false);

  
  return (
    <nav className='navbar'>

        <div className="left">
            <input type="text"  placeholder='Search for the name'onChange={(e)=>{props.setquery(e.target.value)}} on/>
        </div>
<div className="center">
    <h2><Link to="/">Home</Link></h2>
</div>

<div className="right">

<div className="rightIcons"  onMouseEnter={()=>setshowMenu(true)} onMouseLeave={()=>setshowMenu(false)}>
    

    <IoMdPerson id='person' />

    <IoMdArrowDropdown style={{height:'50px'}}/>
    {showMenu&& <Menu setModalOpen={props.setModalOpen}  setshowMenu={setshowMenu}/>}
</div>
</div>

    </nav>
  )
}

export default Navbar