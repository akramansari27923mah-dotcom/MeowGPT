import axios from "axios";

const api = axios.create({
    baseURL: 'https://meowgpt-6bsg.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

const sendMessage = async (message, history = []) => {
    const res = await api.post('/api/groq', {
        message,
        history
    });

    return res.data
}

export default sendMessage