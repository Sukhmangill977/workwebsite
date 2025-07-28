window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.style.transform = 'translateY(0)';
        card.style.opacity = 1;
      }
    });
  });
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Stop the default form submit
  
    const form = e.target;
    const formData = new FormData(form);
    const responseMessage = document.getElementById('responseMessage');
  
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
  
      if (res.ok) {
        responseMessage.classList.remove('hidden');
        form.reset(); // clear form
      } else {
        responseMessage.textContent = "Oops! Something went wrong.";
        responseMessage.style.color = "red";
        responseMessage.classList.remove('hidden');
      }
    } catch (err) {
      responseMessage.textContent = "Network error. Try again later.";
      responseMessage.style.color = "red";
      responseMessage.classList.remove('hidden');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(link =>
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    })
  );
  

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

const toggleChatWindow = () => {
  isChatOpen = !isChatOpen;
  chatWindow.classList.toggle('hidden');

  if (isChatOpen && !hasInitialized) {
    startConversation();
    hasInitialized = true;
  }
};
