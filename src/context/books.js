import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
    const [books, setBooks] = useState([]);

    const valueToShare = {
        books,
        getBooks: async () => {
            let response = await axios.get('http://localhost:3001/books');
            setBooks(response.data);
        },
        createBook: async (title) => {
            let response = await axios.post('http://localhost:3001/books', {
                title
            });
            const updatedBooks = [
                ...books,
                response.data
            ]
            setBooks(updatedBooks);
        },
        editBookById: async (id, title) => {
            let response = await axios.put(`http://localhost:3001/books/${id}`, {
                title
            });
            setBooks(books.map((book) => {
                if(book.id === id) {
                    return {...book, ...response.data};
                }
                return book;
            }));
        },
        randomId: () => {
            return Math.round(Math.random() * 99999);
        },
    };

    return (
        <BooksContext.Provider value={{}}>
            {children}
        </BooksContext.Provider>
    );
}

export { Provider };
export default BooksContext;