import React, { useContext, useEffect, useState } from 'react'
import logo from "../images/logo/vaagdevi_logo.png"
import AuthContext from '../auth/AuthContext'
import { Helmet } from 'react-helmet'
import "../css/login_page.css"

export default function Login() { 
    let {jwtToken} = useContext(AuthContext)
    let {loginUser} = useContext(AuthContext)
    let {redirectUser} = useContext(AuthContext)
    let [student, setStudent] = useState(true);
    let [faculty, setFaculty] = useState(false);
    let [admin, setAdmin] = useState(false);
    useEffect(() => {
        if(jwtToken){
            redirectUser(null);
        }
    }, [])
    return (
        <div>
            <Helmet>
                <title>Login</title>
                <body className='bg-white' />
            </Helmet>
            <div className="container-fluid no-padding">
                <div className="row no-gutters">
                    <div className='col-lg-7 no-padding col-12'>
                    <div
                        className="container-fluid image_container"
                    />
                    </div>
                    <div className='col-lg-5 col-12 mt-5 no-gutters text-white'>
                        <div className="text-center mt-5">
                            <img src={logo} alt="vaagdevi_logo" className='img-fluid vaagdevi_logo' />
                        </div>
                        <div className="col-10 offset-1">
                            <div className="card card-border-radius mt-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3 col-4 offset-sm-1">
                                            {student ? 
                                                <button className='btn btn-success social_logos titles'>Student</button> :
                                                <p className='p-titles' onClick={() => {
                                                    setStudent(true)
                                                    setFaculty(false)
                                                    setAdmin(false)
                                                }}>Student</p>
                                            }
                                        </div>
                                        <div className="col-sm-3 col-4 offset-sm-1">
                                            {faculty ? 
                                                <button className='btn btn-success social_logos titles'>Faculty</button> :
                                                <p className='p-titles' onClick={() => {
                                                    setStudent(false)
                                                    setFaculty(true)
                                                    setAdmin(false)
                                                }}>Faculty</p>
                                            }
                                        </div>
                                        <div className="col-sm-3 col-4 offset-sm-1">
                                            {admin ? 
                                                <button className='btn btn-success social_logos titles'>Admin</button> :
                                                <p className='p-titles' onClick={() => {
                                                    setStudent(false)
                                                    setFaculty(false)
                                                    setAdmin(true)
                                                }}>Admin</p>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row mt-4">
                                        <div className="col-10 offset-1">
                                            <form method='post' onSubmit={e => loginUser(e)}> 
                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">{
                                                        student ? "Student ID" :
                                                        faculty ? "Faculty ID" :
                                                        admin ? "Admin ID" :
                                                        ""
                                                    }</label>
                                                    <input
                                                        type="text"
                                                        className="form-control social_logos border-dark"
                                                        name="username"
                                                        id="username"
                                                        aria-describedby="helpId"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control social_logos border-dark"
                                                        name="password"
                                                        id="password"
                                                    />
                                                    <span className='register-now'>Forgot Password?</span>
                                                </div>

                                                <button
                                                    type="submit" className="btn btn-primary btn-block col-12 social_logos">
                                                        <h5>Sign in</h5>
                                                </button>
                                            </form>
                                            <div className="col-12 mt-2 text-center register_now text-muted">
                                                Don't have an account yet? <span className='register-now'>Register for free</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
}
