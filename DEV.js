// script.js

// Add event listener to social media links
const socialMediaLinks = document.querySelectorAll('.social-media a');

socialMediaLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        // Add animation or tracking code here
        console.log(`Social media link clicked: ${link.href}`);
    });
});