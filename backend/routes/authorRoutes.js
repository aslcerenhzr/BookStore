import express from 'express';
import { Author } from '../models/authorModel.js';

const router = express.Router();

// Route for Save a new Author
router.post('/', async (req, res) => {
  try {
    // Validate the required fields
    if (!req.body.name) {
      return res.status(400).send({
        message: 'Send all required fields: name',
      });
    }

    // Create a new author object
    const newAuthor = {
      name: req.body.name,
    };

    // Save the new author to the database
    const author = await Author.create(newAuthor);

    return res.status(201).send(author);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All Authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find({});

    return res.status(200).json({
      count: authors.length,
      data: authors,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get One Author by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).send({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update an Author
router.put('/:id', async (req, res) => {
  try {
    // Validate the required fields
    if (!req.body.name || !req.body.birthYear) {
      return res.status(400).send({
        message: 'Send all required fields: name, birthYear',
      });
    }

    const { id } = req.params;

    const result = await Author.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).send({ message: 'Author updated successfully', author: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete an Author
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Author.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).send({ message: 'Author deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
