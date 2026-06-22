const Groq = require("groq-sdk");


const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});



// Common AI function
const generateAI = async (prompt) => {

    if (!process.env.GROQ_API_KEY) {
        throw new Error("Missing Groq API key");
    }


    const response = await client.chat.completions.create({

        model: "llama-3.1-8b-instant",

        messages: [
            {
                role: "user",
                content: prompt
            }
        ]

    });


    return response.choices[0].message.content;
};





// General AI chat
const askAI = async (req, res) => {

    try {

        const { prompt } = req.body;


        if (!prompt) {
            return res.status(400).json({
                message: "Prompt is required"
            });
        }


        const answer = await generateAI(prompt);


        res.status(200).json({
            answer
        });



    } catch (error) {

        console.log("AI Error:", error.message);

        res.status(503).json({
            message: "AI service temporarily unavailable"
        });

    }
};







// Summarize content
const summarize = async (req, res) => {

    try {

        const { content } = req.body;


        if (!content) {
            return res.status(400).json({
                message: "Content is required"
            });
        }



        const summary = await generateAI(
            `
Summarize this content.

Give:
- main points
- important concepts
- simple explanation

Content:

${content}
`
        );


        res.status(200).json({
            summary
        });



    } catch (error) {

        console.log("AI Error:", error.message);

        res.status(503).json({
            message: "AI service temporarily unavailable"
        });

    }
};









// Generate quiz
const quiz = async (req, res) => {

    try {

        const { topic } = req.body;


        if (!topic) {
            return res.status(400).json({
                message: "Topic is required"
            });
        }



        const quiz = await generateAI(
            `
Create a quiz on ${topic}.

Make 5 multiple choice questions.

Return ONLY valid JSON.

Format:

[
 {
   "question":"",
   "options":["","","",""],
   "answer":""
 }
]
`
        );


        res.status(200).json({
            quiz
        });



    } catch (error) {

        console.log("AI Error:", error.message);

        res.status(503).json({
            message: "AI service temporarily unavailable"
        });

    }
};









// Explain topic
const explain = async (req, res) => {

    try {

        const { content } = req.body;


        if (!content) {
            return res.status(400).json({
                message: "Content is required"
            });
        }



        const explanation = await generateAI(
            `
Explain this topic like I am a beginner.

Use:
- simple words
- examples
- real life analogy

Topic:

${content}
`
        );



        res.status(200).json({
            explanation
        });



    } catch (error) {

        console.log("AI Error:", error.message);

        res.status(503).json({
            message: "AI service temporarily unavailable"
        });

    }
};


module.exports = {
    askAI,
    summarize,
    quiz,
    explain
};