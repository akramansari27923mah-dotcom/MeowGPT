import Groq from "groq-sdk";
import 'dotenv/config';

const GroqClient = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const groq = async (req, res) => {
    try {
        const { message, history } = req.body;

        const safeHistory = Array.isArray(history) ? history : []

        const Completion = await GroqClient.chat.completions.create({
            model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful AI assistant.
Respond like ChatGPT:
- Use clear headings
- Use bullet points where helpful
- Structure answers in sections
- Format in markdown
- Be concise but helpful
`
                },
                ...safeHistory,
                {
                    role: 'user',
                    content: message
                }
            ]
        })

        res.json({
            reply: Completion.choices[0]?.message?.content || ''
        })

    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: 'GROQ API FAILDE'
        })
    }
}

export default groq