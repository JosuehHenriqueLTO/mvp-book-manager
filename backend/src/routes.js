const express = require('express');
const routes = express.Router();

let books = [];

routes.post('/register', (req, res) => {
    const { title, author, cover, startDate, endDate, rating, opinion } = req.body;

    const newBook = { title, author, cover, startDate, endDate, rating, opinion };
    books.push(newBook);

    return res.status(201).json(newBook);
});


routes.get('/books', (req, res) => {
    return res.json(books);
});

module.exports = routes;

