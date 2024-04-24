import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from "react";
import { MetaData } from "../MetaData";
import { clearAutherror, login } from "../../action/UserActions";
import { toast } from "react-toastify";
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated} = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(Email, password));
    };

    useEffect(() => {
              
        if(isAuthenticated){

            navigate('/')

        }

        if (error) {

            toast.error(error,
                 { position: "top-center",
                   type: 'error',
                   onOpen: ()=>{ dispatch(clearAutherror)}  
                  
                });
        }
    }, [error, isAuthenticated, dispatch]);

    return (
        <Fragment>
            <MetaData title={'Login'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg bg-white w-100 rounded">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={Email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <a href="#" className="float-right mb-4">Forgot Password?</a>

                        <div>
                            <button className="mt-3 mb-3 bg-success w-100" disabled={loading}>Login</button>
                        </div>

                        <Link to={'/register'} className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
