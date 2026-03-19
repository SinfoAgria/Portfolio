/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.querySelectorAll(".modal-gallery").forEach(gallery => {

    const mainImage = gallery.querySelector(".main-image");
    const thumbnails = gallery.querySelectorAll(".modal-thumb");
    const leftArrow = gallery.querySelector(".left-arrow");
    const rightArrow = gallery.querySelector(".right-arrow");

    let currentIndex = 0;

    function updateGallery(index){

        currentIndex = index;

        mainImage.src = thumbnails[currentIndex].src;

        thumbnails.forEach(img => img.classList.remove("active-thumb"));
        thumbnails[currentIndex].classList.add("active-thumb");

    }

    thumbnails.forEach((thumb, index) => {

        thumb.addEventListener("click", () => {

            updateGallery(index);

        });

    });

    leftArrow.addEventListener("click", () => {

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = thumbnails.length - 1;
        }

        updateGallery(currentIndex);

    });

    rightArrow.addEventListener("click", () => {

        currentIndex++;

        if(currentIndex >= thumbnails.length){
            currentIndex = 0;
        }

        updateGallery(currentIndex);

    });

});

document.addEventListener("keydown", function(e){

    const activeModal = document.querySelector(".portfolio-modal.show");

    if(!activeModal) return;

    const gallery = activeModal.querySelector(".modal-gallery");

    if(!gallery) return;

    const leftArrow = gallery.querySelector(".left-arrow");
    const rightArrow = gallery.querySelector(".right-arrow");

    if(e.key === "ArrowRight"){
        rightArrow.click();
    }

    if(e.key === "ArrowLeft"){
        leftArrow.click();
    }

});
