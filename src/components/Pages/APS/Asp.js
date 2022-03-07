import React, { useState } from 'react';
import './Asp.css';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Uploader from '../../Uploader';
import QueryUploader from '../../Tabs/QueryUploader/QueryUploader';


export default function Asp() {

    // 
    const [endTime, setEndTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [imageData, setImageData] = useState("");

    // const url = "http://localhost:35220/api/image";
    const url = "http://localhost:35220/api/SqlServer";


    // ئەمە تیەری سێ رەسمەکە وەرەگرێ لە تیەری دوو 
    // ناردنی رەسمەکەیە لەڕێگەی ئەی پی ئایەوە
    const handleRunQuery = e => {
        e.preventDefault();
        setEndTime(0);
        // setTime({ ...time, sendTime: new Date().getTime() })
        // console.log("set start time");
        setStartTime(new Date().getTime());

        // پاکێجی ئاگزیۆسمان بەکارهێناوە لە ناردنی رەسمەکەیا
        axios.get(url)
            .then(function (response) {
                // handle success
                // جوابی ناردنەکە لێرە وەرەگرین کە ئایدی رەسمەکەیە
                setImageData(response.data[0]["imageId"]);
                console.log(response.data[0]["imageId"]);
                setEndTime(new Date().getTime());
            })
            .catch(function (error) {
                // handle error
                console.log("error: " + error);
            })
    }



    const mySqlUrl = "http://localhost:35220/api/image";
    const sqlServerUrl = "http://localhost:35220/api/SqlServer";
    const oracleUrl = "";
    const msAccessUrl = "http://localhost:35220/api/msAccess";

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">

                    {/*  ئەم بەشە ناڤ باڕ و تووڵەکەی سەرەوەی تیایە دەس بنێی
                     بە هەر کامێکیانا لە کۆتاییا ئەو بەشەت بۆ ئەکرێتەوە */}

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

            {/* بەشی تابەکان کە جۆری دەیتابەیسەکان لێرە جیاکراونەتەوە بۆ یەک زمان دەس بنێی بە هەر تابێکا ئەو زمانەت بۆ ئەکاتەوە و ئەتوانی رەسم و ڤیدیۆ و فایل بنێری و کیوری بگەڕێتەوە */}
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
                                {/* بەکارهێنانی کۆمپۆنێنتێکی درووستکراوە کە کۆدەکانی لە پەیجێکی ترن */}

                                {/* ئەم کۆمپۆنێنتە کە ناوی ئەپڵۆدەرە ئەپڵۆدی رەسم  ئەکا بۆ مای ئێس کیو ئێڵەکە کە وردە کارییەکەی لە پەیجی خۆیەتی */}
                                <Uploader
                                    name="Image"
                                    url={mySqlUrl}
                                    accept="image/*"
                                />
                            </div>
                            {/* ئەم کۆمپۆنێنتە ئەپڵۆدی ڤیدیۆ ئەکا بۆ ناو مای ئێس کیو ئێڵەکە */}
                            <div className='col-6'>
                                <Uploader
                                    name="Video"
                                    url={mySqlUrl}
                                    accept='video/*'
                                />
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            {/*  ئەم کۆمپۆنێنتە ئەپڵۆد هەموو جۆرە فایلێک دەکات بۆ ناو مای ئێسکیوئێڵەکە */}
                            <div className='col-6'>
                                <Uploader
                                    name="All Type of file"
                                    url={mySqlUrl}
                                />
                            </div>
                            <div className='col-6'>
                                {/* ئەم کۆمپۆنێنتە داونلۆدت کۆتا فایلیان رەسم دەکات کە ئەپڵۆد کراوە بۆ ناو مای ئێس کیو ئێڵەکە و کۆتا ئای دی پشانەیاتەوە */}
                                <QueryUploader
                                    name="simple Query"
                                    url={mySqlUrl}
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className='row'>
                            <div className='col-6'>
                                {/* بەکارهێنانی کۆمپۆنێنتێکی درووستکراوە کە کۆدەکانی لە پەیجێکی ترن */}

                                {/* ئەم کۆمپۆنێنتە کە ناوی ئەپڵۆدەرە ئەپڵۆدی رەسم  ئەکا بۆ  ئێس کیو ئێڵە سیرڤەرە کە وردە کارییەکەی لە پەیجی خۆیەتی */}

                                <Uploader
                                    name="Image"
                                    url={sqlServerUrl}
                                    accept="image/*"
                                />
                            </div>
                            <div className='col-6'>
                                {/* ئەم کۆمپۆنێنتە ئەپڵۆدی ڤیدیۆ ئەکا بۆ ناو ئێس کیو ئێڵ سێرڤەرەکە */}
                                <Uploader
                                    name="Video"
                                    url={sqlServerUrl}
                                    accept='video/*'
                                />
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-6'>
                                {/* ئەم کۆمپۆنێنتە ئەپڵۆدی هەموو جۆرە فایلێک دەکات بۆ ناو  ئێسکیوئێڵ سێرڤەرەکە */}
                                <Uploader
                                    name="All Type of file"
                                    url={sqlServerUrl}
                                />
                            </div>
                            <div className='col-6'>
                                {/* ئەم کۆمپۆنێنتە داونلۆدی کۆتا فایل یان رەسم دەکات کە ئەپڵۆد کراوە بۆ ناو  ئێس کیو ئێڵەک سێرڤەرەکە و کۆتا ئای دی پشانەیاتەوە */}
                                <QueryUploader
                                    name="simple Query"
                                    url={sqlServerUrl}
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
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
                        <div className='row'>
                            <div className='col-6'>
                                {/* بەکارهێنانی کۆمپۆنێنتێکی درووستکراوە کە کۆدەکانی لە پەیجێکی ترن */}

                                {/* ئەم کۆمپۆنێنتە کە ناوی ئەپڵۆدەرە ئەپڵۆدی رەسم  ئەکا بۆ  ئەکسسەکە کە وردە کارییەکەی لە پەیجی خۆیەتی */}

                                <Uploader
                                    name="Image"
                                    url={msAccessUrl}
                                    accept="image/*"
                                />
                            </div>
                            <div className='col-6'>
                                {/* ئەم کۆمپۆنێنتە ئەپڵۆدی ڤیدیۆ ئەکا بۆ ناو ئەکسسەکە */}
                                <Uploader
                                    name="Video"
                                    url={msAccessUrl}
                                    accept='video/*'
                                />
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-6'>
                                {/* ئەم کۆمپۆنێنتە ئەپڵۆدی هەموو جۆرە فایلێک دەکات بۆ ناو ئەکسسەکە */}
                                <Uploader
                                    name="All Type of file"
                                    url={msAccessUrl}
                                />
                            </div>
                            <div className='col-6'>
                                {/* ئەم کۆمپۆنێنتە داونلۆدی کۆتا فایل یان رەسم دەکات کە ئەپڵۆد کراوە بۆ ناو ئەکسسەکە و کۆتا ئای دی پشانەیاتەوە */}

                                <QueryUploader
                                    name="simple Query"
                                    url={msAccessUrl}
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />


                    </div>
                </div>
            </div >
        </>
    );
}

