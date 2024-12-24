import express from 'express';
import { Publisher } from '../models/publisherModel.js';

const router = express.Router();

// Route for Save a new Publisher
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: 'Send all required fields: name',
      });
    }

    const newPublisher = {
      name: req.body.name,
    };

    const publisher = await Publisher.create(newPublisher);

    return res.status(201).send(publisher);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All Publishers
router.get('/', async (req, res) => {
  try {
    const publishers = await Publisher.find({});

    return res.status(200).json({
      count: publishers.length,
      data: publishers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get One Publisher by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const publisher = await Publisher.findById(id);

    return res.status(200).json(publisher);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Publisher
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: 'Send all required fields: name',
      });
    }

    const { id } = req.params;

    const result = await Publisher.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Publisher not found' });
    }

    return res.status(200).send({ message: 'Publisher updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a Publisher
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Publisher.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Publisher not found' });
    }

    return res.status(200).send({ message: 'Publisher deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
