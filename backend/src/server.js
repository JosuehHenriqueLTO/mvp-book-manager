const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

let books = []

app.get('/books', (req, res) => {
    res.json(books);
});

app.listen(3000, () => {
    console.log('Listening on port 5000');
});

