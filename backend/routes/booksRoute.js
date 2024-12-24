import express from 'express';
import { Book } from '../models/bookModel.js';
//import {userModel} from '../models/userModel.js'

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Kitapları yazar veya türe göre filtrele
router.get('/books/search', async (req, res) => {
  const { author, genre } = req.query;

  const query = {};
  if (author) query.author = { $regex: author, $options: 'i' }; // Case-insensitive arama
  if (genre) query.genre = { $regex: genre, $options: 'i' };

  const books = await Book.find(query);
  res.json(books);
});

// Favori kitapları ekleme
router.post('/favorites/:id', async (req, res) => {
  const userId = req.userId; // Kullanıcı ID'si, auth middleware'inden geliyor
  const { id } = request.params;
  try {
    const user = await userModel.findById(userId);

    // Eğer kitap zaten favorilerdeyse, çıkar
    if (user.favoriteBooks.includes(id)) {
      return res.status(400).json({ message: "This book is already in your favorites" });
    }

    // Kitap ekle
    user.favoriteBooks.push(bookId);
    await user.save();

    res.status(200).json({ message: "Book added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding book to favorites" });
  }
});

// Favori kitapları çıkarma
router.delete('/favorites/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Kullanıcı ID'si, auth middleware'inden geliyor

  try {
    const user = await userModel.findById(userId);

    // Eğer kitap favorilerde değilse, hata döndür
    if (!user.favoriteBooks.includes(id)) {
      return res.status(400).json({ message: "This book is not in your favorites" });
    }

    // Kitap çıkar
    user.favoriteBooks = user.favoriteBooks.filter((id) => !id.equals(id));
    await user.save();

    res.status(200).json({ message: "Book removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing book from favorites" });
  }
});

//
router.get('/books/getauthorandbook', async (req, res) => {
  try {
    const books = await Book.find().populate("authorId", "name");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
