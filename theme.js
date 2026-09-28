(function () {
    const storageKey = 'mtech-theme-v2';
    const skipHomeLoaderKey = 'mtech-skip-home-loader';
    const homeScrollPositionKey = 'mtech-home-scroll-position';

    if (document.body.classList.contains('service-site')) {
        document.addEventListener('click', event => {
            const homeLink = event.target.closest('a[href="index.html"]');
            if (!homeLink) return;
            try {
                sessionStorage.setItem(skipHomeLoaderKey, '1');
            } catch (error) {
                console.warn('No se pudo guardar el regreso al inicio:', error);
            }
        });
    } else {
        document.addEventListener('click', event => {
            const serviceLink = event.target.closest('a[href="quienes-somos.html"], a[href="mantenimiento-impresoras.html"], a[href="reparacion-computadoras.html"]');
            if (!serviceLink) return;
            try {
                sessionStorage.setItem(homeScrollPositionKey, String(window.scrollY));
            } catch (error) {
                console.warn('No se pudo guardar la posición del inicio:', error);
            }
        });
    }

    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-theme', isLight);
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.setAttribute('aria-pressed', String(isLight));
            button.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
            button.title = isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro';
            const icon = button.querySelector('i');
            if (icon) icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });
    }

    window.toggleTheme = function () {
        const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        try {
            localStorage.setItem(storageKey, nextTheme);
        } catch (error) {
            console.warn('No se pudo guardar la preferencia de tema:', error);
        }
        applyTheme(nextTheme);
    };

    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
    } catch (error) {
        console.warn('No se pudo leer la preferencia de tema:', error);
    }
    applyTheme(savedTheme);
})();