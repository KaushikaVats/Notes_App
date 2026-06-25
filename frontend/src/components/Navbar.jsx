import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">

            <h1 className="text-2xl font-bold">
                📚 NotesAI
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;