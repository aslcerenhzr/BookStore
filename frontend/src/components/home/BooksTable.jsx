import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdFavorite, MdFavoriteBorder } from "react-icons/md";

const BooksTable = ({ books, user, handleFavorite }) => {
  // Favori kitapları kontrol et: user.favoriteBooks varsa, yoksa boş bir dizi
  const favoriteBooks = user?.favoriteBooks || [];

  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publisher
          </th>
          {user && (
            <th className="border border-slate-600 rounded-md">Operations</th>)}
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.book_id.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author_id.name}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publisher_id.name}
            </td>
            <td className="border border-slate-700 rounded-md text-center">

              <div className="flex justify-center gap-x-4">


                {/* Favori ekleme ve çıkarma butonu */}
                {user && (
                  <div className="flex items-center gap-x-4">
                    {/* Info Link */}
                    <Link to={`/relations/${book._id}`} className="text-2xl text-green-800">
                      <BsInfoCircle />
                    </Link>

                    {/* Favorite Button */}
                    <button
                      onClick={() => handleFavorite(book._id)}
                      className="text-2xl"
                    >
                      {user.favoriteBooks && user.favoriteBooks.includes(book._id) ? (
                        <MdFavorite className="text-red-600" />
                      ) : (
                        <MdFavoriteBorder className="text-gray-600" />
                      )}
                    </button>
                  </div>
                )}


                {/* Admin işlemleri */}
                {user && user.isAdmin && (
                  <>
                    <Link to={`/books/edit/${book.book_id._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book.book_id._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
