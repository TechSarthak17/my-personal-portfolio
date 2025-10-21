document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header and Scroll Active Link ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');
    
    // Mobile Menu elements (defined early to prevent scope issues in window.onscroll)
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

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

    // ==========================================================
    // --- CONTACT FORM SUBMISSION & CUSTOM MODAL LOGIC (UPDATED) ---
    // ==========================================================
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    // We select both close buttons from the modal
    const closeButtons = document.querySelectorAll('#success-modal .close-btn, #success-modal .close-btn-bottom');

    // Function to show the modal with a smooth transition
    function showModal() {
        successModal.classList.add('show');
    }

    // Function to hide the modal
    function hideModal() {
        successModal.classList.remove('show');
    }

    // Add event listeners to close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', hideModal);
    });

    // Close modal if user clicks outside of it (on the backdrop)
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            hideModal();
        }
    });


    if(contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            const formData = new FormData(this);
            const formURL = this.getAttribute('action'); 
            const submitButton = this.querySelector('.send-btn');
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

            try {
                 const response = await fetch(formURL, {
                     method: 'POST',
                     body: formData,
                     headers: {
                         'Accept': 'application/json'
                     }
                 });

                 if (response.ok) {
                     // ❌ Old alert removed.
                     showModal(); // ✅ New custom modal is shown.
                     contactForm.reset();
                 } else {
                     alert('❌ Oops! There was an issue sending your message. Please try again.');
                 }
                 
            } catch (error) {
                 console.error('Submission error:', error);
                 alert('❌ An unexpected error occurred. Please try emailing me directly.');
            } finally {
                // Re-enable button and restore original text
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="bx bxs-send"></i> Send Message';
            }
        });
    }

});