import React from 'react'
import "./style.css";
import lendLogo from "./icons8-lend-96.png";
import borrowLogo from './icons8-borrow-64.png';
import LandingImg from "../../Images/LandingImg.png";
import bankImg from "../../Images/bankImg.jpg";
import howItWorks from "../../Images/howItWorks.png";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import NavbarCommon from '../../components/NavbarCommon';


export default function HomePage() {
    
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ paddingBottom: '5rem' }}>
              <NavbarCommon />
                <Image
                    src={LandingImg}
                    style={{ width: '100%', height: '80vh' }}
                />
                <div className="container mt-5">
                    <div className="card" style={{ borderRadius: '25px', boxShadow: '5px 10px #888888' }}>
                        <div className="container card-body" style={{textAlign: 'center'}}>
                            <h2>Welcome to the Peer-to-Peer Blockchain Based Application</h2>
                            <h5>Here, you can borrow and lend money with your choice without any centralization of the process!</h5>
                        </div>
                    </div>


                </div>
                <br /> <br />
                <div className="container">
                    <img src={bankImg} alt="" style={{width: '70%', height: '50%', transform: 'translateX(20%)', marginBottom: '2%'}} />
                    <h2 style={{ padding: '2% 18%' }}>How does the decentralized financing works v/s banks</h2>
                    <img src={howItWorks} alt="" style={{width: '70%', transform: 'translateX(18%)'}} />
                 </div>

                <div className="container">
                    <h1 className="mt-5 text-dark">Get Started...</h1>
                </div>
                <br />
                <div className="container px-4">
                    <div className="row">
                        <div className="col-sm-6" id="role-cardAndicon1">
                            <Link to="/" className="role-link" style={{ textDecoration: 'none' }}>
                                <div className="card" id="role-card" style={{ backgroundColor: 'purple', width: '90%', height: '80%', border: 'solid yellow 4px', borderRadius: '25px', padding: 'auto 20%' }}>
                                    <div className="card-body" style={{ textAlign: 'center', padding: '0', transform: 'translateY(35%)' }}>
                                        <h1 className="card-title" style={{ color: 'yellow' }}>Borrow</h1>


                                    </div>
                                </div>
                            </Link>
                            <div className="container col-sm-6 mt-1 mb-5" id="role-icon">
                                <img src={borrowLogo} alt="" style={{ height: '10%', width: '30%', transform: 'translateY(-150%)', transform: 'translateX(70%)' }} />
                            </div>

                        </div>

                        <div className="col-sm-6" id="role-cardAndicon2">
                            <Link to="/" className="role-link" style={{ textDecoration: 'none' }}>
                                <div className="card" id="role-card" style={{ backgroundColor: 'purple', width: '90%', height: '80%', border: 'solid yellow 4px', borderRadius: '25px', padding: 'auto 20%' }}>
                                    <div className="card-body" style={{ textAlign: 'center', padding: '0', transform: 'translateY(35%)' }}>
                                        <h1 className="card-title" style={{ color: 'yellow' }}>Lend</h1>

                                    </div>
                                </div>
                            </Link>
                            <div className="container col-sm-6 mb-1" id="role-icon">
                                <img src={lendLogo} alt="" style={{ height: '10%', width: '30%', transform: 'translateY(-150%)', transform: 'translateX(70%)' }} />
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
