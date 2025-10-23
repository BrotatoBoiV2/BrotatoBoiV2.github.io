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
            description: "A Python-based recreation of Conway's Game of Life using Quantum Randomness.",
            img: "./assets/images/gol_demo.png",
            source: "https://github.com/BrotatoBoiV2/Game-of-Life",
        },
    };

    // ~ Helper: Safely get element by id. ~ //
    function getEl(id) {
        const el = document.getElementById(id);
        if (!el) console.warn(`⚠️ Missing element: #${id}`);
        return el;
    }

    // === Load a page into `#content`. ~ //
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
        const project = projects[name];
        const title = getEl("project-title");
        const description = getEl("project-description");
        const image = getEl("project-img");
        const source = getEl("project-source");

        if (!title || !description || !image || !source) return;

        if (project) {
            title.textContent = project.title;
            description.textContent = project.description;
            image.src = project.img;
            source.href = project.source;
        } else {
            title.textContent = "Project not found!";
            description.textContent = "";
            image.src = "";
            source.removeAttribute("href");
        }
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
            window.location.hash = page; // triggers handleHashChange()
        });
    });

    // === POPSTATE HANDLER (for back/forward navigation) ===
    window.addEventListener("popstate", handleHashChange);
});
