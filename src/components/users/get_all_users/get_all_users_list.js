import React from "react";
import Layout from "../../Layouts/Layout";
import axios from "axios";
import toast from 'react-hot-toast';

const GetAllUsersList = ({ users = [], getAllUsers }) => {
    const handleDelete = async (id) => {
        try {
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/user/delete/${id}`
            );
            if (data.success) {
                toast.success(`User deleted successfully`);

                getAllUsers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    {users.length > 0 ? (
                        users.map((u) => (
                            <div className="col-md-4 mb-4" key={u._id}>
                                <div className="card border-4">
                                    <div className="card-body">
                                        <p className="card-text">
                                            <label className="fw-bold">Name :</label> {u.name}
                                        </p>
                                        <p className="card-text">
                                            <label className="fw-bold">Gender :</label> {u.gender}
                                        </p>
                                        <p className="card-text">
                                            <label className="fw-bold">Address:</label> {u.address}
                                        </p>
                                        <p className="card-text">
                                            <label className="fw-bold">Amount:</label> {u.amount}
                                        </p>
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => { handleDelete(u._id) }}
                                            >
                                                Delete User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default GetAllUsersList;
