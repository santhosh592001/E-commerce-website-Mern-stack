import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Searchbar } from './Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../action/UserActions';
import { FaBars } from "react-icons/fa";

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
         <>

    <nav className="navbar navbar-expand-lg bg-dark fixed">
      <div className="container-fluid">
        <Link to={'/'} className="logo navbar-brand text-white ms-3">
          OnlineIndia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className='text-danger'><FaBars /></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-between" id="mynavbar">
          <div className="mx-auto" id='searchbared'>
            <Searchbar />
          </div>

          <div className="mx-3">
            {isAuthenticated ? (
              <Dropdown className="d-inline">
                <Dropdown.Toggle variant="default text-white" id="dropdown-basic">
                  <figure className="avatar avatar-nav">
                    <Image width="50px" src={user?.Profile ?? '../images/san.jpeg'} />
                  </figure>
                  <span>{user?.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logoutHandler} className="text-danger">
                    Logout
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/Myprofile')} className="text-danger">
                    Profile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to={'/login'} style={{ width: '120px' }} id='login-by' className="btn btn-danger  text-white p-1">
                Login
              </Link>
            )}
          </div>
          <ul className="navbar-nav gap-3 text-center">
            <li className="nav-item">
              <Link to={'/'} className="nav-link">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  
    

      
    </>
  );
}
