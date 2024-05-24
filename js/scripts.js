function observeSections(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

function loadSections() {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(observeSections, options);
    const sections = document.querySelectorAll('.scroll-section');

    sections.forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Started");
    const sections = document.querySelectorAll('.scroll-section');
    const header = document.getElementById('header');
    const nav = document.querySelector('.navigation');
    const bannerHeight = document.querySelector('.banner').offsetHeight;
    let isNavFixed = false;

    
    // SPA content management
    const links = document.querySelectorAll('.nav-link')
    const contentDiv = document.getElementById('content')
    console.log('The retreved consts are ', links, contentDiv);
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('clicked');
            const url = this.getAttribute('href');
            console.log('got the href', url);
            
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
                loadSections();
            })
            
            .catch(error => {
                console.error('Error fetching content:', error);
                contentDiv.innerHTML = '<p>Sorry, an error occurred while loading the content.</p>';
            })
            console.log(contentDiv.innerHTML)
        })
    })
    
    loadSections();

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
