const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');

// Change the icons inside the button based on previous settings
if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
)
    themeToggleLightIcon.classList.remove('hidden');
else themeToggleDarkIcon.classList.remove('hidden');

const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme') === 'light')
        localStorage.setItem('color-theme', 'dark');
    else localStorage.setItem('color-theme', 'light');

    detectTheme();
    invertSite();
});

for (const a of document.getElementsByClassName('nav-link'))
    a.className +=
        ' block py-2 px-4 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white';

for (const a of document.getElementsByClassName('nav-link-2'))
    a.className +=
        ' block py-2 pr-4 pl-3 text-sm text-black bg-black-700 rounded md:bg-transparent md:p-0 dark:text-white';

for (const element of document.getElementsByClassName('changeable-gradient')) {
    element.classList.toggle('gradient-text-dark');
    element.classList.toggle('gradient-text');
}

document.querySelector("#navbar [data-dropdown-toggle='control-center']").oncontextmenu = (e) =>
    e.preventDefault();

const resize = () =>
    (document.getElementById('mobile-navbar-scroll').style.height =
        window.innerHeight -
        document.getElementById('logo').getBoundingClientRect().height -
        48 +
        'px');

window.addEventListener('load', resize);
window.addEventListener('resize', resize);
