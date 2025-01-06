import { useState } from 'react'
import axios from 'axios'

import './Register.css'

const Register = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [cover, setCover] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [rating, setRating] = useState('')
  const [opinion, setOpinion] = useState('')
  
  const [results, setResults] = useState([])

  const sendData = async (newSearch) => {
    if (newSearch.length < 5) {
      return
    }

    console.log('Book:', newSearch)
    
    const response = await fetch(`https://openlibrary.org/search.json?q=${newSearch}&mode=everything`)
    const data = await response.json()
    setResults(data.docs)
    console.log(response)
  }

  const handleChange = (e) => {
    const newText = e.target.value
    setTitle(newText)
    sendData(newText)
  }

  const handleSelectBook = (book) => {
    setTitle('')
    setAuthor('')
    setCover('')

    setTitle(book.title ? book.title : '')
    setAuthor(book.author_name ? book.author_name.join(', ') : '')
    setCover(book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : '')
    setResults([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newBook = {
      title,
      author,
      cover,
      startDate,
      endDate,
      rating: parseFloat(rating), 
      opinion
    }
    console.log(newBook)

    const response = await axios.post('http://localhost:3000/register', JSON.stringify(newBook), {
      headers: {'Content-Type': 'application/json'}
    });
    
  }

  return (
    <>
      <div id="form-box">
        <h2>Wanna register your thoughts?</h2>
        <form>
          <div id="bookForm">
            <p>First, tell me what you are reading</p>
            <label htmlFor="">Book title</label>            
            <input
              type="text"
              value={title}
              onChange={handleChange}
            />
            {results.length > 0 && (
              <div id='select-result'>
              <ul>
                {results.slice(0, 10).map((book, index) => (
                  <li key={index} onClick={() => handleSelectBook(book)} style={{ cursor: 'pointer' }}>
                    {book.title} {book.author_name ? `- ${book.author_name.join(', ')}` : ''}
                  </li>
                ))}
              </ul>
            </div>
            )}
            <label htmlFor="">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <label htmlFor="">Book cover</label>            
            <input
              type="url"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />   
          </div>
          <div id="reviewForm">
            <p>Now, your opinion! </p>
            <label htmlFor="">Start date</label>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-label="Start date"
            />
            <label htmlFor="">End date (optional)</label>
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                aria-label="End date"
            />
            <label htmlFor="">Rating</label>            
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="0"
                max="5"
                aria-label="Rating"
            />
            <textarea
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
                placeholder="Your opinion about the book"
                aria-label="Opinion"
            />
          </div>
        </form>
        <button onClick={handleSubmit}>Register</button>
      </div>

    </>
  )
}

export default Register
