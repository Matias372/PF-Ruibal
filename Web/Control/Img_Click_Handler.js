let clickCount = 0;
let clickTimeout;

function handleLogoClick() {
    clickCount++;
    if (clickCount === 1) {
        clickTimeout = setTimeout(resetClickCount, 5000);
    }
    if (clickCount === 10) {
        clearTimeout(clickTimeout);
        window.location.href = 'Easter-egg.html'; // Redirigir a la página deseada
    }
}

function resetClickCount() {
    clickCount = 0;
}