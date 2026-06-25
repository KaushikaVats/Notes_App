import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";


function Dashboard() {

    const [aiResponse, setAiResponse] = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);
    const [notes, setNotes] = useState([]);


    const [editing, setEditing] = useState(null);


    const [form, setForm] = useState({
        title: "",
        content: "",
        subject: ""
    });



    // Fetch notes
    const getNotes = async () => {

        try {

            const res = await api.get("/notes/my-notes");

            setNotes(res.data);


        } catch (error) {

            console.log(
                error.response?.data
            );

        }

    }




    useEffect(() => {

        getNotes();

    }, []);





    // Create Note
    const createNote = async (e) => {

        e.preventDefault();


        try {


            await api.post("/notes", form);



            setForm({

                title: "",
                content: "",
                subject: ""

            });



            getNotes();


        } catch (error) {

            console.log(error.response?.data);

        }

    }





    // Delete Note
    const deleteNote = async (id) => {


        try {


            await api.delete(`/notes/${id}`);



            setNotes(prev =>
                prev.filter(
                    note => note._id !== id
                )
            );



        } catch (error) {

            console.log(
                error.response?.data
            );

        }

    }

    const askAI = async (type, note) => {

        try {

            setLoadingAI(true);


            let res;


            if (type === "summarize") {

                res = await api.post(
                    "/ai/summarize",
                    {
                        content:
                            note.content
                    }
                );

            }



            if (type === "explain") {

                res = await api.post(
                    "/ai/explain",
                    {
                        content:
                            note.content
                    }
                );

            }



            if (type === "quiz") {

                res = await api.post(
                    "/ai/quiz",
                    {
                        topic:
                            note.subject
                    }
                );

            }



            setAiResponse(
                res.data.summary ||
                res.data.explanation ||
                res.data.quiz
            );


        }
        catch (error) {

            console.log(error.response?.data);

            setAiResponse(
                "AI failed. Try again."
            );

        }
        finally {

            setLoadingAI(false);

        }

    }




    // Put note in edit mode
    const editNote = (note) => {

        setEditing(note);

    }





    // Update Note
    const updateNote = async () => {


        try {


            await api.put(
                `/notes/${editing._id}`,
                editing
            );



            setEditing(null);



            getNotes();



        } catch (error) {


            console.log(
                error.response?.data
            );

        }


    }






    return (


        <div>


            <Navbar />
            <div className="max-w-5xl mx-auto p-6 text-white">
                <h1 className="text-4xl font-bold mb-6">
                    My Notes
                </h1>


                {/* Create Note */}

                <form onSubmit={createNote} className="bg-gray-900 p-6 rounded-lg shadow-md mb-8 flex flex-col gap-4">



                    <input
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value
                            })
                        }
                        className="p-3 rounded bg-gray-800 text-white border border-gray-700"
                    />

                    <input
                        placeholder="Subject"
                        value={form.subject}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                subject: e.target.value
                            })
                        }
                        className="p-3 rounded bg-gray-800 text-white border border-gray-700"
                    />


                    <textarea
                        placeholder="Content"
                        value={form.content}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                content: e.target.value
                            })
                        }
                        className="p-3 rounded bg-gray-800 text-white border border-gray-700 min-h-32"
                    />

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
                    >
                        Create Note
                    </button>



                </form>





                <hr />





                {/* Edit Form */}


                {
                    editing && (

                        <div>


                            <h2>
                                Edit Note
                            </h2>




                            <input

                                value={editing.title}

                                onChange={(e) =>
                                    setEditing({

                                        ...editing,

                                        title: e.target.value

                                    })
                                }

                            />





                            <input

                                value={editing.subject}

                                onChange={(e) =>
                                    setEditing({

                                        ...editing,

                                        subject: e.target.value

                                    })
                                }

                            />





                            <textarea

                                value={editing.content}

                                onChange={(e) =>
                                    setEditing({

                                        ...editing,

                                        content: e.target.value

                                    })
                                }

                            />





                            <button
                                onClick={updateNote}
                            >
                                Save
                            </button>




                            <button
                                onClick={() => {
                                    setEditing(null)
                                }}
                            >
                                Cancel
                            </button>



                        </div>

                    )
                }




                {
                    loadingAI && (
                        <h3>
                            Thinking... 🤖
                        </h3>
                    )
                }


                {
                    aiResponse && (

                        <div>

                            <h2>
                                🤖 AI Response
                            </h2>
                            <button
                                onClick={() => setAiResponse(null)}
                                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white mb-4"
                            >
                                Clear Response
                            </button>



                            {/* QUIZ */}

                            {
                                Array.isArray(aiResponse) && (

                                    aiResponse.map((q, index) => (

                                        <div key={index}>


                                            <h3>
                                                Q{index + 1}. {q.question}
                                            </h3>


                                            <ul>

                                                {
                                                    q.options.map((option, i) => (

                                                        <li key={i}>
                                                            {option}
                                                        </li>

                                                    ))
                                                }

                                            </ul>


                                            <p className="text-green-400 mt-3">
                                                ✅ Answer: {q.answer}
                                            </p>


                                            <hr />


                                        </div>

                                    ))

                                )
                            }






                            {/* SUMMARIZE */}

                            {
                                aiResponse.mainPoints && (

                                    <div>


                                        <h3>
                                            Main Points
                                        </h3>

                                        <div className="text-gray-300 whitespace-pre-wrap">
                                            {
                                                aiResponse.mainPoints.map((point, index) => (

                                                    <p key={index}>
                                                        ✅ {point}
                                                    </p>

                                                ))
                                            }
                                        </div>



                                        <h3>
                                            Important Concepts
                                        </h3>


                                        {
                                            aiResponse.importantConcepts.map((c, index) => (

                                                <p key={index}>
                                                    📌 {c}
                                                </p>

                                            ))
                                        }




                                        <h3>
                                            Explanation
                                        </h3>


                                        <p>
                                            {aiResponse.explanation}
                                        </p>



                                    </div>

                                )
                            }








                            {/* EXPLAIN */}

                            {
                                aiResponse.topic && (

                                    <div>


                                        <h3>
                                            {aiResponse.topic}
                                        </h3>



                                        <p>
                                            {aiResponse.explanation}
                                        </p>





                                        <h3>
                                            Examples
                                        </h3>


                                        {
                                            aiResponse.examples?.map((e, index) => (

                                                <p key={index}>
                                                    💡 {e}
                                                </p>

                                            ))
                                        }





                                        <h3>
                                            Key Points
                                        </h3>


                                        {
                                            aiResponse.keyPoints?.map((k, index) => (

                                                <p key={index}>
                                                    📌 {k}
                                                </p>

                                            ))
                                        }



                                    </div>

                                )
                            }





                        </div>

                    )
                }

                {/* Notes List */}



                {
                    notes.map(note => (

                        <div
                            key={note._id}
                            className="bg-gray-900 rounded-lg p-5 shadow-md mb-5 border border-gray-800"
                        >

                            <h3 className="text-2xl font-bold text-white mb-2">
                                {note.title}
                            </h3>

                            <p className="text-gray-300 mb-4">
                                {note.content}
                            </p>

                            <p className="text-blue-400 mb-3">
                                Subject: {note.subject}
                            </p>

                            <div
                                className="flex flex-wrap gap-2"

                            >

                                <button
                                    onClick={() => editNote(note)}
                                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded text-white"
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    onClick={() => deleteNote(note._id)}
                                    className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white"
                                >
                                    🗑 Delete
                                </button>

                                <button
                                    onClick={() => askAI("summarize", note)}
                                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-white"
                                >
                                    🤖 Summarize
                                </button>

                                <button
                                    onClick={() => askAI("explain", note)}
                                    className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-white"
                                >
                                    📖 Explain
                                </button>

                                <button
                                    onClick={() => askAI("quiz", note)}
                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white"
                                >
                                    📝 Quiz Me
                                </button>

                            </div>

                        </div>

                    ))
                }


            </div>

        </div>


    )

}



export default Dashboard;