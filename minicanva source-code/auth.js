// src/js/auth.js

// Placeholder for Firebase Authentication logic
// This file will handle user signup, login, and logout

import { supabase } from './supabase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-button');
    const signupForm = document.querySelector('#signup-button');

    if (loginForm) {
        loginForm.addEventListener('click', async () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            try {
                const { user, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                alert('Logged in successfully!');
                window.location.href = '/public/index.html'; // Redirect to main editor
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('click', async () => {
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            try {
                const { user, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert('Signed up successfully! Please check your email to confirm your account, then log in.');
                window.location.href = '/public/login.html'; // Redirect to login page
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Check auth state and redirect
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            // User is signed in, do nothing if already on index.html or dashboard.html
            if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) {
                window.location.href = '/public/index.html';
            }
        } else {
            // User is signed out, redirect to login if not already there
            if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('signup.html')) {
                window.location.href = '/public/login.html';
            }
        }
    });

    // Logout functionality (add a logout button in index.html later)
    window.logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            alert('Logged out successfully!');
            window.location.href = '/public/login.html';
        } catch (error) {
            alert(error.message);
        }
    };
});
