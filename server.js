const express = require('express');
const bodyParser = require('body-parser');
const { addArticle, searchArticles, getArticleById } = require('./articles');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Add Article Endpoint
app.post('/articles', (req, res) => {
    const article = req.body;
    addArticle(article);
    res.status(201).send({ message: 'Article added successfully' });
});

// Search Articles Endpoint
app.get('/articles/search', (req, res) => {
    const { keyword, tag } = req.query;
    const results = searchArticles(keyword, tag);
    res.status(200).json(results);
});

// Get Article by ID Endpoint
app.get('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    const article = getArticleById(articleId);
    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).send({ message: 'Article not found' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
