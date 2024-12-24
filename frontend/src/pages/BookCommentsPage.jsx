import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookCommentsPage = () => {
  const { bookId } = useParams(); // URL'den bookId'yi alır
  const [book, setBook] = useState(null); // Kitap detayları
  const [comments, setComments] = useState([]); // Yorumlar

  // Kitap ve yorumları yükleme
  useEffect(() => {
    const fetchBookAndComments = async () => {
      try {
        // Kitap detaylarını getir
        const bookResponse = await axios.get(`http://localhost:5555/books/${bookId}`);
        setBook(bookResponse.data);

        // Kitaba ait yorumları getir
        const commentsResponse = await axios.get(`http://localhost:5555/comments/${bookId}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching book or comments:', error);
      }
    };

    fetchBookAndComments();
  }, [bookId]);

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
        </div>
      ) : (
        <p>Kitap bilgisi yükleniyor...</p>
      )}

      <h2>Yorumlar</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
            <p><strong>Yorum:</strong> {comment.comment}</p>
            <p><strong>Puan:</strong> {comment.rating} Yıldız</p>
            <p><strong>Yazan:</strong> {comment.user_id.name}</p>
          </div>
        ))
      ) : (
        <p>Bu kitaba henüz yorum yapılmamış.</p>
      )}
    </div>
  );
};

export default BookCommentsPage;
