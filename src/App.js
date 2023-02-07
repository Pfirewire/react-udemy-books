import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
    const [books, setBooks] = useState([]);

    const createBook = (title) => {
        // console.log(`Need to add book with title of ${title}`);
        const updatedBooks = [
            ...books,
            {
                id: randomId(),
                title
            }
        ]
        setBooks(updatedBooks);
    };

    const editBookById = (id, title) => {
        setBooks(books.map((book) => {
            if(book.id === id) {
                return {...book, title};
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