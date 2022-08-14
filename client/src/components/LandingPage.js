import React from 'react'
import { useEth } from "./contexts";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-warning bg-warning">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" link="/Home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" link="/Signin">Signin</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" link="/Signup">Signup</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div class="card">
                <div class="card-header">
                    Welcome to the Peer-to-Peer Blockchain Based Application.
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>Here, you can borrow and lend money with your choice without any centralization of the process!</p>

                    </blockquote>
                </div>
            </div>
            <div className="container">
                <h1 className="mt-5 text-dark">Get Started...</h1>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <a href="#">
                        <div class="card">
                            <div class="card-body">
                                <h2 class="card-title">Borrow</h2>

                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-sm-6">
                    <a href="#">
                        <div class="card">
                            <div class="card-body">
                                <h2 class="card-title">Lend</h2>

                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="container-fluid">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 mt-2 text-center text-white bg-warning">
                        <p style="padding-bottom: 1%;">&copy; 2022, All rights reserved.</p>
                    </div>
                    <p class="text-center text-white" style="font-size:1rem; margin-top:-2%;">Best Viewed in 1920 x 1080 Resolution</p>
                </div>
            </div>
        </div>
    )
}
