(function() {
    // Replace with your actual Public Key from EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

const contactForm = document.getElementById('portfolio-contact-form');
const submitBtn = document.getElementById('submit-btn');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', function(event) {
    // This stops the page from refreshing/jumping to home
    event.preventDefault();

    const name = document.getElementById('form_name');
    const email = document.getElementById('form_email');
    const message = document.getElementById('form_message');

    // Reset previous states
    let isValid = true;
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = "");
    [name, email, message].forEach(el => el.classList.remove('invalid'));

    // --- Specific Field Validation ---
    
    // Name: Only letters, min 2
    if (name.value.trim().length < 2) {
        document.getElementById('name-error').innerText = "Please enter your name.";
        name.classList.add('invalid');
        isValid = false;
    }

    // Email: Standard format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        document.getElementById('email-error').innerText = "Please enter a valid email.";
        email.classList.add('invalid');
        isValid = false;
    }

    // Message: Min 10 chars
    if (message.value.trim().length < 10) {
        document.getElementById('message-error').innerText = "Message must be at least 10 characters.";
        message.classList.add('invalid');
        isValid = false;
    }

    if (isValid) {
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        // Corrected from 'mainjs' to 'emailjs'
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                submitBtn.innerText = "Message Sent! ✅";
                formResponse.innerText = "Thank you! I will contact you soon.";
                formResponse.className = "form-success success";
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = "Send Message";
                    submitBtn.disabled = false;
                    formResponse.innerText = "";
                }, 5000);

            }, (err) => {
                submitBtn.innerText = "Error! ❌";
                submitBtn.disabled = false;
                formResponse.innerText = "Something went wrong. Please try again.";
                formResponse.className = "error";
                console.error("EmailJS Error:", err);
            });
    }
});