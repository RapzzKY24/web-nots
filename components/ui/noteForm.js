// Initialize the note form component
const initNoteForm = () => {
    const inputTitle = document.querySelector('#input-title')
    const inputBodyMessage = document.querySelector('#input-message')
    const submitNewMessage = document.querySelector('#submit-btn')

    // Add input event listeners for real-time validation feedback
    inputTitle.addEventListener('input', () => {
        if (inputTitle.value.trim()) {
            inputTitle.classList.remove('is-invalid');
        }
    });

    inputBodyMessage.addEventListener('input', () => {
        if (inputBodyMessage.value.trim()) {
            inputBodyMessage.classList.remove('is-invalid');
        }
    });

    submitNewMessage.addEventListener('click', () => {
        const title = inputTitle.value.trim()
        const body = inputBodyMessage.value.trim()
        let isValid = true;

        if (!title) {
            inputTitle.classList.add('is-invalid');
            isValid = false;
        }

        if (!body) {
            inputBodyMessage.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            sendResponMessage('Please fill in all required fields', 'warning');
            return;
        }

        const note = { title, body }
        inputMessage(note)

        // Clear form after submission
        inputTitle.value = ''
        inputBodyMessage.value = ''

        // Add a slight animation to the form to indicate successful submission
        const form = document.querySelector('.note-form');
        form.style.transition = 'all 0.3s ease';
        form.style.transform = 'scale(0.98)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 300);
    });
}
