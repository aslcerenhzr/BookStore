import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="bg-background min-h-screen text-text flex flex-col items-center justify-center p-5">
      <div className="w-full flex justify-start absolute top-5 left-5">
        <BackButton />
      </div>
      <h1 className="text-4xl font-semibold mb-6">Edit Book</h1>
      {loading && <Spinner />}
      <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="mb-6">
          <label className="text-lg mb-2 text-text-secondary block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-text-secondary focus:outline-primary bg-background text-text-secondary"
          />
        </div>

        <div className="mb-6">
          <label className="text-lg mb-2 text-text-secondary block">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 rounded-lg border border-text-secondary focus:outline-primary bg-background text-text-secondary"
          />
        </div>

        <div className="mb-6">
          <label className="text-lg mb-2 text-text-secondary block">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full p-3 rounded-lg border border-text-secondary focus:outline-primary bg-background text-text-secondary"
          />
        </div>

        <button
          onClick={handleEditBook}
          className="w-full bg-primary text-background py-3 rounded-lg hover:bg-primary/80 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
