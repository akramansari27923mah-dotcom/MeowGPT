import express from 'express';
import groq from '../controller/groq.controller.js';

const router = express.Router();

router.post('/', groq)

export default router