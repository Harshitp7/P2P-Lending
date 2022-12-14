import React from 'react'
import "./style.css";
import lendLogo from "../../Images/lendLogo.png";
import borrowLogo from '../../Images/borrowLogo.png';
import bankImg from "../../Images/bankImg.jpg";
import howItWorks from "../../Images/howItWorks.png";
import { Link } from 'react-router-dom';



export default function HomePage() {
    
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ paddingBottom: '5rem' }}>

                {/* -----------hero section ------------------------- */}
               <div className='heroSection' >
                <div className='imgTopContent'>
                    <div className='textContainer'>
                        <h1 className='heroTitle' >P2P Lending</h1>
                        <p className='heroText' >Lend and Borrow  money without the need for a middleman.</p>
                    </div>
                </div>

                <div className="imgContainer"></div>
               </div>
                {/* -----------hero section ------------------------- */}


                <div className="container mt-5">
                    <div>
                        <div className="container card-body" style={{textAlign: 'center'}}>
                            <h2 style={{color : '#e23d72'}}>Welcome to the Peer-to-Peer Blockchain Based Application</h2>
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
        </div>
    );
}
