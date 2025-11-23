import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const [message, setMessage] = useState("")
    const { logInUser, signInWIthGoogle } = useAuth()
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
            await logInUser(data.email, data.password)
            alert("Logged In successfully")
            navigate('/')
        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWIthGoogle()
            alert("Logged In successfully")
            navigate('/')
        } catch (error) {
            alert("Google sign in failed")
            console.error(error)
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm rounded mx-auto bg-white shadow-md px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email" id='email' placeholder='Email Address' name='email'
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
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none'>
                            Login
                        </button>
                    </div>

                </form>

                <p className='mt-4 font-medium text-sm align-baseline'>Haven't an account? Please
                    <Link className='text-blue-500 hover:text-blue-700' to='/register'> Register</Link>
                </p>

                {/* google sign in */}
                <div className='mt-4'>
                    <button onClick={handleGoogleSignIn} className='w-full flex justify-center items-center gap-1 flex-wrap font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 text-white bg-secondary'>
                        <FaGoogle className='mr-2' />
                        Sign in with google
                    </button>
                </div>

                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>

            </div>
        </div>
    )
}

export default Login
