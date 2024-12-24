import express from 'express';
import { Comment } from '../models/commentModel.js';
import { Book } from '../models/bookModel.js';
import userModel from '../models/userModel.js'; // Kullanıcı modeli

const router = express.Router();

// **Yorum Ekleme**
router.post('/', async (req, res) => {
  const { book_id, user_id, comment, rating } = req.body;

  try {
    // Kitap ve kullanıcıyı kontrol et
    const book = await Book.findById(book_id);
    const user = await userModel.findById(user_id);

    if (!book) return res.status(400).json({ message: 'Book not found' });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Yeni yorum oluştur
    const newComment = new Comment({
      book_id,
      user_id,
      comment,
      rating,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// **Belirli bir kitabın yorumlarını getir**
router.get('/:book_id', async (req, res) => {
  const { book_id } = req.params;

  try {
    const comments = await Comment.find({ book_id })
      .populate('user_id', 'name') // Kullanıcı adıyla yorumları getir
      .sort({ createdAt: -1 }); // Yorumları en son eklenen üstte olacak şekilde sırala

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

