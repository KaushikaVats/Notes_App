import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {


    const navigate = useNavigate();


    const [form, setForm] = useState({
        email: "",
        password: ""
    });



    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            const res = await api.post(
                "/auth/login",
                form
            );



            localStorage.setItem(
                "token",
                res.data.token
            );



            alert("Login successful");


            navigate("/dashboard");


        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }


    }





    return (

        <div className="min-h-screen bg-gray-950 flex items-center justify-center">

            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">

                <h2 className="text-4xl font-bold text-center text-white mb-2">
                    Welcome Back 👋
                </h2>

                <p className="text-center text-gray-400 mb-8">
                    Login to your NotesAI account
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-3 rounded-lg"
                    >
                        Login
                    </button>

                </form>
                <p className="text-center text-gray-400 mt-6">
                    New to NotesAI?{" "}
                    <Link
                        to="/register"
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>

    );


}


export default Login;