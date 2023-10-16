import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import login_img from '../images/sec_login/data.json'
import Lottie from 'lottie-react';
import { userContext } from '../App';
import axios from 'axios';
// import { FaSquareFacebook, FaSquareTwitter } from "react-icons/fa6";
// import { ImGoogle2 } from "react-icons/im";
// import login from './login.json';

const Login = () => {

  const { state, dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post('/signin', {
      email, password
    })
    // const res = await fetch('/signin', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email, password
    //   })
    // })
    const data = res.data
    console.log(data);
    if (res.status === 400 || !data) {
      window.alert('Invalid credentials')
    } else {
      dispatch({ type: 'USER', payload: true })
      window.alert('login successfull')
    }

    navigate('/');
  }

  return (<>
    <div className='signin position-absolute top-50 start-50 translate-middle'>
      <div className='container mt-5'>
        <div className='signin-content d-flex justify-content-evenly'>

          <div className=''>
            <div className='signin-image'>
              <figure>
                {/* <img className='logosigup' src={login_img} alt="error" /> */}
                <Lottie animationData={login_img} loop={true} />
              </figure>
              <NavLink to='/signup' className='screen768 signin-image-link d-flex justify-content-center text-black start-50 translate-middle'>Craete an Account</NavLink>
            </div>
          </div>

          <div className='signin-form'>
            <h3 className='form-title fw-bold mb-4'>Sign In</h3>
            <form method='POST' className='login-form' id='login-form'>
              <div className='form-group pt-3 pb-2'>
                <label htmlFor="email">
                  {/* <i class="zmdi zmdi-email"></i> */}
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input type="email" name='email' id='email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' className='padd' />
              </div>

              <div className='form-group pt-3 pb-2'>
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input type="password" name='password' id='password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your Password' className='padd' />
              </div>

              <div className='form-group form-button'>
                <input type="submit" name='signin' id='signin' className='form-submit btn btn-primary mt-3 mb-2' value='Log In' onClick={userLogin} />
                <div className='icons'>
                  {/* <FaSquareFacebook color='red'/>
                <FaSquareTwitter color='red'/>
                <ImGoogle2 color='red'/>
                <i className="facebook zmdi zmdi-facebook-box"></i>
                <i className="twitter zmdi zmdi-twitter-box"></i>
                <i className="google zmdi zmdi-google"></i> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Login
