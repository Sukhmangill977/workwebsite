// public/script.js

// --- DOM ELEMENT REFERENCES ---
const chatIcon     = document.getElementById('chat-icon');
const chatWindow   = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatBody     = document.getElementById('chat-body');
const chatForm     = document.getElementById('chat-form');
const chatInput    = document.getElementById('chat-input');
const sendBtn      = document.getElementById('send-btn');

let isChatOpen = false;

// Toggle chat open/closed
function toggleChat() {
  isChatOpen = !isChatOpen;
  chatWindow.classList.toggle('hidden');
  chatIcon .classList.toggle('hidden');
  if (isChatOpen && chatBody.children.length === 0) {
    // Kick things off with a greeting
    addBotMessage("👋 Hi there! How can I help you with your design needs today?");
  }
}

// Utility to scroll
function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Enable/disable input while loading
function setLoading(state) {
  chatInput.disabled = state;
  sendBtn.disabled  = state;
}

// Show three‑dot typing indicator
function showTyping() {
  const el = document.createElement('div');
  el.className = 'message-bubble bot-message typing-indicator';
  el.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  chatBody.appendChild(el);
  scrollToBottom();
  return el;
}

// Append a user message
function addUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message-bubble user-message';
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

// Append a bot message
function addBotMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message-bubble bot-message';
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

// Handle form submit
chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';

  addUserMessage(text);
  setLoading(true);
  const typingEl = showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    typingEl.remove();

    if (!res.ok) {
      console.error('Chat error payload:', data);
      throw new Error(data.error || res.statusText);
    }

    addBotMessage(data.text);
  } catch (err) {
    console.error('Chat error:', err);
    typingEl.remove();
    addBotMessage("Sorry, something went wrong. Please try again later.");
  } finally {
    setLoading(false);
    chatInput.focus();
  }
});

// Wire up open/close buttons
chatIcon    .addEventListener('click', toggleChat);
closeChatBtn.addEventListener('click', toggleChat);