import React, { useState } from 'react';

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Uploader from '../../Uploader';


export default function QueryUploader(props) {

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

        axios.get(props.url)
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
            <br />
            <p className='text-center fw-bolder'>{props.name}</p>
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
        </>
    );
}

