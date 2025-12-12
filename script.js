// Check Auth immediately to prevent content flash
(function checkAuth() {
    const user = localStorage.getItem('kickoff_user');
    const pathParts = window.location.pathname.split('/');
    let currentPage = pathParts.pop() || 'index.html';

    // Handle case where URL ends in slash (e.g. root dir)
    if (currentPage === '') currentPage = 'index.html';

    // Allow login.html to be accessed without auth
    if (!user && currentPage !== 'login.html') {
        // Build path to login.html preserving directory structure if needed, 
        // but for this flat structure, just login.html works.
        // We use replace to prevent back-button looping
        window.location.replace('login.html');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar and Footer
    injectLayout();

    // Highlight active link
    highlightActiveLink();
});

function injectLayout() {
    // Check for logged in user
    const user = localStorage.getItem('kickoff_user');

    let authLinkHTML = `<li><a href="login.html" class="nav-link btn" style="padding: 8px 16px; background-color: var(--primary); color: white;">Log In</a></li>`;

    if (user) {
        authLinkHTML = `
            <li style="display: flex; align-items: center; gap: 15px;">
                <span style="color: var(--text-main); font-weight: 600;">Hi, ${user}</span>
                <button onclick="logout()" class="nav-link" style="background: none; border: 1px solid var(--border); padding: 8px 12px; border-radius: 6px; cursor: pointer; color: var(--text-muted); font-size: 0.9rem;">Logout</button>
            </li>
        `;
    }

    const navbarHTML = `
    <nav class="navbar">
        <div class="container navbar-content">
            <a href="index.html" class="logo">KICK<span>OFF</span> FC</a>
            <button class="mobile-menu-btn" onclick="toggleMenu()">☰</button>
            <ul class="nav-links">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="schedule.html" class="nav-link">Schedule</a></li>
                <li><a href="players.html" class="nav-link">Players</a></li>
                <li><a href="stats.html" class="nav-link">Stats</a></li>
                <li><a href="discussion.html" class="nav-link">Fan Zone</a></li>
                ${authLinkHTML}
            </ul>
        </div>
    </nav>
    `;

    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div>
                    <h3>KICKOFF FC</h3>
                    <p style="color: var(--text-muted); margin-top: 10px;">
                        The heart of local sports. Join the community and support your team.
                    </p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul style="list-style: none; margin-top: 10px; color: var(--text-muted);">
                        <li style="margin-bottom: 8px;"><a href="schedule.html">Upcoming Matches</a></li>
                        <li style="margin-bottom: 8px;"><a href="players.html">Team Roster</a></li>
                        <li style="margin-bottom: 8px;"><a href="discussion.html">Fan Zone</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p style="color: var(--text-muted); margin-top: 10px;">
                        123 Sports Avenue<br>
                        Cityville, ST 12345<br>
                        contact@kickoff-fc.com
                    </p>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2024 KickOff FC. All rights reserved.
            </div>
        </div>
    </footer>
    `;

    // Insert Navbar at the start of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Insert Footer at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
}

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        // Simple check for href match
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function logout() {
    localStorage.removeItem('kickoff_user');
    window.location.href = 'index.html';
}
