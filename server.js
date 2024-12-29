const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/analyze-contract', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    // Create a prompt for the LLM to analyze the smart contract
    const prompt = `Analyze the following Ethereum Solidity smart contract. Explain its purpose, highlight any potential bugs or vulnerabilities, and suggest improvements if applicable.\n\n${code}`;

    try {
        const response = await fetch('https://api.starcoder.ai/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_STARCODER_API_KEY`, // Replace with your Starcoder API key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'starcoder-llm', // Replace with the correct model name if needed
                prompt: prompt,
                max_tokens: 500,
            }),
        });

        const data = await response.json();
        const explanation = data.choices[0].text.trim();

        // Send the analysis back to the frontend
        res.json({ explanation });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error analyzing the smart contract' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
