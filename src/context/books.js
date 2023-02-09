import { createContext, useState, useCallback } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
    const [books, setBooks] = useState([]);

    const getBooks = useCallback(async () => {
        let response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
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

    const deleteBookById = async (id) => {
        let response = await axios.delete(`http://localhost:3001/books/${id}`);
        setBooks(books.filter(book => book.id !== id));
    }

    const valueToShare = {
        books,
        getBooks,
        createBook,
        editBookById,
        deleteBookById,
    };

    return (
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
    );
}

export { Provider };
export default BooksContext;