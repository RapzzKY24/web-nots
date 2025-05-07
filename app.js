// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the note form
    initNoteForm();
    
    // Load both active and archived notes
    getActiveNotes();
    getArchiveNotes();
});
