import React from 'react'
import { NavLink } from 'react-router-dom'

const Erorr_page = () => {
    // const error = () => {
        console.log("error");
    // }
  return (<>
  <div id='notfound'>
    <div className='notfound'>
        <div className='notfound-404'>
            <h1>404</h1>
        </div>
        <h2>We are sorry, page not found!</h2>
        <p className='mb-5'>
            The page you are looking might have been removed
        </p>
        <NavLink to='/'>Back To Homepage</NavLink>
    </div>
  </div>
  </>)
}

export default Erorr_page
