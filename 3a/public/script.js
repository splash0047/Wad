const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const chatDisplay = document.getElementById('chatDisplay');
const statusEl = document.getElementById('status');

function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = 'message ' + type;
    div.textContent = text;
    chatDisplay.appendChild(div);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

sendBtn.addEventListener('click', function() {
    const text = msgInput.value.trim();
    if (!text) return;

    // Show sent message
    addMessage(text, 'sent');
    msgInput.value = '';
    statusEl.textContent = 'Message sent!';
    statusEl.className = 'status-msg';

    // Simulate received feedback after short delay
    setTimeout(function() {
        addMessage('Received: "' + text + '"', 'received');
        statusEl.textContent = 'Message received!';
    }, 800);
});

msgInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendBtn.click();
});
