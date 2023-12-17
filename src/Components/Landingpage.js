import React from 'react'
import './Landingpage.css'
import {Link} from 'react-router-dom'
import Landingimg from './MedicalImg.svg'
function Landingpage() {
  return (
    <div className='main'>
      <div className='image'>
        <img src={Landingimg} alt="abc" />
      </div>

      <div className='title'>
        <p style={{fontWeight:'2500',fontSize:'60px',marginBottom:'0px'}}><b>Secure Medical Records on Blockchain.</b></p>
        <p>
        <span style={{fontWeight:'1000',fontSize:'30px',color:'rgb(8 145 178)'}}>Your Health, </span>
        <span style={{fontWeight:'1000',fontSize:'30px',color:'rgb(15 118 110)'}}>Your Control. </span>
        </p>
        
        <Link to='Form'>
            <button style={{fontWeight:'bold',fontSize:'20px',padding:'10px',marginBottom:'10px',marginTop:'30px'}}>Save Medical Records</button>
        </Link>

      </div>
    </div>
  )
}

export default Landingpage