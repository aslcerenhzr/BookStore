import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import PopularBooks from "../components/PopularBooks"; 

const Home = () => {
  const [books, setBooks] = useState([]); // Kitap verileri için state
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [showType, setShowType] = useState("table"); // Görüntüleme türü: tablo veya kart
  const [search, setSearch] = useState(""); // Arama terimi
  const [user, setUser] = useState(null); // Kullanıcı bilgisi

  // Filtrelenmiş kitaplar
  const filteredBooks = books.filter((book) =>
    book.book_id.title.toLowerCase().includes(search.toLowerCase())
  );

  // Verileri API'den çek
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/relations")
      .then((response) => {
        console.log(response.data); // Debug için
        setBooks(response.data); // Doğrudan gelen veriyi `books` state'e atıyoruz
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, []);

  // Kullanıcı oturum bilgilerini kontrol et
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    try {
      // Eğer currentUser varsa ve JSON parse edilebilirse
      setUser(currentUser ? JSON.parse(currentUser) : null);
    } catch (error) {
      console.error("Failed to parse currentUser:", error);
      setUser(null); // Hatalı JSON varsa kullanıcıyı null olarak ayarla
    }
  }, []);

  // Favori kitap ekleme/çıkarma işlemi
  const handleFavorite = (bookId) => {
    if (user) {
      const updatedFavorites = user.favoriteBooks.includes(bookId)
        ? user.favoriteBooks.filter((id) => id !== bookId) // Kitap favorilerden çıkarılıyor
        : [...user.favoriteBooks, bookId]; // Kitap favorilere ekleniyor

      // Favori kitapları güncellemek için backend API'sine istek gönderebiliriz.
      axios
        .put(`http://localhost:5555/favorites/${user._id}`, {
          favoriteBooks: updatedFavorites,
        })
        .then((response) => {
          // Favori kitaplar güncellendikten sonra kullanıcı bilgisini güncelle
          setUser(response.data);
          localStorage.setItem("currentUser", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error updating favorite books:", error);
        });
    }
  };

  const handleLogout = () => {
    // Kullanıcıyı logout yap
    localStorage.removeItem("currentUser");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="bg-background min-h-screen text-text p-4">
      {/* Navbar Benzeri Kullanıcı Bilgisi */}
      <div className="flex justify-end gap-x-6 mb-6">
        {user ? (
          <>
            <div className="flex items-center gap-x-4">
              <span className="font-bold text-primary">Welcome, {user.name}!</span>
              <Link to="/profile" className="text-primary hover:text-primary/80">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-primary hover:text-primary/80"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-primary hover:text-primary/80">
              Login
            </Link>
            <Link to="/register" className="text-primary hover:text-primary/80">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Arama Çubuğu */}
      <div className="my-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ color: "black" }}
          className="p-2 border rounded w-full sm:w-80 md:w-96 lg:w-1/2 placeholder:text-gray-500 focus:outline-none"
          placeholder="Search books by name..."
        />
      </div>

      {/* Görünüm Tipi Seçimi */}
      <div className="flex justify-end gap-x-4 mb-6">
        <button
          className="bg-primary hover:bg-primary/80 px-4 py-2 rounded-lg text-background"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-primary hover:bg-primary/80 px-4 py-2 rounded-lg text-background"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      {/* Başlık ve Ekleme Linkleri */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books List</h1>
        <div className="flex gap-x-4">
          {/* Kullanıcı adminse ekleme linklerini göster */}
          {user && user.isAdmin && (
            <>
              <Link to="/books/create" className="text-primary hover:text-primary/80">
                <MdOutlineAddBox className="text-4xl" />
              </Link>
              <Link to="/authors/create" className="text-primary hover:text-primary/80">
                <MdOutlineAddBox className="text-4xl" />
              </Link>
              <Link to="/publisher/create" className="text-primary hover:text-primary/80">
                <MdOutlineAddBox className="text-4xl" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Verilerin Gösterimi */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={filteredBooks} user={user} handleFavorite={handleFavorite} />
      ) : (
        <BooksCard books={filteredBooks} user={user} handleFavorite={handleFavorite} />
      )}

      {/* Popüler Kitaplar Kutusu */}
      <PopularBooks /> 
    </div>
  );
};

export default Home;

