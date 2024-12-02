const computeRelevance = (article, keyword) => {
    const keywordLower = keyword.toLowerCase();
    let relevance = 0;

    // Count frequency of keyword in title and content
    const titleFrequency = (article.title.toLowerCase().match(new RegExp(keywordLower, 'g')) || []).length;
    const contentFrequency = (article.content.toLowerCase().match(new RegExp(keywordLower, 'g')) || []).length;

    relevance += titleFrequency * 2; // Title has more weight
    relevance += contentFrequency;

    return relevance;
};

module.exports = { computeRelevance };
