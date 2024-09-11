import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import GetAllUsersList from "../components/users/get_all_users/get_all_users_list";
import CreateUserForm from "../components/users/create_user/create_user_form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/Layouts/loading_component";

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllUsers = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/users`);
            setUsers(data);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <Layout title={"All Users"}>
            <div className="container mt-4">
                <div className="px-2 d-flex justify-content-between">
                    <h1>All Users</h1>
                    <CreateUserForm getAllUsers={getAllUsers} />
                </div>
                <GetAllUsersList users={users} getAllUsers={getAllUsers}/>
            </div>
        </Layout>
    );
};

export default HomePage;
