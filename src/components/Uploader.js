import axios from 'axios'
import React, { useState, useEffect } from 'react'

const defaultImageSrc = '/img/image_placeholder.png'

const initialFieldValues = {


    imageSrc: defaultImageSrc,
    imageFile: null
}


export default function Uploader(props) {

    const { addOrEdit, recordForEdit } = props

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
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
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

    const handleFormSubmit = e => {
        e.preventDefault()
        setEndTime(0);
        const formData = new FormData()
        formData.append('imageData', values.imageSrc);
        // setTime({ ...time, sendTime: new Date().getTime() })
        // console.log("set start time");
        setStartTime(new Date().getTime());
        axios({
            method: "post",
            url: url,
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

        console.log(values.imageSrc);
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
                {/* <p className="lead">send time: {time.sendTime}</p>
                <p className="lead">end time: {time.endTime}</p> */}

                <p className="lead">{(time.endTime - time.sendTime) / 1000}</p>
                <p>start time is: {time.sendTime}, end time is: {time.endTime}</p>

                <button onClick={handleSetTime}>set Start</button>
                <button onClick={handleEndTime}>set end</button>

                {/* <p className="lead">{JSON.stringify(time)}</p> */}

                <p className="lead">{props.name}</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={values.imageSrc} className="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            {/* <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')} */}
                            <input type="file" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader" />
                        </div>

                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-secondary">Upload</button>
                        </div>
                        <h5 class="card-title">Time Calculation</h5>
                        <p class="card-text">Tire - 3 to Tire - 2 = None</p>
                        <p class="card-text">Tire - 2 to Tire - 1 = {new Date().getTime() - new Date().getTime()}</p>
                    </div>
                </div>
                <p>response time: {endTime != 0 ? (endTime - startTime) / 1000 : 0} seconds</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </form>
        </>
    )
}
