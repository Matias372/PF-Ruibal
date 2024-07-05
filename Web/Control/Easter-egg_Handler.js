let hunger = 50; 
let happiness = 50;
var isDirty = false;
let hungerDecreaseRate = 0.5;
let happinessDecreaseRate = 0.5;
function updateStats() {
    document.getElementById('hunger-bar').value = hunger;
    document.getElementById('happiness-bar').value = happiness;
}

function feed() {
    if (hunger > 0 && hunger <= 80) { // Asegurando que no pase de 100
        hunger -= 20;
    } else if (hunger > 80) {
        hunger = 100; // Ajustar a 100 si se supera
    }
    updateStats();
    // Mostrar GIF de alimentación
    displayGif('../../Resources/Gif/gif-alimentar.gif');
}

function play() {
    if (happiness >= 0 && happiness <= 80) { // Asegurando que no pase de 100
        happiness += 20;
    } else if (happiness > 80) {
        happiness = 100; // Ajustar a 100 si se supera
    }
    updateStats();
    // Mostrar GIF de jugar
    displayGif('../../Resources/Gif/gif-jugar.gif');
}

function clean() {
    // Ocultar GIF sucio y mostrar GIF de acción
    const dirtyGif = document.querySelector('.dirty-gif');
    dirtyGif.style.display = 'none';

    isDirty = false;
    clearInterval(DirtyInterval);
    happinessDecreaseRate = 0.5;
}

function displayGif(gifSrc) {
    const petContainer = document.getElementById('pet');
    const existingGif = petContainer.querySelector('.extra-gif');

    if (existingGif) {
        existingGif.remove();
    }

    const gif = document.createElement('img');
    gif.src = gifSrc;
    gif.classList.add('extra-gif');
    gif.alt = 'GIF adicional';

    petContainer.appendChild(gif);

    setTimeout(() => {
        gif.remove();
    }, 2000); // Remover el GIF después de 3 segundos
}

function decreaseStats() {
    hunger += hungerDecreaseRate;
    happiness -= happinessDecreaseRate;

    if (hunger > 100) hunger = 100;
    if (happiness < 0) happiness = 0;
    
    updateStats();
    if (hunger === 100 || happiness === 0) {
        displayFinalMessage();
    }
}

function displayFinalMessage(message) {
    const deathMessage = document.getElementById('death-message');
    const messageText = deathMessage.querySelector('p');
    messageText.textContent = message;
    deathMessage.style.display = 'block';

    // Mostrar botón de volver a intentar
    const retryButton = deathMessage.querySelector('button');
    retryButton.addEventListener('click', () => {
        deathMessage.style.display = 'none';
        restartGame();
    });
}

function restartGame() {
    // Reiniciar valores y actualizar interfaz
    hunger = 50;
    happiness = 50;
    updateStats();

    // Ocultar el mensaje de muerte
    const deathMessage = document.getElementById('death-message');
    deathMessage.style.display = 'none';

    clearInterval(gameInterval);
    clearInterval(dirtyInterval);
}

function displaydirt(){
    if(isDirty == false){
        isDirty = true;
        const dirtyGif = document.getElementById('gif-sucio');
        dirtyGif.style.display = 'block';
        happinessDecreaseRate = 1;
    }
}

updateStats();

let gameInterval = setInterval(decreaseStats, 1000);
let DirtyInterval = setInterval(displaydirt, 30000);
