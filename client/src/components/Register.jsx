import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations"
import Auth from "../utils/auth"

const Register = () => {
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserFormData({ ...userFormData, [name]: value});
    };

    const handleFormSubmit = async (event) => {
     event.preventDefault()
     
        // add form validation here

    try {
        const { data } = await addUser({
            variables: {... userFormData},
        });
    } catch (err) {
         console.error(err);
          setShowalert(true);
         }

         setUserFormData({
             username: "",
             email: "",
             password: "",
         })
    };

    return (
        <div className="flex flex-col mx-auto max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
    <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
        Create a new account
    </div>
    <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
        Already have an account ?
        <Link to="/login" className="text-sm text-blue-500 underline hover:text-blue-700">
							Sign in
						</Link>
    </span>
    <div className="p-6 mt-8">
        <form action="#">
            <div className="flex flex-col mb-2">
                <div className=" relative ">
                    <input type="text" name="username" onChange={handleInputChange} value={userFormData.username} required className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Username"/>
                    </div>
                </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input type="text" name="email" onChange={handleInputChange} value={userFormData.email} required className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                                </div>
                            </div>
                <div className="flex flex-col mb-2">
                <div className=" relative ">
                    <input type="password" name="password" onChange={handleInputChange} value={userFormData.password} required className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Password"/>
                    </div>
                </div>
                            <div className="flex w-full my-4">
                                <button type="submit" onSubmit={handleFormSubmit} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Login
                                </button>
                            </div>
                        </form>
            </div>
        </div>

    )
}

export default Register