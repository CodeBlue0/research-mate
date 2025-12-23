import OpenAI from 'openai';

const apiKey = process.env.DEEPSEEK_API_KEY;

export const deepseek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: apiKey || 'dummy-key', // Prevent crash on build if key is missing, but API calls will fail
});

export const checkApiKey = () => {
    if (!apiKey) {
        throw new Error("DEEPSEEK_API_KEY is not defined in environment variables.");
    }
};
