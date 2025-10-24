/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Programmer: Aaron "A.J." Cassell. (@BrotatoBoi)
                        Program Name: Portfolio Website.
Description: My portfolio website that showcases all of my projects I made.
                              File: main_script.js
                             Date: 2025/04/19
                           Version: 2025.10.23

===============================================================================

                        Copyright (C) 2025 BrotatoBoi 
        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published
        by: The Free Software Foundation, either the version 3 of the
        License, or any later version.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // ~ Project database. ~ //
    const projects = {
        "game-of-life-qe": {
            title: "Game of Life: Quantum Edition",
            subtitle: "A Quantum-Inspired Recreation of Conway's Classic Cellular Automaton",
            description: "An experimental Python-based project that introduces quantum randomness into Conway's Game of Life, creating unpredictable initial states and exploring quantum-inspired evolution patterns.",
            technologies: ["Python 3.13.7", "Qiskit 2.2.1", "Qiskit-Aer 0.17.2", "Colorama 0.4.6"],
            highlights: [
                "Quantum-driven initialization: uses quantum randomness to set the initial grid state.",
                "Real-time movement: observe the automaton's behavior in real-time.",
                "Continuous simulation mode: run the simulation automatically to watch long-term pattern evolution.",
                "Terminal visualization: uses Colorama for colored text, and has smooth updates, including toroidal edge wrapping.",
                "Includes classic pre-seeded patterns such as gliders, blinkers, and blocks."
            ],
            image: "assets/images/game-of-life-qe.png",
            source: "https://github.com/BrotatoBoiV2/Game-of-Life",
            demo: null
        },
    };

    // ~ Helper: Safely get element by id. ~ //
    function getEl(id) {
        const el = document.getElementById(id);
        if (!el) console.warn(`⚠️ Missing element: #${id}`);
        return el;
    }

    // ~ Load a page into `#content`. ~ //
    async function loadPage(page) {
        const file = `/frames/${page}.html`;
        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error(`Page not found: ${page}`);
            const html = await res.text();
            content.innerHTML = html;
        } catch (err) {
            console.error(err);
            content.innerHTML = `<p style="color:red;">Error loading page: ${err.message}</p>`;
        }
    }

    // ~ Load a specific project into the current page. ~ //
    function loadProject(name) {
        const container = document.getElementById("project-container");
        const project = projects[name];

        container.innerHTML = `
            <h1>${project.title}</h1>
            <h3>${project.subtitle}</h3>
            <img src="${project.image}" alt="${project.title}" id="project-image">
            <p>${project.description}</p>
            <h4>Technologies</h4>
            <ul>${project.technologies.map(t => `<li><span>${t}</span></li>`).join("")}</ul>
            <h4>Highlights</h4>
            <ul>${project.highlights.map(h => `<li><span>${h}</span></li>`).join("")}</ul>
            <br><br><br>
            <div class="links">
                <a href="${project.source}" target="_blank">Source Code</a>
                ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo</a>` : ""}
            </div>
        `;
    }

    // ~ Handle hash changes. ~ //
    async function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (!hash) {
            await loadPage("home");
            return;
        }

        const [page, project] = hash.split("|");
        await loadPage(page || "home");

        // ~ Wait until the new HTML is rendered, then load project info. ~ //
        if (project) loadProject(project);
    }

    // ~ Initial load ~ //
    if (window.location.hash) {
        handleHashChange(); // ~ Load the page and project from the hash. ~ //
    } else {
        loadPage("home"); // ~ Default page. ~ //
    }

    // ~ Hash-based navigation. ~ //
    window.addEventListener("hashchange", handleHashChange);

    // ~ Button-based navigation. (optional) ~ //
    document.querySelectorAll("nav button[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const page = btn.getAttribute("data-page");
            window.location.hash = page; // ~ Triggers handleHashChange(). ~ //
        });
    });

    // ~ Popstate handler. (for back/forward navigation) ~ //
    window.addEventListener("popstate", handleHashChange);
});
