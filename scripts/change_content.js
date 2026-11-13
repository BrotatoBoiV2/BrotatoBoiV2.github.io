/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Programmer: Aaron "A.J." Cassell. (@BrotatoBoi)
                        Program Name: Portfolio Website.
Description: My portfolio website that showcases all of my projects I made.
                        File: ./scripts/change_content.js
                             Date: 2026/11/13
                           Version: 2026.11.13

===============================================================================

                        Copyright (C) 2025 BrotatoBoi 
        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published
        by: The Free Software Foundation, either the version 3 of the
        License, or any later version.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("main-content");
    const projects = {};

    async function loadPage(page) {
        const file = `/content/${page}.html`;

        try {
            const response = await fetch(file);

            if (!response.ok) throw new Error(`Page not found: ${page}`);

            const html = await response.text();
            content.innerHTML = html;
        } catch (err) {
            console.error(err);
            content.innerHTML = `<p style="color:red;">Error loading the page: ${err.message}</p>`;
        }
    }

    // function loadProject(name) {
        
    // }

    async function handleHash() {
        const hash = window.location.hash.substring(1);

        if (!hash) {
            await loadPage("home");
            return;
        }

        const [page, project] = hash.split("|");

        await loadPage(page || "home");

        // if (project) loadProject(project);
    }

    if(window.location.hash) {
        handleHash();
    } else {
        loadPage("home");
    }

    window.addEventListener("hash-handler", handleHash);
    document.querySelectorAll("nav button[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const page = btn.getAttribute("data-page");
            window.location.hash = page;
        });
    });

    window.addEventListener("popstate", handleHash);
});
