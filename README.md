# Mini Search Engine

A simple backend service for managing articles. Users can add articles, search for them by keywords or tags, and retrieve article details. The search results are sorted by relevance.

## Features
- **Add Articles**: Add articles with a title, content, and tags.
- **Search Articles**: Search articles by keyword or tag with relevance-based sorting.
- **Retrieve Articles**: Get full details of an article by ID.
- **Persistence**: Articles are stored in a `articles.json` file for persistence.
- **data**: data for the above search is provided in data dir.

## How It Works
1. **Add Articles**: Articles are added via a **POST** request with title, content, and tags.
2. **Search Articles**: Use **GET /articles/search** to find articles by keyword and tag. Results are sorted by relevance.
3. **Retrieve Articles**: Use **GET /articles/:id** to fetch a specific article by its ID.
4. **Relevance**: Relevance is calculated based on keyword frequency in the title and content.
5. **Persistence**: Articles are saved in `articles.json`, ensuring data is retained across server restarts.



