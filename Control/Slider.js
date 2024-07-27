document.addEventListener('DOMContentLoaded', function() {
    const sliderImage = document.getElementById('sliderImage');
    const imagesPc = [
        '../../Resources/Img/Slide/1920x/Clases-img.png',
        '../../Resources/Img/Slide/1920x/Iosi-img.png'
    ];
    const imagesMobile = [
        '../../Resources/Img/Slide/375x/img-slide-m1.jpg',
        '../../Resources/Img/Slide/375x/img-slide-m2.jpg'
    ];

    let currentIndex = 0;
    let images = window.innerWidth > 768 ? imagesPc : imagesMobile;

    function updateSlider() {
        sliderImage.src = images[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
    }

    updateSlider();
    setInterval(updateSlider, 5000);

    window.addEventListener('resize', function() {
        images = window.innerWidth > 768 ? imagesPc : imagesMobile;
        currentIndex = 0;
        updateSlider();
    });
});
