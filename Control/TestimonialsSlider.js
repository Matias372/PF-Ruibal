document.addEventListener("DOMContentLoaded", function () {
    const testimonialsContainer = document.querySelector(".testimonials-container");
    const testimonials = document.querySelectorAll(".testimonial");
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;

    // Definir el ancho de cada testimonio y el gap
    const testimonialWidth = 80; // Ancho de cada testimonio en porcentaje
    const gap = 20; // Espacio entre testimonios en píxeles

    // Función para mostrar testimonio en el slider
    function showTestimonial(index) {
        if (index >= totalTestimonials) {
            currentIndex = 0; // Reinicia en el primer testimonio
        } else if (index < 0) {
            currentIndex = totalTestimonials - 1; // Vuelve al último testimonio
        } else {
            currentIndex = index;
        }
        // Calcular el desplazamiento teniendo en cuenta el ancho y el gap
        const offset = -currentIndex * (testimonialWidth + (gap / (100 / testimonialWidth)));
        testimonialsContainer.style.transform = `translateX(${offset}%)`;
    }

    // Funciones para cambiar testimonio manualmente
    document.querySelector(".slider-btn.left").addEventListener("click", function () {
        showTestimonial(currentIndex - 1);
    });

    document.querySelector(".slider-btn.right").addEventListener("click", function () {
        showTestimonial(currentIndex + 1);
    });

    // Cambio automático cada 4 segundos
    setInterval(() => {
        showTestimonial(currentIndex + 1);
    }, 4000);
});