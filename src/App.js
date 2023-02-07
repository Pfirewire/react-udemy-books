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

    };

    const deleteBookById = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const randomId = () => {
        return Math.round(Math.random() * 99999);
    };

    return(
        <div>
            <BookList books={books} onDelete={deleteBookById} />
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;