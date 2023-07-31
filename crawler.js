const axios = require('axios');
const cheerio = require('cheerio');

const blogURL = 'https://sendgrid.com/blog/';
let currentPage = 1;
const articlesPerPage = 10; // Assuming 10 articles per page, change this if needed
let cnt = 10;  //max pages

// Function to fetch and parse the blog page
async function fetchBlogPage(page) {
    try {
        const response = await axios.get(`${blogURL}page/${page}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog page ${page}:`, error);
        return null;
    }
}

// Function to extract relevant information from the blog page
function extractDataFromPage(html) {
    const $ = cheerio.load(html);
    const articles = [];

    $('.title.article-title.h3 a').each((index, element) => {
        const title = $(element).text().trim();
        const link = $(element).attr('href');

        articles.push({ title, link });
    });

    return articles;
}

// Main function to execute the scraper
async function scrapeBlog() {
    console.log('Fetching blog page...', currentPage);
    const html = await fetchBlogPage(currentPage);
    if (html) {
        console.log('Parsing blog page...', currentPage);
        const articles = extractDataFromPage(html);
        console.log('Scraped articles:', articles);
        // Check if there are more pages to crawl
        
        if (articles.length >= articlesPerPage && cnt >= 0) {
            currentPage++;
            cnt--
            await scrapeBlog(); // Recursive call for the next page
        }
    }
}

// Run the scraper
scrapeBlog();
