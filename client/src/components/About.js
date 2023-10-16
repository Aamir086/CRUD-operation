import React, { useEffect, useState } from 'react'
import person_img from '../images/person.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function About() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home'); // Initialize active tab state

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const [userData, setUserData] = useState('');

    const callAboutPage = async () => {
        try {
            const response = await axios.get('/about', {
                withCredentials: true
            });
            // console.log("result found as ", res);
            const data = response.data
            // console.log(data);
            setUserData(data);

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
        callAboutPage();
    }, [])

    return (<>
        <div className='container emp-profile mt-4'>
            <form method='GET'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='profile-img'>
                            <img src={person_img} alt="error" className='imgg' />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='profile-head'>
                            <h5 className=''>{userData.name}</h5>
                            <h6 className='webdev'>{userData.work}</h6>

                            <ul className="nav mt-5" role='tablist'>
                                <li className="nav-item">
                                    {/* <a className="nav-link active" id='home-tab' data-toggle='tab' href="#home" role='tab'>About</a> */}
                                    <button
                                        className={`nav-link btn ${activeTab === 'home' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabClick('home')}
                                    >
                                        About
                                    </button>
                                </li>
                                <li className="nav-item">
                                    {/* <a className="nav-link active" id='profile-tab' data-toggle='tab' href="#profile" role='tab'>Timeline</a> */}
                                    <button
                                        className={`nav-link btn ${activeTab === 'profile' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabClick('profile')}
                                    >
                                        Timeline
                                    </button>
                                </li>
                            </ul>
                            <hr className='mt-0' />
                        </div>
                    </div>

                    <div className='col-md-2'>
                        <input type="submit" className='edit_pro_btn btn btn-primary' name='btnAndMore' value='Edit Profile' />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-md-4'>
                        <div className='profile-work d-flex flex-column gap-1'>
                            <p className='fw-bold'>LINKS</p>
                            <a href="/" className='links'>Linked In</a>
                            <a href="/" className='links'>Twitter</a>
                            <a href="/" className='links'>Facebook</a>
                            <a href="/" className='links'>Instagram</a>
                            <a href="/" className='links'>Git hub</a>
                        </div>
                    </div>

                    <div className='col-md-8 pl-5 about-info'>
                        <div className='tab-content home-tab' id='mytabcontent'>
                            {/* <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'> */}
                            {activeTab === 'home' && (
                                <div className={`tab-pane fade show active`} id="home" role="tabpanel">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>User ID</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>23456789</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* <div className='tab-pane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'> */}
                        {activeTab === 'profile' && (
                            <div className={`tab-pane fade`} id="profile" role="tabpanel">

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Profession</label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>{userData.work}</p>
                                        <h1>hiiiiiiiiiiii</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div >
            </form >
        </div >
    </>)
}

export default About
