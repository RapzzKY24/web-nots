const baseUrl = 'https://notes-api.dicoding.dev/v2';

// Get all active notes
const getActiveNotes = async () => {
    // Show loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    
    try {
        const res = await fetch(`${baseUrl}/notes`)
        const resJson = await res.json()

        if (resJson.err) {
            loadingIndicator.style.display = 'none';
            return sendResponMessage(resJson.err, 'error')
        }

        if (Array.isArray(resJson.data)) {
            displayData(resJson.data, false) // false means not archived
        } else {
            sendResponMessage('Data is not in the expected format', 'warning')
        }
    } catch (err) {
        sendResponMessage(err.message || 'Check your connection', 'error')
    } finally {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
    }
}

// Get all archived notes
const getArchiveNotes = async () => {
    // Use the same loading indicator for simplicity
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    
    try {
        const res = await fetch(`${baseUrl}/notes/archived`)
        const resJson = await res.json()

        if (resJson.err) {
            loadingIndicator.style.display = 'none';
            return sendResponMessage(resJson.err, 'error')
        } 
        
        if (Array.isArray(resJson.data)) {
            displayData(resJson.data, true) // true means archived
        } else {
            sendResponMessage('Data is not in the expected format', 'warning')
        }
    } catch (err) {
        sendResponMessage(err.message || 'Check your connection', 'error')
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Add a new note
const inputMessage = async (notes) => {
    // Get submit button and set loading state
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...';
    submitBtn.disabled = true;

    try {
        const option = {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(notes),
        }
        const res = await fetch(`${baseUrl}/notes`,option)
        const json = await res.json()

        if (json.status === 'success') {
            sendResponMessage(json.message || 'Note added successfully', 'success')
        } else {
            sendResponMessage(json.message || 'Failed to add note', 'error')
        }

        getActiveNotes()
    } catch (err) {
        sendResponMessage(err.message, 'error')
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Delete a note
const deleteMessage = async (noteID, buttonElement) => {
    const originalBtnText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    buttonElement.disabled = true;

    try {
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const response = await fetch(`${baseUrl}/notes/${noteID}`, option)
        const responseJson = await response.json()

        if (responseJson.status === 'success') {
            sendResponMessage(responseJson.message || 'Note deleted successfully', 'success')
        } else {
            sendResponMessage(responseJson.message || 'Failed to delete note', 'error')
            // Reset button if deletion failed
            buttonElement.innerHTML = originalBtnText;
            buttonElement.disabled = false;
        }

        getActiveNotes()
    } catch (err) {
        sendResponMessage(err.message, 'error')
        // Reset button on error
        buttonElement.innerHTML = originalBtnText;
        buttonElement.disabled = false;
    }
}

// Archive a note
const archiveMessage = async (noteID, buttonElement) => {
    const originalBtnText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    buttonElement.disabled = true;

    try {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const res = await fetch(`${baseUrl}/notes/${noteID}/archive`, option);
        const resJson = await res.json();
        
        if (resJson.status === 'success') {
            sendResponMessage(resJson.message || 'Note archived successfully', 'success');
        } else {
            sendResponMessage(resJson.message || 'Failed to archive note', 'error');
        }

        // Refresh both active and archived notes
        getActiveNotes();
        getArchiveNotes();
    } catch (err) {
        sendResponMessage(err.message || 'Error occurred while archiving note', 'error');
    } finally {
        buttonElement.innerHTML = originalBtnText;
        buttonElement.disabled = false;
    }
}

// Unarchive a note
const unarchiveMessage = async (noteID, buttonElement) => {
    const originalBtnText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    buttonElement.disabled = true;

    try {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const res = await fetch(`${baseUrl}/notes/${noteID}/unarchive`, option);
        const resJson = await res.json();
        
        if (resJson.status === 'success') {
            sendResponMessage(resJson.message || 'Note unarchived successfully', 'success');
        } else {
            sendResponMessage(resJson.message || 'Failed to unarchive note', 'error');
        }

        // Refresh both active and archived notes
        getActiveNotes();
        getArchiveNotes();
    } catch (err) {
        sendResponMessage(err.message || 'Error occurred while unarchiving note', 'error');
    } finally {
        buttonElement.innerHTML = originalBtnText;
        buttonElement.disabled = false;
    }
}
