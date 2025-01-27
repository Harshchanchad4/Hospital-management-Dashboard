import { useContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import AddNewAdmin from './components/AddNewAdmin';
import AddNewDoctor from './components/AddNewDoctor';
import Login from './components/Login';
import Messages from './components/Messages';
import Doctors from './components/Doctors';
import Sidebar from './components/Sidebar';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { SiDebian } from 'react-icons/si';
import axios from 'axios';
import { Context } from './main';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {

    const { isAuthenticated, setIsAuthenticated, setUser } =
        useContext(Context);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    BASE_URL + "/user/admin/me",
                    {
                        withCredentials: true,
                    }
                );
                setIsAuthenticated(true);
                setUser(response.data.user);
            } catch (error) {
                setIsAuthenticated(false);
                setUser({});
            }
        };
        fetchUser();
    }, [isAuthenticated]);

    return (
        <>
            <Router>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/doctor/addnew" element={<AddNewDoctor />} />
                    <Route path="/admin/addnew" element={<AddNewAdmin />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/doctors" element={<Doctors />} />
                </Routes>
                <ToastContainer position="top-center" />

            </Router>
        </>
    )
}

export default App
