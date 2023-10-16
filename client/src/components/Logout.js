import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(userContext);
    const navigate = useNavigate();
    //using promises
    useEffect(() => {
        fetch('/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((res) => {
            dispatch({type: 'USER', payload: false});
            navigate('/login')
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        });
    });

    return (
        <div>
            <h2>User logout</h2>
        </div>
    )
}

export default Logout