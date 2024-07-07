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
    displayGif('gif-Alimentar');
}

function play() {
    if (happiness >= 0 && happiness <= 80) { // Asegurando que no pase de 100
        happiness += 20;
    } else if (happiness > 80) {
        happiness = 100; // Ajustar a 100 si se supera
    }
    updateStats();
    // Mostrar GIF de jugar
    displayGif('gif-Jugar');
}

function clean() {
    // Ocultar GIF sucio
    const dirtyGif = document.getElementById('gif-sucio');

    if (dirtyGif && dirtyGif.style) {
        dirtyGif.style.display = 'none';
        isDirty = false;
        clearInterval(DirtyInterval);
        happinessDecreaseRate = 0.5;
    }

    
}

function displayGif(gifId) {

    //ubicar div de gifs
    const imgAlimentar = document.getElementById("gif-Alimentar");
    const imgJugar = document.getElementById("gif-Jugar");
    //identificar gif
    const gif = document.getElementById(gifId);
    //quitar ambos
    imgAlimentar.style.display = 'none';
    imgJugar.style.display = 'none';
    //mostrar gif correspondiente
    gif.style.display = 'block';
    //eliminar gif cuando termina el tiempo
    setTimeout(() => {
        gif.style.display = 'none';
    }, 2000); // Remover el GIF después de 3 segundos
}

function decreaseStats() {
    hunger += hungerDecreaseRate;
    happiness -= happinessDecreaseRate;

    if (hunger > 100) hunger = 100;
    if (happiness < 0) happiness = 0;
    
    updateStats();
    if (hunger === 100) {
        displayFinalMessage("Rocky se cansó de esperar por comida, se fue a buscarla él mismo");
        clearInterval(gameInterval);
    }

    if (happiness === 0) {
        displayFinalMessage("Rocky se aburrió, se fue a pasear por el barrio con otros perros");
        clearInterval(gameInterval);
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
