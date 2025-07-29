// JavaScript for interactive elements and Firebase/WhatsApp functionality

console.log("Script loaded!");

// --- Firebase Authentication (Placeholder) ---
// You would typically have forms in login.html and signup.html
// and attach event listeners to their submission.

// Example Login Function (placeholder)
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User logged in:', user);
            alert('Login successful!');
            // Redirect or update UI
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Login error:', errorCode, errorMessage);
            alert(`Login failed: ${errorMessage}`);
        });
}

// Example Signup Function (placeholder)
function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed up:', user);
            alert('Signup successful!');
            // Redirect or update UI
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Signup error:', errorCode, errorMessage);
            alert(`Signup failed: ${errorMessage}`);
        });
}

// --- WhatsApp Form Submission ---
function handleWhatsAppSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('whatsapp-name').value;
    const email = document.getElementById('whatsapp-email').value;
    const message = document.getElementById('whatsapp-message').value;

    const phoneNumber = '256742337382'; // One of the provided WhatsApp numbers
    const whatsappMessage = `Hello H&B Metal Workshop, my name is ${name}. My email is ${email}. I have a message/order: ${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');

    // Clear form fields after submission
    document.getElementById('whatsapp-name').value = '';
    document.getElementById('whatsapp-email').value = '';
    document.getElementById('whatsapp-message').value = '';
    alert('Redirecting to WhatsApp with your message!');
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Attach login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Attach signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Attach WhatsApp contact form submission (on contact.html)
    const contactWhatsAppForm = document.getElementById('contact-whatsapp-form');
    if (contactWhatsAppForm) {
        contactWhatsAppForm.addEventListener('submit', handleWhatsAppSubmit);
    }

    // Attach WhatsApp order form submission (on order.html)
    const orderWhatsAppForm = document.getElementById('order-whatsapp-form');
    if (orderWhatsAppForm) {
        orderWhatsAppForm.addEventListener('submit', handleWhatsAppSubmit); // Reusing for simplicity, might need separate logic
    }
});