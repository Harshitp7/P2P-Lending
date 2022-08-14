import React from 'react'

export default function LandingPage() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" link="/Home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" link="/Signin">Signin</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" link="/Signup">Signup</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div className="card">
                <div className="card-header">
                    Welcome to the Peer-to-Peer Blockchain Based Application.
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>Here, you can borrow and lend money with your choice without any centralization of the process!</p>

                    </blockquote>
                </div>
            </div>
            <div className="container">
                <h1 className="mt-5 text-dark">Get Started...</h1>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <a href="#">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Borrow</h2>

                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-sm-6">
                    <a href="#">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Lend</h2>

                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mt-2 text-center text-white bg-warning">
                        <p 
                        // style="padding-bottom: 1%;"
                        >&copy; 2022, All rights reserved.</p>
                    </div>
                    <p className="text-center text-white" 
                    // style="font-size:1rem; margin-top:-2%;"
                    >Best Viewed in 1920 x 1080 Resolution</p>
                </div>
            </div>
        </div>
    )
}
