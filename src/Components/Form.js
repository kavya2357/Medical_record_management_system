import * as config from "./library/config.json";
import React, { useEffect, useState } from "react";
import { getValue, update } from "./library/interact";
import { connectWalletBeacon, setup } from "./library/connect";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import './Form.css'

const Styles = styled.div`
 background: lavender;
 padding: 20px;

 h1 {
   border-bottom: 1px solid white;
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 5px;
   text-align: center;
 }

 form {
   background: white;
   border: 1px solid #dedede;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 550px;
   padding: 30px 50px;
 }

 input {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
 }

 label {
   color: #3d3d3d;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 5px;
 }

 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 30px;
 }

 .submitButton {
   background-color: #6976d9;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 20px 0px;
`;
 const Form = () => {
  const [Tezos, setTezos] = useState(undefined);
  const [status, setStatus] = useState("No Operations Performed");
  const [value, setValue] = useState(0);
  const [loader, setLoader] = useState(true);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    console.log("run");
    setup().then(setTezos).catch(console.error);
  }, []);

  useEffect(() => {
    if (Tezos === undefined) return;
    getValue(Tezos)
      .then(setValue)
      .then(() => setLoader(false))
      .catch(console.error);
    const timer = setInterval(() => {
      getValue(Tezos).then(setValue).catch(console.error);
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [Tezos]);

  const handleEvent = async (e, func, params) => {
    e.preventDefault();
    try {
      const wal = await connectWalletBeacon();
      Tezos.setWalletProvider(wal);
      setLoader(true);
      await func(Tezos, params, setStatus);
      await getValue(Tezos)
        .then(setValue)
        .then(() => setLoader(false));
    } catch (err) {
      console.error(err);
      alert("Couldn't connect wallet");
    }
  };

  return (
    <div className="App">
     <h1 style={{fontSize:'26px'}}>HealthLog.</h1>
      <Styles>
      <form
        onSubmit={async (e) => {
          await handleEvent(e, update,
        {
          fname:e.target.fname.value,
          lname:e.target.lname.value,
          insuranceNum: e.target.insuranceNum.value,
          aadhar:e.target.aadhar.value,
          gender: e.target.gender.value,
          age: e.target.age.value,
          PhoneNumber: e.target.PhoneNumber.value,
          dname:e.target.dname.value,
          address: e.target.address.value,
          city: e.target.city.value,
          state: e.target.state.value,
          zip: e.target.zip.value,
          doa: e.target.doa.value,
          history: e.target.history.value,
          diagnosis: e.target.diagnosis.value,
        }
            );
        }}
      >
        <b style={{marginBottom:'20px',textDecoration:'underline'}}>Patient Information :</b>
          <div className="names">
            <div style={{width:'250px'}}>
              <label>First Name : </label>
              <input type="text" name="fname" step="1" />
            </div>
            
            <div style={{width:'250px'}}>
              <label>Last Name : </label>
              <input type="text" name="lname" step="1" />
            </div>
            
          </div>

          <div>
              <label>Gender : </label>
              <input type="text" name="gender" step="1" /><br></br>
          </div>

          <div>
            <label> Age : </label>
            <input type="text" name="age" step="1" />
          </div>
          
          <div>
            <label>Phone : </label>
            <input type="text" name="PhoneNumber" step="1" />
          </div>

          <div>
              <label>Insurance Number : </label>
              <input type="text" name="insuranceNum" step="1" style={{margin:'0px'}}/>
          </div>
          
          <div>
              <label>HealthCard Number : </label>
              <input type="text" name="aadhar" step="1" /><br></br>
          </div>

          <div>
            <div>
                <label>Street Adress:</label>
                <input type="text" name="address" step="1"/>
            </div>
            
            <div className="address">
              <div style={{margin:'3px'}}>
                <label>City/Town:</label>
                <input type="text" name="city" step="1"/>
                
              </div>
              <div style={{margin:'3px'}}>
                <label>State/Province:</label>
                <input type="text" name="state" step="1"/>
              </div>
              <div style={{margin:'3px'}}>
                <label>Zip/Postal code:</label>
                <input type="text" name="zip" step="1"/>
              </div>
                
            </div>
          </div>
          <br/>
          <b style={{marginBottom:'20px',textDecoration:'underline'}}>Doctor Information :</b>

          <div>
            <label>Doctor Name:</label>
            <input type='text' name="dname" step='1'/>
          </div>

          <div>
            <label>Date of Appointment : </label>
            <input type="text" name="doa" step="1"  />
          </div>
          <br/>
          <b style={{marginBottom:'20px',textDecoration:'underline'}}>Patient Medical Information :</b>
          
          <div>
            <label>Patient's Medical History :</label>
            <input type='text' name="history" step='1'/>
          </div>

          <div>
            <label>Diagnosis : </label>
            <input type="text" name="diagnosis" step="1"  />
          </div>
          
          <input type="submit" value="Submit" />
      </form>
      </Styles>
      
    </div>
  );
};

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        display: "block",
        marginTop: "3vw",
        marginBottom: "-1vw",
      }}
      width="3vw"
      height="3vw"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Form;