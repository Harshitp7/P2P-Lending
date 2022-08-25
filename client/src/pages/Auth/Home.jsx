import React, { useState, useEffect } from 'react'
import "./style.css";
import lendLogo from "./icons8-lend-96.png";
import borrowLogo from './icons8-borrow-64.png';
import LandingImg from "../../Images/LandingImg.png";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

export default function HomePage() {
    
   
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ paddingBottom: '5rem' }}>
                <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
                    <div className="container-fluid">
                        <img src="https://cdn.vectorstock.com/i/1000x1000/05/91/blockchain-cube-colorful-line-icon-or-logo-vector-22330591.webp" alt="" style={{ width: '4%', height: '4%', marginRight: '1%' }} />
                        <Link className="navbar-brand" to="#" style={{ fontSize: 'large', color: 'black', fontWeight: 'bold' }}>LendDefi</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav mx-5 px-5">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Signin">Signin</Link>
                                </li>

                                <li className="nav-item">
                                  
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{color: 'purple', fontSize: 'large'}}>
                                            SignUp
                                        </button>
                                        <ul className="dropdown-menu" style={{backgroundColor: '#FFC107'}}>
                                            <li><Link className="dropdown-item" to="/SignUpBorrower">Borrower</Link></li>
                                            <li><Link className="dropdown-item" to="/SignUpLender">Lender</Link></li>
                                        </ul>
                                    </div>
                                   
                                </li>


                            </ul>
                        </div>
                    </div>
                </nav>
                <Image
                    src={LandingImg}
                    style={{ width: '100%', height: '80vh' }}
                />
                <div className="container mt-5">
                    <div className="card" style={{ borderRadius: '25px', boxShadow: '5px 10px #888888' }}>
                        <div className="card-body">
                            <h3>Welcome to the Peer-to-Peer Blockchain Based Application.</h3>
                            <h4>Here, you can borrow and lend money with your choice without any centralization of the process!</h4>
                        </div>
                    </div>


                </div>
                <br /> <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <h2 style={{ padding: 'auto 20%' }}>How does the decentralized financing works v/s banks:</h2><br />
                            <img src="https://www.analyticssteps.com/backend/media/thumbnail/9047828/9749234_1633623007_Decentralized%20FinanceArtboard%201.jpg" alt="" />
                        </div>
                        <div className="container col-md-7">
                            <img src="https://appinventiv.com/wp-content/uploads/sites/1/2020/02/What-is-decentralized-finance-scaled.webp" alt="decentralized transaction" style={{ width: '100%', height: '100%', padding: 'auto 20%' }} />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <h1 className="mt-5 text-dark">Get Started...</h1>
                </div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <Link to="#" className="role-link" style={{ textDecoration: 'none' }}>
                                <div className="card" id="role-card" style={{ backgroundColor: 'purple', width: '90%', height: '80%', border: 'solid yellow 4px', borderRadius: '25px', padding: 'auto 20%' }}>
                                    <div className="card-body" style={{ textAlign: 'center', padding: '0', transform: 'translateY(35%)' }}>
                                        <h1 className="card-title" style={{ color: 'yellow' }}>Borrow</h1>


                                    </div>
                                </div>
                            </Link>
                            <div className="container col-md-6 col-sm-12 mt-5" style={{ transform: 'translateY(-50%)' }}>
                                <img src={borrowLogo} alt="" style={{ height: '20%', width: '30%', transform: 'translateY(100%)', transform: 'translateX(50%)' }} />
                            </div>

                        </div>

                        <div className="col-md-6 col-sm-12">
                            <Link to="#" className="role-link" style={{ textDecoration: 'none' }}>
                                <div className="card" id="role-card" style={{ backgroundColor: 'purple', width: '90%', height: '80%', border: 'solid yellow 4px', borderRadius: '25px', padding: 'auto 20%' }}>
                                    <div className="card-body" style={{ textAlign: 'center', padding: '0', transform: 'translateY(35%)' }}>
                                        <h1 className="card-title" style={{ color: 'yellow' }}>Lend</h1>

                                    </div>
                                </div>
                            </Link>
                            <div className="container col-md-6 col-sm-12 mt-5" style={{ transform: 'translateY(-50%)' }}>
                                <img src={lendLogo} alt="" style={{ height: '10%', width: '30%', zIndex: '1', transform: 'translateY(-150%)', transform: 'translate(50%)' }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <br /> <br />

            <footer className="footer mt-auto mb-0 py-3 bg-warning" style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
                <div className="container">
                    <span>&copy; 2022, All rights reserved.</span>
                </div>
            </footer>
        </div>




    );
}
