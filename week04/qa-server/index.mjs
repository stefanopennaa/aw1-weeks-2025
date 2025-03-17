import express from 'express';
import morgan from 'morgan';
import { getQuestion } from './dao.mjs';

// Create an Express application
const app = express();
const port = 3000;

// Middleware for JSON and logging
app.use(express.json());
app.use(morgan('dev'));

/* ROUTES */

// GET /api/questions/<id>
app.get('/api/questions/:id', async (req, res) => {
    try {
        const question = await getQuestion(req.params.id);
        if (question.error) {
            res.status(404).json(question);
        } else {
            res.json(question);
        }
    } catch (err) {
        res.status(500).end();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});