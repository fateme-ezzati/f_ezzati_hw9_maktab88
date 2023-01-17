function modalOpen() {
    modal.fadeIn();
}

function modalClose() {
    resetModal();
    modal.fadeOut();
}

function resetModal() {9
    modalHeader.text('DEFAULT');
    modalBody.html('');
    modalFooter.html('');
}

window.onclick = function (event) {
    if (event.target == modal) {
        modalClose()
    }
};
