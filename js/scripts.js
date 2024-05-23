document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.scroll-section');
    const header = document.getElementById('header');
    const nav = document.querySelector('.navigation');
    const bannerHeight = document.querySelector('.banner').offsetHeight;
    let isNavFixed = false;

    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY >= bannerHeight && !isNavFixed) {
            nav.classList.add('fixed');
            isNavFixed = true;
        } else if (window.scrollY < bannerHeight && isNavFixed) {
            nav.classList.remove('fixed');
            isNavFixed = false;
        }
    });
});
