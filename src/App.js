import { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        let response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    };

    useEffect(() => {
        getBooks();
    }, []);

    const createBook = async (title) => {
        let response = await axios.post('http://localhost:3001/books', {
            title
        });
        const updatedBooks = [
            ...books,
            response.data
        ]
        setBooks(updatedBooks);
    };

    const editBookById = async (id, title) => {
        let response = await axios.put(`http://localhost:3001/books/${id}`, {
            title
        });
        setBooks(books.map((book) => {
            if(book.id === id) {
                return {...book, ...response.data};
            }
            return book;
        }));
    };

    const deleteBookById = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const randomId = () => {
        return Math.round(Math.random() * 99999);
    };

    return(
        <div>
            <h1>Reading List</h1>
            <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;