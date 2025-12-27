// script.js

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('script-description');
    const generateButton = document.getElementById('generate-button');
    const outputSection = document.getElementById('output');
    const copyButton = document.getElementById('copy-button');

    generateButton.addEventListener('click', async () => {
        const description = inputField.value;
        if (description.trim() === '') {
            outputSection.textContent = 'Please enter a description.';
            return;
        }

        outputSection.textContent = 'Generating code...';
        try {
            const response = await fetch('/generate-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            });

            const data = await response.json();
            outputSection.textContent = data.code || 'Failed to generate code.';
        } catch (error) {
            outputSection.textContent = 'Error generating code.';
        }
    });

    copyButton.addEventListener('click', () => {
        const code = outputSection.textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy code.');
        });
    });
});