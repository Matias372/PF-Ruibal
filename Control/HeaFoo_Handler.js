document.addEventListener("DOMContentLoaded", function() {
    // Carga Header y Footer en html.
    function loadHTML(file, elementId) { 
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById(elementId).innerHTML = xhr.responseText;
                    console.log("Loaded " + file + " into #" + elementId);
                } else {
                    console.error("Error loading " + file + ": " + xhr.statusText);
                }
            }
        };
        xhr.onerror = function() {
            console.error("Request error for " + file);
        };
        xhr.send();
    }

    loadHTML('../../Visual/Html/Header.html', 'Header');
    loadHTML('../../Visual/Html/Footer.html', 'Footer');
});

// Función para mostrar y ocultar el menu
function toggleMenu() {
    var navBotones = document.getElementById('botones');
    navBotones.classList.toggle('active');
}