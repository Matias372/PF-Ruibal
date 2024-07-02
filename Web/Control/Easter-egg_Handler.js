let hunger = 5;
let happiness = 5;
let clickCount = 0;
let clickTimeout;

function handleLogoClick() {
    clickCount++;
    if (clickCount === 1) {
        clickTimeout = setTimeout(resetClickCount, 5000);
    }
    if (clickCount === 10) {
        clearTimeout(clickTimeout);
        window.location.href = 'special.html'; // Redirigir a la página deseada
    }
}

        function resetClickCount() {
            clickCount = 0;
        }


function updateStats() {
    document.getElementById('hunger').innerText = hunger;
    document.getElementById('happiness').innerText = happiness;
}

function feed() {
    if (hunger > 0) {
        hunger--;
        updateStats();
    }
}

function play() {
    if (happiness < 10) {
        happiness++;
        updateStats();
    }
}

function decreaseStats() {
    hunger++;
    happiness--;
    if (hunger > 10) hunger = 10;
    if (happiness < 0) happiness = 0;
    updateStats();
    if (hunger === 10 || happiness === 0) {
        alert('Tu Tamagotchi ha muerto :(');
        clearInterval(gameInterval);
    }
}

updateStats();

let gameInterval = setInterval(decreaseStats, 3000);
