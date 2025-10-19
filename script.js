document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header and Scroll Active Link ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');

    window.onscroll = () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Link on Scroll
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset for header height
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Hide menu when scrolled (if visible)
        if(window.innerWidth <= 768 && navbar.classList.contains('active')) {
             navbar.classList.remove('active');
             menuIcon.classList.remove('bx-x');
             menuIcon.classList.add('bx-menu');
        }
    };
    
    // --- Mobile Menu Toggle ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x'); // Toggle hamburger/close icon
        navbar.classList.toggle('active'); // Toggle visibility of the menu
    };
    
    // --- Smooth Scroll for Mobile Menu Links ---
    // Closes the mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });

    // --- Contact Form Submission Feedback ---
    const contactForm = document.getElementById('contact-form');

    if(contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            // Note: If using Formspree, the form submission is handled automatically
            // by the 'action' attribute, but we can intercept it to provide feedback.
            
            // For a basic alert feedback (using Formspree's success redirect):
            
            // To prevent the page from navigating away after Formspree's redirect, 
            // Formspree suggests using a fetch request. 
            // If you keep the 'action' attribute, Formspree will redirect to a 'Thank you' page.
            // For a smoother UX, uncomment the fetch method below and remove the 'action' and 'method' attributes from the HTML form.

            e.preventDefault(); 
            
            const formData = new FormData(this);
            const formURL = this.getAttribute('action'); // Get the Formspree URL from HTML

            try {
                 const response = await fetch(formURL, {
                     method: 'POST',
                     body: formData,
                     headers: {
                         'Accept': 'application/json'
                     }
                 });

                 if (response.ok) {
                     alert('✅ Message sent successfully! I will get back to you soon.');
                     contactForm.reset();
                 } else {
                     alert('❌ Oops! There was an issue sending your message. Please try again.');
                 }
                 
            } catch (error) {
                 console.error('Submission error:', error);
                 alert('❌ An unexpected error occurred. Please try emailing me directly.');
            }
        });
    }

});