import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/reshort.svg';
import { FcAdvance } from "react-icons/fc";
import { userContext } from '../App';

function Navbar() {

    const { state, dispatch } = useContext(userContext);
    const RenderMenue = () => {
        if (state) {
            return (<>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" to="/contact">Contact</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link navcolor" to="/logout">Logout</NavLink>
                </li>
            </>)
        } else {
            return (<>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" to="/contact">Contact</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link navcolor" to="/signup">Signup</NavLink>
                </li>
            </>)
        }
    }

    return (<>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="#">
                    <img src={logo} alt="logo" /><FcAdvance />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <RenderMenue />
                    </ul>
                </div>
            </div>
        </nav>
    </>)
}

export default Navbar
