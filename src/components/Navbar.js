// import react  from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from '../logo2.jpg';
import './Navbar.css';
// import { useEffect } from 'react';

const Navbar = () => {
    let navigator = useNavigate();

    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigator('/login');
    }

    let location = useLocation();
    // useEffect(() => {
    //     // Google Analytics
    //     console.log(location.pathname);
    // }, [location]);
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
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}` } aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token")?<form className="d-flex" role="search">
                        <Link to="/login" className="btn btn-primary mx-1" role="button" >Login</Link>
                        <Link to="/signup" className="btn btn-primary mx-1 " role="button" >Signup</Link>
                        </form>:<button  onClick={handleLogout} className="btn btn-primary mx-1 " >Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
