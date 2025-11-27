import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import getBaseUrl from '../utils/getBaseUrl'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log("response - ", response);

            const auth = response.data
            console.log("auth - ", auth);
            if (auth.token) {
                localStorage.setItem('token', auth.token)
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert("Token has expired!, Please login agani")
                    navigate('/')
                }, 3600 * 1000);
            }
            alert('Admin login successful')
            navigate("/dashboard")
        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    };
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-full max-w-sm rounded mx-auto bg-white shadow-md px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">
                            Username
                        </label>
                        <input
                            {...register("username", { required: true })}
                            type="text" id='username' placeholder='Username' name='username'
                            className='border shadow rounded w-full py-2 px-3 appearance-none leading-tight focus:outline-none focus:shadow' />
                    </div>

                    <div className='mt-4 mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: true })}
                            type="password" id='password' placeholder='Password' name='password'
                            className='border shadow rounded w-full py-2 px-3 appearance-none leading-tight focus:outline-none focus:shadow' />
                    </div>

                    {message && <p className='text-sm text-red-500 mb-3 italic'>{message}</p>}

                    <div>
                        <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none'>
                            Login
                        </button>
                    </div>

                </form>

                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>

            </div>
        </div>
    )
}

export default AdminLogin
