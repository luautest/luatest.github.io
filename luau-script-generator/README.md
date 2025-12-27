# Luau LocalPlayer Script Generator

## Overview
The Luau LocalPlayer Script Generator is a web application that allows users to generate Luau code for Roblox LocalPlayer scripts by providing a description or prompt. The application leverages AI integration with OpenAI GPT-4 for dynamic code generation, with a fallback to keyword-based templates in case of failure.

## Project Structure
```
luau-script-generator
├── public
│   ├── index.html       # Main HTML file for the user interface
│   ├── styles.css       # CSS file for styling the application
│   └── script.js        # JavaScript file for handling interactions and code generation
├── server
│   └── server.js        # Node.js server file for serving static files and handling API requests
├── package.json         # npm configuration file with project dependencies and scripts
├── .gitignore           # Specifies files and directories to be ignored by Git
└── README.md            # Documentation for the project
```

## Setup Instructions
1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd luau-script-generator
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed. Then run:
   ```
   npm install
   ```

3. **Start the Server**
   To start the local server, run:
   ```
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Usage
- Open the application in your web browser.
- Enter a description of the script you want to generate in the input field.
- Click the "Generate" button to create the Luau code.
- The generated code will be displayed in the output section, and you can copy it to your clipboard using the "Copy" button.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.