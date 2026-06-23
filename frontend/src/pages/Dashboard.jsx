import { useEffect, useState } from "react";
import api from "../api/axios";


function Dashboard() {

    const [aiResponse, setAiResponse] = useState("");
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


            <h1>
                My Notes
            </h1>





            {/* Create Note */}

            <form onSubmit={createNote}>


                <input

                    placeholder="Title"

                    value={form.title}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value
                        })
                    }

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


                />



                <button>
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


                                        <p>
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


                                    {
                                        aiResponse.mainPoints.map((point, index) => (

                                            <p key={index}>
                                                ✅ {point}
                                            </p>

                                        ))
                                    }




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



                    <div key={note._id}>


                        <h3>
                            {note.title}
                        </h3>



                        <p>
                            {note.content}
                        </p>



                        <p>

                            Subject:
                            {note.subject}

                        </p>





                        <button

                            onClick={() =>
                                deleteNote(note._id)
                            }

                        >

                            Delete

                        </button>






                        <button

                            onClick={() =>
                                editNote(note)
                            }

                        >

                            Edit

                        </button>

                        <button
                            onClick={() => askAI("summarize", note)}
                        >
                            🤖 Summarize
                        </button>


                        <button
                            onClick={() => askAI("explain", note)}
                        >
                            🤖 Explain
                        </button>


                        <button
                            onClick={() => askAI("quiz", note)}
                        >
                            🤖 Quiz Me
                        </button>

                    </div>



                ))
            }





        </div>

    )

}



export default Dashboard;