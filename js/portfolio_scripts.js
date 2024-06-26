document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    fetch('js/json/projects.json')
        .then(response => response.json())
        .then(data => {
            console.log('Data Recieved')
            const projectsContainer = document.getElementById('portfolio-container');
            data.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                let projectHTML = `
                    <img src="${project.img}" class="project-image"></img>
                    <div class="project-content">
                        <div>
                            <h3 class="project-title">${project.title}</h3>

                `;

                if (project.status.toLowerCase() === 'ongoing') {
                    projectHTML += `
                            <div class="label">${project.status}</div>
                        </div>
                        <p class="project-keywords">${project.keywords}</p>
                        <p class="project-description">${project.description}</p>
                        <p class="project-tech-stack"><strong>Tech Stack:</strong> ${project.techStack}</p>
                    `;
                } else {
                    projectHTML += `
                        </div>
                        <p class="project-keywords">${project.keywords}</p>
                        <p class="project-description">${project.description}</p>
                        <p class="project-tech-stack"><strong>Tech Stack:</strong> ${project.techStack}</p>
                        <p class="project-date"><strong>${project.status}:</strong> ${project.date}</p>                
                    `;
                }

                if (project.link && project.link.trim() !== "") {
                    projectHTML += `
                        <a href="${project.link}" class="project-link"><i class="fa-brands fa-github" class="social-fa"></i> Read more</a>                
                    `;
                }

                projectHTML += `
                    </div> 
                    <!-- Project content card -->
                `;

                projectCard.innerHTML = projectHTML;

                // projectCard.innerHTML = `
                //     <img src="${project.img}" class="project-image"></img>
                //     <div class="project-content">
                //         <div>
                //             <h3 class="project-title">${project.title}</h3>
                //             <div class="label">${project.status}</div>
                //         </div>
                //         <p class="project-keywords">${project.keywords}</p>
                //         <p class="project-description">${project.description}</p>
                //         <p class="project-tech-stack"><strong>Technology Stack:</strong> ${project.techStack}</p>
                //         <p class="project-date"><strong>${project.status}:</strong> ${project.date}</p>
                //     </div>
                // `;

                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});
