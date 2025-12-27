const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint for code generation
app.post('/generate', (req, res) => {
    const { description } = req.body;
    // Here you would integrate the AI code generation logic
    // For now, we'll just send back a placeholder response
    const generatedCode = `-- Generated Luau code for: ${description}`;
    res.json({ code: generatedCode });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});