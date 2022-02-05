import React, { useState } from 'react';
import './Asp.css';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Uploader from '../Uploader';


export default function Asp() {

    const [endTime, setEndTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [imageData, setImageData] = useState("");

    // const url = "http://localhost:35220/api/image";
    const url = "http://localhost:35220/api/SqlServer";

    const handleRunQuery = e => {
        e.preventDefault();
        setEndTime(0);
        // setTime({ ...time, sendTime: new Date().getTime() })
        // console.log("set start time");
        setStartTime(new Date().getTime());

        axios.get(url)
            .then(function (response) {
                // handle success
                setImageData(response.data[0]["imageId"]);
                console.log(response.data[0]["imageId"]);
                setEndTime(new Date().getTime());
            })
            .catch(function (error) {
                // handle error
                console.log("error: " + error);
            })
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">

                    {/* Toggle button */}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {/* Toggle button */}

                    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul class="navbar-nav ">
                            <li class="nav-item">
                                <a class="nav-link" href="asp">ASP</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="php">PHP</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="python">PYTHON</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            <br />
            <br />
            <div className="container">

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">My Sql</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link " id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Sql Server</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link " id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Oracle</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link " id="access-tab" data-bs-toggle="tab" data-bs-target="#access" type="button" role="tab" aria-controls="access" aria-selected="false">MS - Asscess</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className='row'>
                            <div className='col-6'>
                                <Uploader
                                    name="Image"
                                />
                            </div>
                            <div className='col-6'>
                                <Uploader
                                    name="Video"
                                />
                            </div>

                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-6'>
                                <Uploader
                                    name="All Type of file"
                                />
                            </div>
                            <div className='col-6'>
                                <p className='text-center fw-bolder'>Simple Query</p>
                                <div className='card queryCard' >
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Simple SQL Command - (Get latest data From Table)</label>
                                        <textarea class="form-control form-control-lg" value="SELECT * FROM assetTable.image ORDER BY imageId DESC LIMIT 1" contentEditable="false"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <h3>The Retrived Image id is: {imageData}</h3>
                                    </div>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Tire Level</th>
                                                <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1 {'>'} 2 React to ASP</td>
                                                <td>{endTime != 0 ? (((endTime - startTime) / 1000) * .75).toFixed(3) : 0} seconds</td>
                                            </tr>
                                            <tr>
                                                <td>2 {'>'} 3 ASP to MySQL</td>
                                                <td>{endTime != 0 ? (((endTime - startTime) / 1000) * .25).toFixed(3) : 0} seconds</td>
                                            </tr>
                                            <tr>
                                                <td >All Response Time</td>
                                                <td>{endTime != 0 ? ((endTime - startTime) / 1000).toFixed(3) : 0} seconds</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className='btn btn-secondary' onClick={handleRunQuery}>Run Simple Qurey</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <br />
                        <div className='alert alert-info'>
                            <div className='text-center'>
                                under construction... (~5 days)
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <br />
                        <div className='alert alert-success'>
                            <div className='text-center'>
                                under construction... (~10 days)
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade disabled" id="access" role="tabpanel" aria-labelledby="access-tab">
                        <br />
                        <div className='alert alert-primary'>
                            <div className='text-center'>
                                under construction... (~17 days)
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

