function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
const logo = document.getElementById('logo');
const logoMobile = document.getElementById('logo-mobile');
const colors = ['#ff5733', '#33c9ff', '#a833ff', '#ff33a6']; // Array of colors
let colorIndex = 0;

function changeLogoColor() {
  logo.style.color = colors[colorIndex];
  logoMobile.style.color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length; // Cycle through colors
}

setInterval(changeLogoColor, 2000); // Change color every 5 seconds

  // Function to detect when the section comes into view
  function addSwooshEffect() {
    const skillSection = document.querySelector('#experience');
    const articles = document.querySelectorAll('article');
    
    const sectionPosition = skillSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (sectionPosition.top < windowHeight && sectionPosition.bottom >= 0) {
      // Add class to trigger the animation
      articles.forEach((article, index) => {
        setTimeout(() => {
          article.classList.add('animate-swoosh');
        }, index * 100); // Add delay for each article for staggered effect
      });
    }
  }

  // Listen for scroll events
  window.addEventListener('scroll', addSwooshEffect);

  function showHandshakeAndContact() {
    const contactSection = document.querySelector('#contact');
    const handshakeGif = document.querySelector('#handshake-gif');
    const contactInfo = document.querySelector('.contact-info-upper-container');

    const sectionPosition = contactSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (sectionPosition.top < windowHeight && sectionPosition.bottom >= 0) {
      // Show the handshake GIF
      handshakeGif.style.display = 'block';

      // After 1.5 seconds, hide the GIF and show the contact info
      setTimeout(() => {
        handshakeGif.style.display = 'none';
        contactInfo.style.display = 'flex'; // Display contact info
      }, 1500);
    }
  }

  // Listen for scroll events
  window.addEventListener('scroll', showHandshakeAndContact);
  

  // Wait for the DOM to fully load
window.addEventListener('DOMContentLoaded', () => {
  // After a brief delay (for the zoom effect), remove the logo container
  setTimeout(() => {
    document.body.classList.add('loaded');
    // Change the logo size to smaller for the navbar
    const logoNav = document.getElementById('logo-nav');
    logoNav.style.fontSize = '2rem'; // Adjust the font size in the navbar
  }, 2000); // Adjust this timing based on your animation duration
});
