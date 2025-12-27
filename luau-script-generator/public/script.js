// This file handles user interactions, manages the code generation logic, and updates the output display with the generated Luau code.

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const inputField = document.getElementById('script-description');
    const outputField = document.getElementById('generated-code');
    const copyButton = document.getElementById('copy-button');

    generateButton.addEventListener('click', async () => {
        const description = inputField.value;
        if (!description) {
            alert('Please enter a description.');
            return;
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate code');
            }

            const data = await response.json();
            outputField.textContent = data.code;
        } catch (error) {
            console.error(error);
            outputField.textContent = 'Error generating code. Please try again.';
        }
    });

    copyButton.addEventListener('click', () => {
        const code = outputField.textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});