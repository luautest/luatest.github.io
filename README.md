# Luau LocalPlayer Script Generator

A simple web application for generating Luau code snippets for Roblox LocalPlayer scripts based on user descriptions.

## Features
- Input a description of the desired script functionality
- Generate Luau code using AI-powered generation (with fallback to templates)
- Copy generated code to clipboard
- Responsive design for various devices

## Usage
1. Open `index.html` in a web browser
2. Enter a description (e.g., "Make the player fly and teleport randomly")
3. Click "Generate Code"
4. Copy the generated code

## File Structure
- `index.html`: Main webpage
- `styles.css`: Styling
- `script.js`: Functionality and code generation
- `plans/plan.md`: Design plan

## Code Generation
- **AI-Powered**: Uses OpenAI GPT-4 for flexible code generation based on any description
- **Fallback**: If AI fails, uses keyword-based templates for basic features
- **Supported Functions**: Includes exploiter-like functions like CFrame, getfenv, pcall when appropriate

## Setup
To use AI generation, replace 'YOUR_OPENAI_API_KEY' in `script.js` with a valid OpenAI API key. For production, consider using a backend proxy for security.

## Future Enhancements
- Backend proxy for secure API key handling
- Syntax highlighting
- More advanced prompt engineering