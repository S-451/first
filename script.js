document.querySelector('.container').addEventListener('click', function() {
    document.querySelector('.terminal_input').focus();
    
    const audio = document.getElementById('startup-audio');
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
});

document.addEventListener('keydown', function(event) {
    if (event.target !== document.querySelector('.terminal_input')) {
        document.querySelector('.terminal_input').focus();
    }
});

window.addEventListener('load', function() {
    // Removed the autoplay attempt on page load to comply with browser policies.

    setTimeout(() => {
        typeText('cat message.txt', () => {
            executeCommand('cat message.txt');
            // Optionally, clear the input
            document.querySelector('.terminal_input').value = '';
        });
    }, 3000);
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        const audio = document.getElementById('startup-audio');
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    }
});

// Function to simulate typing text into the input
function typeText(text, callback) {
    let index = 0;
    const input = document.querySelector('.terminal_input');
    input.value = '';
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            input.value += text.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
            if (callback) callback();
        }
    }, 100); // 100ms per character
}

// Function to display text in the terminal
function displayText(text) {
    const terminalBody = document.querySelector('.terminal_body');
    const newLine = document.createElement('div');
    newLine.textContent = text;
    newLine.classList.add('terminal_line'); // Add a class for styling if needed
    terminalBody.appendChild(newLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Function to execute command
function executeCommand(command) {
    displayText(`S451@S451:~$ ${command}`);
    if (command === 'cat message.txt') {
        fetch('message.txt')
            .then(response => response.text())
            .then(data => {
                // Split the data into lines and display each line separately
                const lines = data.split('\n');
                lines.forEach(line => displayText(line));
            })
            .catch(error => {
                displayText(`Error reading message.txt: ${error}`);
            });
    }
}

/*
setTimeout(function() {
    window.close();
}, 76000);
*/
