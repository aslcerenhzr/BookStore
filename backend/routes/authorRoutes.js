import express from 'express';
import { Author } from '../models/authorModel.js';

const router = express.Router();

//Kitap Eklemek
router.post('/authors', async (req, res) => {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.json(newAuthor);
});

export default router;