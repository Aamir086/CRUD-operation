import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import address from '../images/address_home-icon.svg'
import axios from 'axios';
// import Lottie from 'lottie-react'
// import phone_icon from '../images/phonegif.gif'
// import phone_icon from '../images/phone.json'
// import { FcBusinessContact } from "react-icons/fc";

const Contact = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' });

  const callContactPage = async () => {
    try {
      const response = await axios.get('/getdata')
      // const res = await fetch('/getdata', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'appllication/json'
      //   },
      // });
      // console.log("result found as ", res);
      // const data = await res.json()
      const data = response.data
      // console.log(data);
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      if (!response.status === 200) {
        const error = new Error(response.statusText)
        throw error
      }

    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(() => {
    callContactPage();
  }, [])

  // storing data in states

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData({ ...userData, [name]: value })
  }

  // send data to backend 
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, email, phone, message
        })
      });

      const data = await res.json();

      if (!data) {
        console.log('message not send');
      } else {
        window.alert('Message sent successfully')
        setUserData({ ...userData, message: '' })
      }

    } catch (error) {
      console.log(error);
    }

  }

  return (<>
    <div className='contact_info'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 d-flex justify-content-between gap-3 my-4'>
            <div className='contact_info_item d-flex justify-content-start align-items-center gap-3'>
              {/* <img src={phone_icon} alt="phone" /> */}
              {/* <Lottie animationData={phone_icon} className='phone' /> */}
              {/* <FcBusinessContact /> */}
              <i className="zmdi zmdi-smartphone-android contact_phone"></i>
              <div className='contact_info_content'>
                <div className='contact_infoe_title fw-bold'>
                  Phone
                </div>
                <div className='contact_info_text'>
                  {userData.phone}
                </div>
              </div>
            </div>
            <div className='contact_info_item d-flex justify-content-start align-items-center gap-3'>
              <i className="zmdi zmdi-email-open contact_email"></i>
              <div className='contact_info_content'>
                <div className='contact_infoe_title fw-bold'>
                  Email
                </div>
                <div className='contact_info_text'>
                  {userData.email}
                </div>
              </div>
            </div>
            <div className='contact_info_item d-flex justify-content-start align-items-center gap-3'>
              <img src={address} alt="adress" className='contact_address' />
              <div className='contact_info_content'>
                <div className='contact_infoe_title fw-bold'>
                  Address
                </div>
                <div className='contact_info_text'>
                  123,gorewada,Nagpur 440013
                  {/* {userData.address} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='contact_form'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 mx-auto'>
            <div className='contact_form_container py-5 px-5'>
              <div className='contact_form_tittle fw-bold mb-4'>
                <h3>Get In Touch</h3>
              </div>
              <form method='POST' id='contact_form'>
                <div className='contact_form_name d-flex justify-content-between align-items-center'>
                  <input type="text" id='contact_form_name' className='input_f' name='name' value={userData.name} onChange={handleInputs} placeholder='Your Name' required={true} />

                  <input type="email" id='contact_form_email' className='input_f' name='email' value={userData.email} onChange={handleInputs} placeholder='Your Email' required={true} />

                  <input type="number" id='contact_form_phone' className='input_f' name='phone' value={userData.phone} onChange={handleInputs} placeholder='Your Phone' required={true} />
                </div>

                <div className='contact_form_text mt-5'>
                  <textarea className="text_feild contact_form_message" name='message' value={userData.message} onChange={handleInputs} placeholder='Message' cols="30" rows="5"></textarea>
                </div>

                <div className='contact_form_btn'>
                  <button type='submit' className='button contact_form_submit_btn mt-4 btn btn-primary' onClick={contactForm}>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Contact
