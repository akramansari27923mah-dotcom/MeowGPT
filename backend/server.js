import app from './src/app.js';
import 'dotenv/config'

const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
})

