import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo_signup from '../images/new_signup.svg';
// import logo_signup from '../images/signup_blue/data.json'
// import Lottie from 'lottie-react';

const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    })

    let name, value;
    const handlchange = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        if (data.status === 422 || !data) {
            window.alert('Invalid Registration');
        } else {
            window.alert('Registration successfull');

            navigate('/login');
        }
    }

    return (<>
        <div className='signup position-absolute top-50 start-50 translate-middle'>
            <div className='container mt-1'>
                <div className='signup-content d-flex justify-content-evenly'>
                    <div className='signup-form'>
                        <h3 className='form-tittle fw-bold'>Sign up</h3>
                        <form method='POST' className='register-form' id='register-form'>
                            <div className='form-group pt-3 pb-2'>
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account"></i>
                                </label>
                                <input type="text" name='name' id='name' autoComplete='off' value={user.name} onChange={handlchange} placeholder='Your Name' className='padd' />
                            </div>

                            <div className='form-group pt-3 pb-2'>
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email"></i>
                                </label>
                                <input type="email" name='email' id='email' autoComplete='off' value={user.email} onChange={handlchange} placeholder='Your Email' className='padd' />
                            </div>

                            <div className='form-group pt-3 pb-2'>
                                <label htmlFor="phone">
                                    <i className="zmdi zmdi-phone-in-talk"></i>
                                </label>
                                <input type="number" name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handlchange} placeholder='Your Phone' className='padd' />
                            </div>

                            <div className='form-group pt-3 pb-2'>
                                <label htmlFor="work">
                                    <i className="zmdi zmdi-slideshow"></i>
                                </label>
                                <input type="text" name='work' id='work' autoComplete='off' value={user.work} onChange={handlchange} placeholder='Your Work' className='padd' />
                            </div>

                            <div className='form-group pt-3 pb-2'>
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock"></i>
                                </label>
                                <input type="password" name='password' id='password' autoComplete='off' value={user.password} onChange={handlchange} placeholder='Your Password' className='padd' />
                            </div>

                            <div className='form-group pt-3 pb-2'>
                                <label htmlFor="cpassword">
                                    <i className="zmdi zmdi-lock"></i>
                                </label>
                                <input type="password" name='cpassword' id='cpassword' autoComplete='off' value={user.cpassword} onChange={handlchange} placeholder='Confirm Your Password' className='padd' />
                            </div>

                            <div className='form-group form-button'>
                                <input type="submit" name='signup' id='signup' className='form-submit btn btn-primary mt-3 mb-2' value='register' onClick={postData} />
                            </div>
                        </form>
                    </div>
                    <div className='signup-image'>
                        <figure>
                            <img className='logosigup' src={logo_signup} alt="error" />
                            {/* <Lottie className='logosigup' animationData={logo_signup} loop={true}/> */}
                        </figure>
                        <NavLink to='/login' className='screen768 signup-image-link d-flex justify-content-center text-black start-50 translate-middle'>I am already register</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Signup