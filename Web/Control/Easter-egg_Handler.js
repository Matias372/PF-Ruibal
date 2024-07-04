let hunger = 5;
let happiness = 5;

function updateStats() {
    document.getElementById('hunger').innerText = hunger;
    document.getElementById('happiness').innerText = happiness;
}

function feed() {
    if (hunger > 0) {
        hunger--;
        updateStats();
        // Mostrar GIF de alimentación
        displayGif('gif-alimentar.gif');
    }
}

function play() {
    if (happiness < 10) {
        happiness++;
        updateStats();
        // Mostrar GIF de jugar
        displayGif('gif-jugar.gif');
    }
}

function displayGif(gifSrc) {
    const petContainer = document.getElementById('pet');
    petContainer.innerHTML += `<img src="${gifSrc}" class="extra-gif" alt="GIF adicional">`;
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

let gameInterval = setInterval(decreaseStats, 4000);
