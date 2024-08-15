window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(function() {
        loadingScreen.style.display = 'none';
    }, 10); // 5000 ms = 5 segundos
});
