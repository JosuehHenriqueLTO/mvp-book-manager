import { useEffect, useState } from 'react';
import axios from 'axios';

import './Home.css'

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);

    };

    fetchBooks();
  }, []);

  return (
    <>
      <div id="books-box">
        <h2 id='title'>Your bookshelf:</h2>
        <ul>
          {books.length === 0 && <p id='loading'>It seems empty...</p>}
          {books.map((book, index) => (
            <li key={index}>
              <h3>{book.title}</h3>
              <img src={book.cover} alt={book.title} style={{ width: '100px' }} />
              <p>Author: {book.author}</p>
              <p>When you started: {book.startDate}</p>
              <p>When you finished: {book.endDate}</p>
              <p>Rating: {book.rating}</p>
              <p>Opinion: {book.opinion}</p>
              {/* <button>Delete</button> */}
            </li>
          ))}
        </ul>        
      </div>
    </>
  )
}

export default Home