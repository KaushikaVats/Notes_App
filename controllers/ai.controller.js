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
Return ONLY JSON.
No markdown.
No backticks.

Format:

{
 "mainPoints":[
   "point 1",
   "point 2",
   "point 3"
 ],
 "importantConcepts":[
   "concept 1",
   "concept 2"
 ],
 "explanation":"simple explanation"
 }


Content:

${content}
`
        );


        let parsedSummary;


        try {

            parsedSummary = JSON.parse(summary);

        } catch (err) {

            console.log("JSON parse failed");

            parsedSummary = {
                mainPoints: [summary],
                importantConcepts: [],
                explanation: ""
            };

        }



        res.status(200).json({
            summary: parsedSummary
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
            quiz: JSON.parse(quiz)
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
Return ONLY valid JSON.

Do not use markdown.
Do not add backticks.

Format:

{
 "topic":"topic name",
 "explanation":"simple beginner friendly explanation",
 "examples":[
    "example 1",
    "example 2"
 ],
 "keyPoints":[
    "point 1",
    "point 2"
 ]
}


Explain this topic:

${content}

`
        );



        let parsedExplanation;


        try {

            parsedExplanation = JSON.parse(explanation);


        } catch (error) {


            console.log("JSON parse failed");


            parsedExplanation = {

                topic: "Explanation",

                explanation: explanation,

                examples: [],

                keyPoints: []

            };

        }




        res.status(200).json({

            explanation: parsedExplanation

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