document.addEventListener("DOMContentLoaded", function() {
    // Carga Header y Footer en HTML
    function loadHTML(file, elementId, callback) { 
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById(elementId).innerHTML = xhr.responseText;
                    console.log("Loaded " + file + " into #" + elementId);

                    // Ejecutar callback después de insertar el HTML
                    if (callback) callback();
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

    // Cargar el Header y luego inicializar el menú
    loadHTML('../../Visual/Html/Header.html', 'Header', function() {
        var menuButton = document.getElementById('menuButton');
        var menu = document.getElementById('menu');
        
        if (menuButton && menu) {
            menuButton.addEventListener('click', function() {
                menu.classList.toggle('active');
            });
        }
    });

    // Cargar el Footer normalmente
    loadHTML('../../Visual/Html/Footer.html', 'Footer');
});
