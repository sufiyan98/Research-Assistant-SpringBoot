document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme from storage
    chrome.storage.local.get(['theme'], function (result) {
        const theme = result.theme || 'light-mode'; // Default to light mode
        document.body.className = theme;
        updateToggleSwitch(theme === 'dark-mode');
    });

    // Load saved notes
    chrome.storage.local.get(['researchNotes'], function (result) {
        if (result.researchNotes) {
            document.getElementById('notes').value = result.researchNotes;
        }
    });

    // Add event listeners
    document.getElementById('summarizeBtn').addEventListener('click', summarizeText);
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
    document.querySelector('.toggle').addEventListener('change', toggleTheme);
});

async function summarizeText() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => window.getSelection().toString()
        });

        if (!result) {
            showResult("Please select some text first");
            return;
        }

        const response = await fetch('http://localhost:8118/api/research/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: result, operation: 'summarize' })
        });

        if (!response.ok) {
            throw new Error(`Api Error: ${response.status}`);
        }

        const text = await response.text();
        showResult(text.replace(/\n/g, '<br>'));
    } catch (error) {
        showResult('Error: ' + error.message);
    }
}

function saveNotes() {
    const notes = document.getElementById('notes').value;
    chrome.storage.local.set({ 'researchNotes': notes }, function () {
        alert('Notes saved Successfully!');
    });
}

function showResult(content) {
    document.getElementById('results').innerHTML = `<div class="result-item"><div class="result-content">${content}</div></div>`;
}

function toggleTheme(event) {
    const isDarkMode = event.target.checked;
    const newTheme = isDarkMode ? 'dark-mode' : 'light-mode';

    // Update the body class
    document.body.className = newTheme;

    // Save the theme preference
    chrome.storage.local.set({ 'theme': newTheme }, function () {
        console.log('Theme saved:', newTheme);
    });
}

function updateToggleSwitch(isDarkMode) {
    const toggle = document.querySelector('.toggle');
    toggle.checked = isDarkMode;
}