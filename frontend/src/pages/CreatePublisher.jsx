import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreatePublisher = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSavePublisher = () => {
    const data = {
      name,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/publishers', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Publisher Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating publisher', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="bg-background min-h-screen text-text flex flex-col items-center p-5">
      <div className="w-full flex justify-start absolute top-5 left-5">
        <BackButton />
      </div>
      <h1 className="text-4xl font-semibold mb-6">Create Publisher</h1>
      {loading && <Spinner />}
      <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="mb-6">
          <label className="text-lg mb-2 text-text-secondary block">Publisher Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-text-secondary focus:outline-primary bg-background text-text-secondary"
          />
        </div>
        <button
          className="w-full bg-primary text-background py-3 rounded-lg hover:bg-primary/80 transition"
          onClick={handleSavePublisher}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePublisher;
