document.addEventListener('DOMContentLoaded', () => {
    const projectName = window.location.hash.substring(1);
    const title = document.getElementById("project-title");
    const description = document.getElementById("project-description");
    const image = document.getElementById("project-img");
    const source = document.getElementById("project-source");
    
    if (projectName) {
        loadProject(projectName);
    } else {
        title.textContent = "Select a project!";
    }

    function loadProject(name) {
        const projects = {
            "game-of-life-qe": {
                title: "Game of Life: Quantum Edition",
                description: "A Python-based recreation of Conway's Game of Life using Quantum Randomness",
                img: "../assets/images/gol_demo.png",
                source: "https://github.com/BrotatoBoiV2/Game-of-Life"
            }
        };

        const project = projects[name];

        if (project) {
            title.textContent = project.title;
            description.textContent = project.description;
            image.src = project.img;
            source.href = project.source;
        } else {
            title.textContent = "Project not found!";
            description.textContent = "";
            image.src = "";
            source.href = ".";
        }
    }
});