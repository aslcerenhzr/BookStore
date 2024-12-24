import React, { useState, useEffect } from "react";
import axios from "axios";

const PopularBooks = () => {
  const [books, setBooks] = useState([]); // Kitap sonuçları
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  useEffect(() => {
    // Google Books API'den en yeni 5 kitabı çekmek için orderBy='newest' ve maxResults=5 kullanıyoruz
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=bestsellers+new+books&orderBy=newest&maxResults=5&key=AIzaSyDMm29tXvDrc6rl9kJlQKEg3RXZvRdzpVg`
      )
      .then((response) => {
        // Eğer 'items' mevcutsa, books state'ine atama yap
        if (response.data.items) {
          setBooks(response.data.items); // Gelen kitapları state'e ekle
        } else {
          setBooks([]); // Eğer 'items' yoksa boş bir dizi ata
        }
        setLoading(false); // Yükleme tamamlandı
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks([]); // Hata durumunda boş bir dizi ata
        setLoading(false); // Yükleme tamamlandı
      });
  }, []);

  return (
    <div className="popular-books-container my-8 p-4 bg-background rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-text mb-4">5 New Books</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="text-primary">Loading...</span> {/* Yükleniyor metni */}
        </div>
      ) : (
        <div>
          {books.length > 0 ? (
            <ul className="space-y-4">
              {books.map((book) => (
                <li key={book.id} className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-primary">{book.volumeInfo.title}</h3>
                  <p className="font-semibold text-primary">{book.volumeInfo.authors?.join(", ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text">No new books found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PopularBooks;

