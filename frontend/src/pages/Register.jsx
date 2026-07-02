import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", form);

            alert("Registered successfully");

            navigate("/login");


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-950">

            <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">

                <h2 className="text-4xl font-bold text-center text-white mb-2">
                    Create Account 🚀
                </h2>

                <p className="text-center text-gray-400 mb-8">
                    Join NotesAI and start organizing smarter.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="name"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        className="w-full bg-green-600 hover:bg-green-700 transition duration-300 py-3 rounded-lg text-white font-semibold text-lg"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>

    );


}


export default Register;