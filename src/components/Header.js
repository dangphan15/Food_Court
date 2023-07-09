import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import {Container ,Dropdown,  DropdownButton} from 'react-bootstrap';
import png from '../assets/icons/user.png'
import {USER_LOADING_REQUEST, USER_LOGOUT_SUCCESS} from "../features/user/userSlice";
import {useDispatch} from "react-redux";
const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        dispatch(USER_LOADING_REQUEST());
        localStorage.removeItem("token");
        await delay(500);
        dispatch(USER_LOGOUT_SUCCESS());
    };
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <form className="form-inline">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
            </form>


            <ul className="navbar-nav ml-auto">

                <Dropdown className="nav-item dropdown no-arrow">
                    <Dropdown.Toggle className="nav-link dropdown-toggle "
                                     id="userDropdown"
                                     style={{height:"40px", width:"40px"}}>
                        <img className="img-profile rounded-circle" style={{height:"25px", width:"25px"}}
                                 src={png}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                            Action
                        </Dropdown.Item>
                        <Dropdown.Item href="/" onClick={() => handleLogout()}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </ul>

        </nav>
    );
};

export default Header;