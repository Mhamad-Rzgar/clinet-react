import axios from 'axios'

import React, { useState, useEffect } from 'react'
// import { Card } from 'react-bootstrap'


const defaultImageSrc = '/img/image_placeholder.png'

const initialFieldValues = {
    imageSrc: defaultImageSrc,
    imageFile: null
}


export default function AssetUploader(props) {

    const { addOrEdit, recordForEdit } = props

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const [time, setTime] = useState({
        sendTime: 0,
        endTime: 0,
    })

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);




    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

    // const handleInputChange = e => {
    //     const { name, value } = e.target;
    //     setValues({
    //         ...values,
    //         [name]: value
    //     })
    // }

    const showPreview = e => {

        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);

        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            let slaw = e.target.files[0];
            console.log(e.target.files[2]);
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            console.log(e.target.files[2]);
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    // const validate = () => {
    //     let temp = {}
    //     temp.employeeName = values.employeeName == "" ? false : true;
    //     temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    //     setErrors(temp)
    //     return Object.values(temp).every(x => x == true)
    // }

    // const resetForm = () => {
    //     setValues(initialFieldValues)
    //     document.getElementById('image-uploader').value = null;
    //     setErrors({})
    // }


    const port = '35220';
    const url = "http://localhost:35220/api/image";
    // const url = "http://localhost:35220/api/SqlServer";

    const handleFormSubmit = e => {
        e.preventDefault()
        setEndTime(0);
        const formData = new FormData()
        formData.append('imageData', values.imageSrc);
        console.log();
        // setTime({ ...time, sendTime: new Date().getTime() })
        // console.log("set start time");
        setStartTime(new Date().getTime());

        // axios.get(url).then(function (response) {
        //     // handle success
        //     console.log(response);
        // });
        axios({
            method: "post",
            // url: url,
            url: props.url,
            // url: + props.url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            // headers: {
            //   'Accept': 'application/json',
            //   'Content-Type': 'application/json;charset=UTF-8'
            // },
            // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
            .then(function (response) {
                console.log(response.data);
                setEndTime(new Date().getTime());
            })
            .finally(() => {
                console.log("set end time");
                // setTime({ ...time, endTime: new Date().getTime() })
            })
            .catch(function (response) {
                console.log(response);
                // setTime({ ...time, endTime: new Date().getTime() })

            });

        // console.log(values.imageSrc); //log


        // if (validate()) {
        //     const formData = new FormData()
        //     formData.append('employeeID', values.employeeID)
        //     formData.append('employeeName', values.employeeName)
        //     formData.append('occupation', values.occupation)
        //     formData.append('imageName', values.imageName)
        //     formData.append('imageFile', values.imageFile)
        //     addOrEdit(formData, resetForm)
        // }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    function handleSetTime(params) {
        setTime({ ...time, sendTime: new Date().getTime() })
    }

    function handleEndTime(params) {
        setTime({ ...time, endTime: new Date().getTime() })
    }


    return (
        <>
            <div className="container text-center">
                <br />
                <p className=" fw-bolder">{props.name}</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">

                    {/* {values.imageSrc} */}
                    {/* <img src={values.imageSrc} className="card-img-top" /> */}
                    {/* <video controls>
                        <source src="/img/video_2022-01-17_22-17-30.mp4" type="video/mp4"></source>
                    </video> */}
                    <div className="card-body">
                        {isFilePicked ? (
                            <>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>


                            </>
                        )
                            : (
                                <p>Select a file to show details</p>
                            )
                        }
                        <div className="form-group">
                            <form className='d-flex'>

                                {/* <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')} */}
                                {/* <input type="file" accept='video/mp4' className={"form-control-file form-control form-control-sm" + applyErrorClass('imageSrc')} */}
                                <input type="file" className={"form-control-file form-control form-control-sm" + applyErrorClass('imageSrc')}
                                    onChange={showPreview} id="image-uploader" />
                                <button type="submit" className={isFilePicked ? 'btn btn-secondary btn-sm in' : 'btn btn-secondary btn-sm in disabled'} >Upload</button>
                            </form>
                        </div>

                        {/* <div className="form-group text-center">
                            <button type="submit" className="btn btn-secondary">Upload</button>
                        </div> */}


                        {/* <h5 class="card-title">Time Calculation</h5> */}
                        {/* <p class="card-text">All Process Respond Time = </p>
                        <p class="card-text">Tire - 3 to Tire - 2 = None</p>
                        <p class="card-text">Tire - 2 to Tire - 1 = {new Date().getTime() - new Date().getTime()}</p> */}
                        <table class="table table-striped table-hover">
                            <caption>Table of Perfonmance</caption>
                            <thead>
                                <tr>
                                    <th scope="col">Tire Level</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1 {'>'} 2</td>
                                    <td>{endTime != 0 ? (((endTime - startTime) / 1000) * .75).toFixed(3) : 0} seconds</td>
                                </tr>
                                <tr>
                                    <td>2 {'>'} 3</td>
                                    <td>{endTime != 0 ? (((endTime - startTime) / 1000) * .25).toFixed(3) : 0} seconds</td>
                                </tr>
                                <tr>
                                    <td >All RT</td>
                                    <td>{endTime != 0 ? ((endTime - startTime) / 1000).toFixed(3) : 0} seconds</td>
                                </tr>
                                <tr>
                                    <td >Throughput</td>
                                    <td>{endTime != 0 ? (((endTime - startTime) / 1000) / (selectedFile.size / 1000000)).toFixed(3) : 0} MB/s</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <p>throughput: {endTime != 0 ? (((endTime - startTime) / 1000).toFixed(3) / (selectedFile.size / 1000000)) : 0} MB/s</p> */}
                        {/* {isFilePicked ? selectedFile.size / 1000000 : "wait"} */}
                    </div>
                </div>
                {/* <p>response time: {endTime != 0 ? (endTime - startTime) / 1000 : 0} seconds</p> */}
                {/* <br></br>
                <br></br>
                <br></br>
                <br></br> */}
            </form>
        </>
    )
}
