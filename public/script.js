const chatIcon     = document.getElementById('chat-icon');
const chatWindow   = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatBody     = document.getElementById('chat-body');
const chatForm     = document.getElementById('chat-form');
const chatInput    = document.getElementById('chat-input');
const sendBtn      = document.getElementById('send-btn');

let isChatOpen = false;

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

function setLoading(state) {
  chatInput.disabled = state;
  sendBtn.disabled  = state;
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'message-bubble bot-message typing-indicator';
  el.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  chatBody.appendChild(el);
  scrollToBottom();
  return el;
}

function addUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message-bubble user-message';
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

function addBotMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message-bubble bot-message';
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

async function startConversation() {
  setLoading(true);
  const typingEl = showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello' })
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
}

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

function toggleChat() {
  isChatOpen = !isChatOpen;
  chatWindow.classList.toggle('hidden');
  chatIcon .classList.toggle('hidden');

  
  if (isChatOpen && chatBody.children.length === 0) {
    startConversation();
  }
}

chatIcon    .addEventListener('click', toggleChat);
closeChatBtn.addEventListener('click', toggleChat);