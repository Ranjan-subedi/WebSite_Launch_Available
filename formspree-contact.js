// ============================================
// FORMSPREE CONTACT FORM HANDLER
// Separate file for form handling
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    console.log('Formspree Contact Form Loaded');
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            
            console.log('Sending message via Formspree:', { name, email, subject });
            
            try {
                // Send to Formspree
                const response = await fetch('https://formspree.io/f/mjgrzjya', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    console.log('✓ Message sent successfully!', data);
                    alert('✓ Message sent successfully! Thank you for reaching out.');
                    contactForm.reset();
                } else {
                    console.error('✗ Formspree error:', data);
                    alert('✗ Failed to send. Please try again.');
                }
            } catch (error) {
                console.error('✗ Network error:', error);
                alert('✗ Network error. Please check your connection.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    } else {
        console.warn('Contact form not found');
    }
});