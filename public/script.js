// public/script.js

// --- DOM ELEMENT REFERENCES ---
const chatIcon     = document.getElementById('chat-icon');
const chatWindow   = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatBody     = document.getElementById('chat-body');
const chatForm     = document.getElementById('chat-form');
const chatInput    = document.getElementById('chat-input');
const sendBtn      = document.getElementById('send-btn');

let isChatOpen     = false;
let hasInitialized = false;

// Optional: keep a running history of the conversation
// so you can send context back to the server for multi‑turn chats.
const chatHistory = [];

// --- UI HELPER FUNCTIONS ---
function toggleChatWindow() {
  isChatOpen = !isChatOpen;
  chatWindow.classList.toggle('hidden');
  chatIcon .classList.toggle('hidden');
  if (isChatOpen && !hasInitialized) {
    startConversation();
    hasInitialized = true;
  }
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

function setFormState(isLoading) {
  chatInput.disabled = isLoading;
  sendBtn .disabled = isLoading;
}

function showTypingIndicator() {
  const el = document.createElement('div');
  el.className = 'message-bubble bot-message typing-indicator';
  el.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  chatBody.appendChild(el);
  scrollToBottom();
  return el;
}

function addMessage(author, text) {
  const msg = document.createElement('div');
  msg.className = `message-bubble ${author}-message`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();
  return msg;
}

// --- CORE CHAT LOGIC ---
async function streamResponse(userText) {
  // add user message to UI + history
  addMessage('user', userText);
  chatHistory.push({ role: 'user', content: userText });

  setFormState(true);
  const typingEl = showTypingIndicator();

  try {
    const res = await fetch('/api/chat', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ history: chatHistory })
    });
    const { text, error } = await res.json();
    if (error) throw new Error(error);

    // update UI + history with bot reply
    typingEl.remove();
    addMessage('bot', text);
    chatHistory.push({ role: 'assistant', content: text });
  } catch (err) {
    console.error(err);
    typingEl.remove();
    addMessage('bot', "Sorry, something went wrong. Please try again later.");
  } finally {
    setFormState(false);
    chatInput.focus();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  streamResponse(text);
}

function startConversation() {
  // Optionally send an empty or “hello” message
  // to trigger the system prompt on the first turn.
  streamResponse('Hello');
}

// --- EVENT LISTENERS ---
chatIcon    .addEventListener('click',   toggleChatWindow);
closeChatBtn.addEventListener('click',   toggleChatWindow);
chatForm    .addEventListener('submit',  handleFormSubmit);