import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5001',
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