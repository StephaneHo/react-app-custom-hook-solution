import { useEffect, useState } from "react";

import axios from "axios";
import { BookCreate } from "./components/BookCreate";
import { BookList } from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchBooks = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:3001/books");
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Failed to fetch books");
      }
      setBooks(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put("http://localhost:3001/books/" + id, {
      title: newTitle,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title: title,
    });
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  return (
    <div className="mx-20">
      <h1 className="text-3xl font-bold underline mx-20 my-20">Reading List</h1>
      <BookList
        onEdit={editBookById}
        books={books}
        onDelete={deleteBookById}
        isLoading={isLoading}
        error={error}
      />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
