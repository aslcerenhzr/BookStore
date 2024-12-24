import express from 'express';
import { BookAuthorPublisher } from '../models/book_author_relationModel.js';
import { Book } from '../models/bookModel.js';
import { Author } from '../models/authorModel.js';
import { Publisher } from '../models/publisherModel.js';
import { Comment } from '../models/commentModel.js';
import userModel from '../models/userModel.js';

const router = express.Router();

// Kitap, Yazar ve Yayınevi ilişkilendirme API endpoint'i
router.post('/', async (req, res) => {
  try {
    const { book_id, author_id, publisher_id } = req.body;

    // Kitap, yazar ve yayınevinin var olup olmadığını kontrol et
    const book = await Book.findById(book_id);
    const author = await Author.findById(author_id);
    const publisher = await Publisher.findById(publisher_id);

    if (!book || !author || !publisher) {
      return res.status(400).json({ message: 'Invalid book, author, or publisher ID' });
    }

    // Yeni BookAuthorPublisher kaydını oluştur
    const newBookAuthorPublisher = new BookAuthorPublisher({
      book_id,
      author_id,
      publisher_id,
    });

    // Kaydı veritabanına kaydet
    const savedRecord = await newBookAuthorPublisher.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Tüm ilişkilendirmeleri getir
router.get('/', async (req, res) => {
  try {
    const records = await BookAuthorPublisher.find()
      .populate('book_id', 'title') // Kitap başlığını getir
      .populate('author_id', 'name') // Yazar adını getir
      .populate('publisher_id', 'name'); // Yayınevi adını getir

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const record = await BookAuthorPublisher.findOne({ _id: id }) // Make sure you're using _id if it's the primary key
      .populate('book_id', 'title')
      .populate('author_id', 'name')
      .populate('publisher_id', 'name');

    if (!record) {
      return res.status(404).json({ message: 'Record not found for the given book_id' });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// **Yorum Ekleme**
router.post('/addcomment/:_id', async (req, res) => {
  try {
    console.log("hello")
    const { id } = req.params;
    const { comment, rating, user_id } = req.body; // Ensure you're extracting these fields

    const record = await BookAuthorPublisher.findOne({ _id: id }) // Make sure you're using _id if it's the primary key
      .populate('book_id');

    if (!record) {
      return res.status(404).json({ message: 'Record not found for the given book_id' });
    }

    const newComment = new Comment({
      book_id: record.book_id._id,  // Use the actual book ID from the record
      user_id: user_id,  // Use the user ID sent from the frontend
      comment,
      rating
    });

    await newComment.save();

    res.status(201).json(newComment);  // Yorum başarıyla eklendi
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// **Belirli bir kitabın yorumlarını getir**
router.get('/getcomments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({  _id: id  })
      .populate('user_id', 'name') // Kullanıcı adıyla yorumları getir
      .sort({ createdAt: -1 }); // Yorumları en son eklenen üstte olacak şekilde sırala

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
