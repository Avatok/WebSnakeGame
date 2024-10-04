// Prüft, ob das Gerät mobil ist, und zeigt das Modal an
function checkIfMobile() {
    if (window.innerWidth < 992) { // Standardgröße für mobile Geräte unter 992px
        var myModal = new bootstrap.Modal(document.getElementById('mobileWarningModal'));
        myModal.show();
    }
}

// Beim Laden der Seite und bei Fensteränderung überprüfen
window.onload = checkIfMobile;
window.onresize = checkIfMobile;
