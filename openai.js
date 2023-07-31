// const openai = require('openai');
// const apiKey = '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';
// Replace with your actual API key
// openai.apiKey = apiKey;

// const API_KEY = "68fcef4f-239b-4795-bb03-f0218a75dfad";


const { Configuration, OpenAIApi } = require("openai");

const apiKey = "API_KEY";

const config = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(config);


async function generateContent(heading,link) {
    try {
        const prompt = `Analysis the content available at this link "${link}" and on the basis of that Write content about "${heading} in between 1000 - 2000 words content should be simple and optimistic tone should be professional"`;
        const response = await openai.createCompletion({
            engine: 'text-davinci-003', // You can use a different engine based on your preference and subscription level
            prompt: prompt,
            max_tokens: 2048, // Adjust the number of tokens to control the response length
            temperature: 1,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error generating content:', error);
        return '';
    }
}

// Main function to execute the scraper
async function scrapeBlog() {
    // ... (Existing code)
    const articles = [
        {
            title: 'Email for Gen Z',
            link: 'https://sendgrid.com/blog/email-for-gen-z/'
        },
        {
            title: 'Announcing Email Manners: A Tale of Two Senders',
            link: 'https://sendgrid.com/blog/announcing-email-manners-a-tale-of-two-senders/'
        }
    ];

    // Store content for each heading in an array
    const articlesWithContent = [];
    for (const article of articles) {
        const heading = article.title;
        const link = article.link;
        const content = await generateContent(heading,link);
        articlesWithContent.push({ heading, content });
    }

    // Store or process the content as needed
    console.log('Articles with content:', articlesWithContent);
}

// ... (Remaining code)
scrapeBlog();
