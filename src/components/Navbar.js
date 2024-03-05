// import react  from 'react'
import { Link, useLocation } from "react-router-dom";
import Logo from '../logo2.jpg';
import './Navbar.css';
import { useEffect } from 'react';

const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
        // Google Analytics
        console.log(location.pathname);
    }, [location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-0 custom-navbar" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img alt="Logo" src={Logo} style={{ width: '160px', height: 'auto' }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
