// src/js/dashboard.js

import { supabase } from './supabase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const designsList = document.getElementById('designs-list');
    const createNewDesignButton = document.getElementById('create-new-design');
    const logoutButton = document.getElementById('logout-button');

    supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                loadUserDesigns(user.id);
            }
        } else {
            // Redirect to login if not authenticated
            window.location.href = '/public/login.html';
        }
    });

    createNewDesignButton.addEventListener('click', () => {
        window.location.href = '/public/index.html'; // Redirect to the main editor
    });

    logoutButton.addEventListener('click', async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            alert('Logged out successfully!');
            window.location.href = '/public/login.html';
        } catch (error) {
            alert(error.message);
        }
    });

    async function loadUserDesigns(userId) {
        designsList.innerHTML = ''; // Clear existing designs
        const { data, error } = await supabase
            .from('designs')
            .select('id, name, lastModified')
            .eq('userId', userId);

        if (error) {
            console.error('Error loading designs:', error.message);
            designsList.innerHTML = '<p>Error loading designs.</p>';
            return;
        }

        if (data.length === 0) {
            designsList.innerHTML = '<p>No designs yet. Click "Create New Design" to get started!</p>';
            return;
        }

        data.forEach((design) => {
            const designCard = document.createElement('div');
            designCard.className = 'design-card';
            designCard.innerHTML = `
                <h3>${design.name || 'Untitled Design'}</h3>
                <p>Last modified: ${new Date(design.lastModified).toLocaleString()}</p>
                <button class="edit-design" data-id="${design.id}">Edit</button>
                <button class="delete-design" data-id="${design.id}">Delete</button>
            `;
            designsList.appendChild(designCard);
        });

        // Add event listeners for edit and delete buttons
        designsList.querySelectorAll('.edit-design').forEach(button => {
            button.addEventListener('click', (e) => {
                const designId = e.target.dataset.id;
                window.location.href = `/public/index.html?designId=${designId}`;
            });
        });

        designsList.querySelectorAll('.delete-design').forEach(button => {
            button.addEventListener('click', async (e) => {
                const designId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this design?')) {
                    try {
                        const { error } = await supabase
                            .from('designs')
                            .delete()
                            .eq('id', designId);

                        if (error) throw error;
                        alert('Design deleted successfully!');
                        loadUserDesigns(userId); // Reload designs
                    } catch (error) {
                        alert('Error deleting design: ' + error.message);
                    }
                }
            });
        });
    }
});
