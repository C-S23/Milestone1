const fs = require('fs');
const { computeRelevance } = require('./search');

let articles = [];
let articleIndex = {};

// Optional persistence (load data from file if available)
const loadArticles = () => {
    try {
        const data = fs.readFileSync('./data/articles.json', 'utf8');
        articles = JSON.parse(data);
        articles.forEach(article => {
            indexArticle(article);
        });
    } catch (err) {
        console.log('No previous data found, starting fresh.');
    }
};

// Function to add an article
const addArticle = (article) => {
    const id = articles.length + 1;
    const newArticle = { id, ...article };
    articles.push(newArticle);
    indexArticle(newArticle);

    // Save article to file for persistence
    fs.writeFileSync('./data/articles.json', JSON.stringify(articles, null, 2));
};

// Function to index article by title, content, and tags
const indexArticle = (article) => {
    articleIndex[article.id] = {
        title: article.title.toLowerCase(),
        content: article.content.toLowerCase(),
        tags: article.tags.map(tag => tag.toLowerCase())
    };
};

// Function to search articles
const searchArticles = (keyword, tag) => {
    const results = articles.filter((article) => {
        let relevance = 0;

        // Check if the article matches the keyword in title or content
        if (articleIndex[article.id].title.includes(keyword.toLowerCase())) {
            relevance += 1;
        }
        if (articleIndex[article.id].content.includes(keyword.toLowerCase())) {
            relevance += 1;
        }
        // Check if the article contains the tag
        if (tag && articleIndex[article.id].tags.includes(tag.toLowerCase())) {
            relevance += 1;
        }

        return relevance > 0;
    });

    // Sort by relevance
    results.sort((a, b) => {
        const relevanceA = computeRelevance(a, keyword);
        const relevanceB = computeRelevance(b, keyword);
        return relevanceB - relevanceA; // Descending order
    });

    return results;
};

// Function to retrieve article by ID
const getArticleById = (id) => {
    return articles.find(article => article.id === parseInt(id));
};

loadArticles();

module.exports = { addArticle, searchArticles, getArticleById };
