import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error occurred', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="bg-background min-h-screen text-text flex flex-col items-center justify-center p-5">
      <div className="w-full flex justify-start absolute top-5 left-5">
        <BackButton />
      </div>
      <h1 className="text-4xl font-semibold mb-6">Delete Book</h1>
      {loading && <Spinner />}
      <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h3 className="text-2xl mb-6 text-text-secondary">Are you sure you want to delete this book?</h3>

        <button
          onClick={handleDeleteBook}
          className="w-full bg-red-600 text-background py-3 rounded-lg hover:bg-red-700 transition"
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;


