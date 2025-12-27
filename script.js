// Fallback templates for when AI fails
const templates = {
    fly: `
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoidRootPart = character:WaitForChild("HumanoidRootPart")
local bodyVelocity = Instance.new("BodyVelocity")
bodyVelocity.Velocity = Vector3.new(0, 0, 0)
bodyVelocity.MaxForce = Vector3.new(4000, 4000, 4000)
bodyVelocity.Parent = humanoidRootPart
-- To stop flying, remove bodyVelocity
`,
    speed: `
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
humanoid.WalkSpeed = 50  -- Adjust speed
`,
    jump: `
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
humanoid.JumpPower = 100  -- Adjust jump height
`,
    invincible: `
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
humanoid.Health = humanoid.MaxHealth
humanoid:GetPropertyChangedSignal("Health"):Connect(function()
    humanoid.Health = humanoid.MaxHealth
end)
`
};

// Fallback function using templates
function generateCodeFallback(prompt) {
    let code = 'local player = game.Players.LocalPlayer\n\n';
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('fly')) {
        code += templates.fly;
    }
    if (lowerPrompt.includes('speed')) {
        code += templates.speed;
    }
    if (lowerPrompt.includes('jump')) {
        code += templates.jump;
    }
    if (lowerPrompt.includes('invincible')) {
        code += templates.invincible;
    }
    if (code === 'local player = game.Players.LocalPlayer\n\n') {
        code += '-- No matching features found. Using basic template. Please refine your description.\n';
    }
    return code;
}

// AI-powered code generation
async function generateCodeAI(prompt) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with actual key or use environment variable
    // Note: For production, implement a backend proxy to securely handle API calls and avoid exposing the API key on the client-side.
    const systemPrompt = "You are an expert Roblox Luau script developer. Generate functional, safe Luau code for LocalPlayer scripts based on user descriptions. Always include proper error handling and follow Roblox best practices. Use exploiter-like functions such as CFrame, getfenv, pcall when appropriate for advanced functionality.";
    const userPrompt = `Generate a Roblox Luau LocalPlayer script that: ${prompt}

Requirements:
- Use proper Luau syntax
- Include LocalPlayer context
- Incorporate functions like CFrame for transformations, getfenv for environment access, pcall for error handling where relevant
- Ensure the code is executable and safe
- Add comments for clarity

Output only the Luau code, no explanations.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const code = data.choices[0].message.content.trim();

        // Basic validation: check if it looks like Luau code
        if (code.includes('local') || code.includes('game.') || code.includes('end')) {
            return code;
        } else {
            throw new Error('Invalid code generated');
        }
    } catch (error) {
        console.error('AI generation failed:', error);
        return null; // Indicate fallback needed
    }
}

// Main generate function
async function generateCode(prompt) {
    // Try AI first
    const aiCode = await generateCodeAI(prompt);
    if (aiCode) {
        return aiCode;
    } else {
        // Fallback to templates
        return generateCodeFallback(prompt);
    }
}

document.getElementById('script-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    if (!prompt.trim()) {
        alert('Please enter a description.');
        return;
    }

    // Show loading state
    const generateBtn = document.querySelector('button[type="submit"]');
    const originalText = generateBtn.textContent;
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;

    try {
        const code = await generateCode(prompt);
        document.getElementById('code-output').textContent = code;
        document.getElementById('output').style.display = 'block';
    } catch (error) {
        alert('An error occurred while generating code. Please try again.');
        console.error(error);
    } finally {
        // Reset button
        generateBtn.textContent = originalText;
        generateBtn.disabled = false;
    }
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const code = document.getElementById('code-output').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
});