import React from 'react'
import "./style.css";
import lendLogo from "./icons8-lend-96.png";
import borrowLogo from './icons8-borrow-64.png';
export default function LandingPage() {
    return (
        <div style={{position : 'relative'}}>
            <div style={{paddingBottom : '5rem'}}>
                <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
                    <div className="container-fluid">
                        <img src="https://cdn.vectorstock.com/i/1000x1000/05/91/blockchain-cube-colorful-line-icon-or-logo-vector-22330591.webp" alt="" style={{width: '4%', height: '4%', marginRight: '1%'}}/>
                        <a className="navbar-brand" href="#" style={{ fontSize: 'large', color: 'black', fontWeight: 'bold' }}>LendDefi</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav mx-5 px-5">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/Home">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Signin">Signin</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Signup">Signup</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
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
                            <a href="#" className="role-link" style={{ textDecoration: 'none' }}>
                                <div className="card" id="role-card" style={{ backgroundColor: 'purple', width: '90%', height: '80%', border: 'solid yellow 4px', borderRadius: '25px', padding: 'auto 20%' }}>
                                    <div className="card-body" style={{ textAlign: 'center', padding: '0', transform: 'translateY(35%)' }}>
                                        <h1 className="card-title" style={{ color: 'yellow' }}>Borrow</h1>


                                    </div>
                                </div>
                            </a>
                            <div className="container col-md-6 col-sm-12 mt-5" style={{transform : 'translateY(-50%)'}}>
                                <img src={borrowLogo}  alt="" style={{ height: '20%', width: '30%',transform: 'translateY(100%)', transform: 'translateX(50%)'}} />
                            </div>

                        </div>

                        <div className="col-md-6 col-sm-12">
                            <a href="#" className="role-link" style={{ textDecoration: 'none' }}>
                                <div className="card" id="role-card" style={{ backgroundColor: 'purple', width: '90%', height: '80%', border: 'solid yellow 4px', borderRadius: '25px', padding: 'auto 20%' }}>
                                    <div className="card-body" style={{ textAlign: 'center', padding: '0', transform: 'translateY(35%)' }}>
                                        <h1 className="card-title" style={{ color: 'yellow' }} >Lend</h1>

                                    </div>
                                </div>
                            </a>
                            <div className="container col-md-6 col-sm-12 mt-5" style={{transform : 'translateY(-50%)'}}>
                                <img src={lendLogo} alt="" style={{ height: '10%', width: '30%', zIndex: '1', transform: 'translateY(-150%)' , transform: 'translate(50%)'}} />
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
