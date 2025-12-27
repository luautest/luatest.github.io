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

function generateCode(prompt) {
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
        code += '-- No matching features found. Please describe a script with keywords like fly, speed, jump, invincible.\n';
    }
    return code;
}

document.getElementById('script-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    if (!prompt.trim()) {
        alert('Please enter a description.');
        return;
    }
    const code = generateCode(prompt);
    document.getElementById('code-output').textContent = code;
    document.getElementById('output').style.display = 'block';
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const code = document.getElementById('code-output').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
});