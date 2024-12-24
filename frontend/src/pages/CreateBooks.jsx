import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [authorsList, setAuthorsList] = useState([]);
  const [publishersList, setPublishersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get('http://localhost:5555/authors')
      .then(response => setAuthorsList(response.data.data))
      .catch((error) => {
        enqueueSnackbar('Error fetching authors', { variant: 'error' });
        console.log(error);
      });

    axios.get('http://localhost:5555/publishers')
      .then(response => setPublishersList(response.data.data))
      .catch((error) => {
        enqueueSnackbar('Error fetching publishers', { variant: 'error' });
        console.log(error);
      });
  }, []);

  const handleSaveBook = () => {
    const bookData = { title };
    setLoading(true);

    axios
      .post('http://localhost:5555/books', bookData)
      .then((response) => {
        const bookId = response.data._id;
        const bookAuthorPublisherData = {
          book_id: bookId,
          author_id: author,
          publisher_id: publisher,
        };

        return axios.post('http://localhost:5555/relations', bookAuthorPublisherData);
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book and its relations created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating book or its relations', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="bg-background min-h-screen text-text flex flex-col items-center justify-center p-5">
      <div className="w-full flex justify-start absolute top-5 left-5">
        <BackButton />
      </div>
      <h1 className="text-4xl font-semibold mb-6">Create Book</h1>
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
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 rounded-lg border border-text-secondary focus:outline-primary bg-background text-text-secondary"
          >
            <option value="">Select Author</option>
            {Array.isArray(authorsList) && authorsList.length > 0 ? (
              authorsList.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))
            ) : (
              <option disabled>No authors available</option>
            )}
          </select>
        </div>

        <div className="mb-6">
          <label className="text-lg mb-2 text-text-secondary block">Publisher</label>
          <select
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="w-full p-3 rounded-lg border border-text-secondary focus:outline-primary bg-background text-text-secondary"
          >
            <option value="">Select Publisher</option>
            {Array.isArray(publishersList) && publishersList.length > 0 ? (
              publishersList.map((publisher) => (
                <option key={publisher._id} value={publisher._id}>
                  {publisher.name}
                </option>
              ))
            ) : (
              <option disabled>No publishers available</option>
            )}
          </select>
        </div>

        <button
          className="w-full bg-primary text-background py-3 rounded-lg hover:bg-primary/80 transition"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;

