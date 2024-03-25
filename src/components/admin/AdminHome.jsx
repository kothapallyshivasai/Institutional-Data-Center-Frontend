import React, { useContext } from 'react'
import AuthContext from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AdminHome() {
    let {jwtToken} = useContext(AuthContext)
    let {logoutUser} = useContext(AuthContext)
    let {redirectUser} = useContext(AuthContext)
    if(!jwtToken){
        return <Navigate to="/login" />;
    }
    redirectUser("ADMIN");
    return (
        <div>
            {jwtDecode(jwtToken).sub}
            <h1 className="text-center mt-5">Admin Home</h1>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}
