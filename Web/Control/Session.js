document.addEventListener('DOMContentLoaded', (event) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    function showLoggedInElements() {
        document.querySelector('.botones').style.display = 'block';
        document.querySelector('.contenedor').style.display = 'block';
        document.querySelector('#loginForm').style.display = 'none';
    }

    function hideLoggedInElements() {
        document.querySelector('.botones').style.display = 'none';
        document.querySelector('.contenedor').style.display = 'none';
        document.querySelector('#loginForm').style.display = 'block';
    }

    if (isLoggedIn) {
        showLoggedInElements();
    } else {
        hideLoggedInElements();
    }

    document.querySelector('#loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        fetch('../../Model/SessionLogin.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('Usuario o contraseña incorrectos')) {
                alert('Usuario o contraseña incorrectos.');
            } else {
                localStorage.setItem('isLoggedIn', true);
                showLoggedInElements();
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Manejar el clic en el botón "Cerrar sesión"
    document.querySelector('#cerrarSesion').addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        hideLoggedInElements();
        // Redirigir a la página de inicio de sesión o a la página principal
        window.location.href = '../../Visual/Html/AdminDog.html';
    });
});
