// Display toast notification
const sendResponMessage = (message = 'check your connection', type = 'info') => {
    // Get toast elements
    const toastElement = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    const toastTitle = document.getElementById('toast-title');
    const toastIcon = document.getElementById('toast-icon');

    // Set message
    toastMessage.textContent = message;

    // Set type-specific styling
    toastIcon.className = 'fas me-2';

    switch(type) {
        case 'success':
            toastTitle.textContent = 'Success';
            toastIcon.classList.add('fa-check-circle');
            toastIcon.style.color = 'var(--success-color)';
            break;
        case 'error':
            toastTitle.textContent = 'Error';
            toastIcon.classList.add('fa-exclamation-circle');
            toastIcon.style.color = 'var(--danger-color)';
            break;
        case 'warning':
            toastTitle.textContent = 'Warning';
            toastIcon.classList.add('fa-exclamation-triangle');
            toastIcon.style.color = '#ffc107';
            break;
        default:
            toastTitle.textContent = 'Notification';
            toastIcon.classList.add('fa-info-circle');
            toastIcon.style.color = 'var(--primary-color)';
    }

    // Create Bootstrap toast instance and show it
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    toast.show();
}
