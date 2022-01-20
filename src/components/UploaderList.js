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
