import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

const Home = () => {

  const [userName, setuserName] = useState();
  const [show, setShow] = useState(false);

  const callHomePage = async () => {
    try {
      const response = await axios.get('/getdata')
      // const res = fetch('/getdata', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'appllication/json'
      //   },
      // });
      // console.log("result found as ", res);
      const data = response.data
      // console.log(data);
      setuserName(data.name);
      setShow(true)

      if (!response.status === 200) {
        const error = new Error(response.statusText)
        throw error
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callHomePage();
  }, [])

  return (<>
    <div className='home-page position-absolute top-50 start-50 translate-middle'>
      <div className='home-div d-flex justify-content-center align-items-center'>
        <p className='m-0 fw-bold welcome'>WELCOME</p>
        <h1>{userName}</h1>
        <h2 className='m-0'>{show ? 'Hi welcome back' : 'Hey please log in'}</h2>
      </div>
    </div>
  </>)
}

export default Home
