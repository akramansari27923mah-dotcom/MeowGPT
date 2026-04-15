import express from 'express';
import cors from 'cors';
import growRouter from './router/groq.routes.js'

const app = express()
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://akramdev.vercel.app"
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
}))

app.use(express.json())


// PREFIX
app.use('/api/groq', growRouter)

app.get('/me', (req, res) => {
    res.send('api is running')
})

export default app