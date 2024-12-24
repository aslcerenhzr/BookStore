import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({}); // Kitap verisi
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [comment, setComment] = useState(''); // Yeni yorum
  const [comments, setComments] = useState([]); // Yorumlar dizisi
  const { id } = useParams(); // Parametre: kitap id'si

  // Kitap verisini al
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/relations/${id}`) // Kitap verisini al
      .then((response) => {
        setBook(response.data); // Kitap bilgilerini kaydet
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  // Yorumları Al
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/relations/getcomments/${id}`) // Yorumları al
      .then((response) => {
        setComments(response.data); // Yorumları kaydet
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  // Yorum ekleme fonksiyonu
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const bookId = book._id; // Book ID
      const userId = 'actual-user-id'; // Replace with actual user ID from your auth system
  
      const newComment = {
        book_id: bookId,
        user_id: userId,
        comment,
        rating: 5, // Static rating (or replace with dynamic value)
      };
  
      axios
        .post(`http://localhost:5555/relations/addcomment/${id}`, newComment)
        .then((response) => {
          setComments((prevComments) => [...prevComments, response.data]); // Add the new comment
          setComment(''); // Clear the comment field
        })
        .catch((error) => {
          console.error('Error adding comment:', error);
        });
    } else {
      alert('Comment cannot be empty');
    }
  };
  

  return (
    <div className="bg-background min-h-screen text-text flex flex-col items-center justify-center p-5">
      <BackButton />
      <h1 className="text-3xl font-bold my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-lg text-text-secondary space-y-4">
          {/* Kitap Bilgileri */}
          <div className="flex justify-between">
            <span className="font-semibold">Id:</span>
            <span>{book._id || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Title:</span>
            <span>{book.book_id?.title || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Author:</span>
            <span>{book.author_id?.name || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Publisher:</span>
            <span>{book.publisher_id?.name || 'N/A'}</span>
          </div>

          {/* Yorumlar */}
          <div className="my-6">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <div className="space-y-2">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="bg-gray-200 p-3 rounded-md shadow-sm">
                    <p>
                      <strong>{comment.user_id?.name || 'Anonymous'}:</strong> {comment.comment}
                    </p>
                    <span>Rating: {comment.rating || 'N/A'}</span>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>

          {/* Yorum ekleme formu */}
          <div className="mt-4">
            <textarea
              className="w-full p-3 bg-gray-100 rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
