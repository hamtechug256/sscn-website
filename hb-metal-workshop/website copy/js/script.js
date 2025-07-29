// JavaScript for interactive elements and Firebase/WhatsApp functionality

console.log("Script loaded!");

// --- Mobile Menu Toggle ---

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked (optional)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

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

// --- Firebase Authentication ---

// Login Function
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User logged in:', user);
            alert('Login successful! Redirecting to the homepage.');
            // Redirect to a protected page or update UI
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Login error:', errorCode, errorMessage);
            // Provide user-friendly error messages
            if (errorCode === 'auth/user-not-found') {
                alert('Login failed: No user found with this email.');
            } else if (errorCode === 'auth/wrong-password') {
                alert('Login failed: Incorrect password.');
            } else {
                alert(`Login failed: ${errorMessage}`);
            }
        });
}

// Signup Function
function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const password2 = document.getElementById('signup-password2').value;

    if (password !== password2) {
        alert("Passwords do not match.");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log('User signed up:', user);
            alert('Signup successful! You are now logged in. Redirecting to the homepage.');
            // Redirect to a protected page or update UI
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Signup error:', errorCode, errorMessage);
            // Provide user-friendly error messages
            if (errorCode === 'auth/email-already-in-use') {
                alert('Signup failed: The email address is already in use by another account.');
            } else if (errorCode === 'auth/weak-password') {
                alert('Signup failed: The password is too weak. It must be at least 6 characters long.');
            } else {
                alert(`Signup failed: ${errorMessage}`);
            }
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