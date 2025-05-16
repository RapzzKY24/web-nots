const displayData = (notes, isArchived) => {
    const containerNotesList = document.getElementById(isArchived ? 'notes-list-archived' : 'notes-list');
    containerNotesList.innerHTML = '';

    if (notes.length === 0) {
        containerNotesList.innerHTML = `
            <div class="col-12 empty-notes">
                <i class="fas fa-${isArchived ? 'archive' : 'sticky-note'} fa-3x mb-3"></i>
                <p>${isArchived ? 'No archived notes yet.' : 'No notes yet. Create your first note!'}</p>
            </div>
        `;
        return;
    }

    notes.forEach(note => {
        const childNotesList = document.createElement('div');
        childNotesList.className = 'col-md-6 col-lg-4 mb-4';
        childNotesList.innerHTML = `
            <div class="note-card card h-100">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.body}</p>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-action btn-delete" id=${note.id}>
                            <i class="fas fa-trash-alt me-1"></i> Delete
                        </button>
                        <button class="btn btn-action ${isArchived ? 'btn-unarchive btn-info' : 'btn-archive btn-warning'}" id="${note.id}">
                            <i class="fas fa-${isArchived ? 'inbox' : 'archive'} me-1"></i>
                            ${isArchived ? 'Unarchive' : 'Archive'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        containerNotesList.appendChild(childNotesList);
    });

    
    const buttonDelete = document.querySelectorAll('.btn-delete');
    buttonDelete.forEach(button => {
        button.addEventListener('click', (e) => {
            const noteID = e.target.closest('.btn-delete').id;
            deleteMessage(noteID, e.target.closest('.btn-delete'));
        });
    });

   
    const archiveButtons = containerNotesList.querySelectorAll('.btn-archive');
    archiveButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const noteID = e.target.closest('.btn-archive').id;
            archiveMessage(noteID, e.target.closest('.btn-archive'));
        });
    });
    
    
    const unarchiveButtons = containerNotesList.querySelectorAll('.btn-unarchive');
    unarchiveButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const noteID = e.target.closest('.btn-unarchive').id;
            unarchiveMessage(noteID, e.target.closest('.btn-unarchive'));
        });
    });
}
