const content = document.getElementById('content');

function setActiveButton(page) {
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-page') === page);
    });
}

async function loadPage(page) {
    const file = `./frames/${page}.html`;

    try {
        const response = await fetch(file);

        if (!response.ok) throw new Error('Page not found');
        content.innerHTML = await response.text();
        setActiveButton(page);
    } catch (err) {
        content.innerHTML = `<p>Error loading page: ${err.message}</p>`;
    }
}

const initialPage = location.hash.replace('#', '') || 'home';
loadPage(initialPage);

document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.getAttribute('data-page');
        loadPage(page);
        window.history.pushState({ page }, '', `#${page}`);
    });
});

window.addEventListener('popstate', e => {
    const page = e.state?.page || 'home';
    loadPage(page);
});