// Fonctions pour l'agrandissement d'images
function openFullscreen(src, alt) {
    const fullscreenContainer = document.getElementById('imageFullscreen');
    const fullscreenImg = document.getElementById('fullscreenImg');
    
    fullscreenImg.src = src;
    fullscreenImg.alt = alt;
    
    fullscreenContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Empêche le défilement
}

function closeFullscreen() {
    const fullscreenContainer = document.getElementById('imageFullscreen');
    
    fullscreenContainer.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactive le défilement
}

// Fermer l'image en plein écran avec la touche Echap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFullscreen();
    }
});
