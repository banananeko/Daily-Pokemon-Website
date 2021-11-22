/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";

/* Must add the first addEventListener when you want to move internal JS script to external!!! */
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.navigation_hamburger').addEventListener('click', function() {
        document.querySelectorAll('.right_nav').forEach(nav => nav.classList.toggle('navigation_tray_reveal'));
    });
});