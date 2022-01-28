import React, { useState, useEffect } from 'react'
import Uploader from './Uploader'
import axios from "axios";

export default function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshEmployeeList();
    }, [])

    const employeeAPI = (url = 'https://localhost:44353/api/Employee/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshEmployeeList() {
        employeeAPI().fetchAll()
            .then(res => {
                setEmployeeList(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('employeeID') == "0")
            employeeAPI().create(formData)
                .then(res => {
                    onSuccess();
                    refreshEmployeeList();
                })
                .catch(err => console.log(err))
        else
            employeeAPI().update(formData.get('employeeID'), formData)
                .then(res => {
                    onSuccess();
                    refreshEmployeeList();
                })
                .catch(err => console.log(err))

    }

    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            employeeAPI().delete(id)
                .then(res => refreshEmployeeList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.employeeName}</h5>
                <span>{data.occupation}</span> <br />
                <button className="btn btn-light" onClick={e => onDelete(e, parseInt(data.employeeID))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )


    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">ASP BACKEND</h1>
                    </div>
                </div>
            </div>

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active btn" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">MySql</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link btn" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Sql Server</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link btn" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Oracle</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link btn" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">MS - Access</a>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">

                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div >
                        <Uploader
                            addOrEdit={addOrEdit}
                            name="My Sql"
                            recordForEdit={recordForEdit}
                        />
                    </div>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <Uploader
                        addOrEdit={addOrEdit}
                        name="MYSQL"
                        recordForEdit={recordForEdit}
                    />

                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <div >
                        <Uploader
                            addOrEdit={addOrEdit}
                            name="Oracle"
                            recordForEdit={recordForEdit}
                        />
                    </div>
                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="access-tab">
                    <div >
                        <Uploader
                            addOrEdit={addOrEdit}
                            name="MYSQL"
                            recordForEdit={recordForEdit}
                        />
                    </div>
                </div>
            </div>






            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">PHP BACKEND</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="MYSQL"
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="SQL-Server"
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="MS - Access"
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="Oracle"
                    recordForEdit={recordForEdit}
                />
            </div>

            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">PYTHON BACKEND</h1>
                    </div>
                </div>
            </div><div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="MYSQL"
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="SQL-Server"
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="MS - Access"
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-3">
                <Uploader
                    addOrEdit={addOrEdit}
                    name="Oracle"
                    recordForEdit={recordForEdit}
                />
            </div>





        </div>
    )
}
