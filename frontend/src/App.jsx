import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import CreateAuthor from './pages/CreateAuthor';
import CreatePublisher from './pages/CreatePublisher';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App">

        <Routes>
          {/* Ana Sayfa */}
          <Route path="/" element={<Home />} />

          {/* Kitap İşlemleri */}
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
          
          {/* Yorumlar */}
          <Route path="/relations/:id" element={<ShowBook />} />

          {/* Yazar ve Yayıncı İşlemleri */}
          <Route path="/authors/create" element={<CreateAuthor />} />
          <Route path="/publisher/create" element={<CreatePublisher />} />

          {/* Kullanıcı İşlemleri */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
};

export default App;
