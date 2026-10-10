/**
 * Global App Controller
 */
document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
});

function checkUserSession() {
    const user = localStorage.getItem('ecotrace_user');
    if (user) {
        console.log('Active user session found.');
    }
}