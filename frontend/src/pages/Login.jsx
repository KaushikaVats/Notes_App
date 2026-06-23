import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


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


            navigate("/");


        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }


    }





    return (

        <div>

            <h2>Login</h2>


            <form onSubmit={handleSubmit}>


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
                    Login
                </button>


            </form>


        </div>

    )


}


export default Login;