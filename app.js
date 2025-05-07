// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    initDarkMode();

    // Initialize the note form
    initNoteForm();

    // Load both active and archived notes
    getActiveNotes();
    getArchiveNotes();
});
