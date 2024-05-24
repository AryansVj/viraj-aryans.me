function observeSections(entries, observer) {
    // IntersectionObserver instance Callback function when a section is observed as scrolled
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the class visible making the section visible when intersected
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

function loadSections() {
    // Function to animate Loading sections when scrolling
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(observeSections, options);
    const sections = document.querySelectorAll('.scroll-section');  // Select all the sections need to be loaded

    // Apply observer for each section
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
    
    const home_url = 'home.html';
    fetch(home_url)
    .then(response => {
        if (!response.ok) {
            throw Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        contentDiv.innerHTML = data;
        loadSections();
    })
    
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
    
    loadSections(); // To load any sections that are in the window when the page is loading

    // Navigation bar fixing when scrolling below banner
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
