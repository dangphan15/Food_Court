import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link to={"/"} className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">Dashboard</div>
            </Link>
            <hr className="sidebar-divider my-0"/>
            <li className="nav-item active">
                <Link to={"/"} className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                    <i className="fas fa-fw fa-table"></i>
                    <span>User</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/products"} className="nav-link">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Product</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/cards"} className="nav-link">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Card</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/transCounters"} className="nav-link">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Transaction Counter</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/shops"} className="nav-link">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Shop</span>
                </Link>
            </li>

                    <hr className="sidebar-divider d-none d-md-block"/>

                        <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>
        </ul>
    );
};

export default Navbar;