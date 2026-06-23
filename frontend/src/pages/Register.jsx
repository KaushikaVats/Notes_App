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

        <div>

            <h2>Register</h2>


            <form onSubmit={handleSubmit}>


                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />


                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />


                <button>
                    Register
                </button>


            </form>


        </div>

    )


}


export default Register;