// Main JS - Theme, RTL, Navigation

// ========================
// THEME TOGGLE (Dark/Light)
// ========================
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function handleThemeToggle() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', handleThemeToggle);
}
if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', handleThemeToggle);
}

function updateThemeIcon(theme) {
    const updateIcon = (toggle) => {
        if (!toggle) return;
        const icon = toggle.querySelector('i');
        if (!icon) return;
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    };
    updateIcon(themeToggle);
    updateIcon(themeToggleMobile);
}

// ========================
// RTL / LTR TOGGLE
// ========================
const rtlToggle = document.getElementById('rtl-toggle');
const rtlToggleMobile = document.getElementById('rtl-toggle-mobile');
const savedDir = localStorage.getItem('dir') || 'ltr';
body.setAttribute('dir', savedDir);
updateRtlPill(savedDir);

function handleRtlToggle() {
    const currentDir = body.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    body.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
    updateRtlPill(newDir);
}

if (rtlToggle) {
    rtlToggle.addEventListener('click', handleRtlToggle);
}
if (rtlToggleMobile) {
    rtlToggleMobile.addEventListener('click', handleRtlToggle);
}

function updateRtlPill(dir) {
    const updatePill = (toggle) => {
        if (!toggle) return;
        const label  = toggle.querySelector('.pill-label');
        const circle = toggle.querySelector('.pill-circle');
        if (dir === 'rtl') {
            if (label)  label.textContent  = 'RTL';
            if (circle) circle.textContent = 'R';
        } else {
            if (label)  label.textContent  = 'LTR';
            if (circle) circle.textContent = 'L';
        }
    };
    updatePill(rtlToggle);
    updatePill(rtlToggleMobile);
}

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            navMenu.classList.remove('open');
            document.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navMenu.classList.remove('open');
            document.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
        }
    });

    document.querySelectorAll('.nav-item > .nav-link').forEach(link => {
        const submenu = link.nextElementSibling;
        if (submenu && submenu.classList.contains('dropdown-menu')) {
            link.addEventListener('click', (event) => {
                if (window.innerWidth <= 1024) {
                    event.preventDefault();
                    const parent = link.parentElement;
                    parent.classList.toggle('open');
                }
            });
        }
    });
}

// ========================
// STICKY HEADER ON SCROLL
// ========================
const header = document.querySelector('.main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================
// ACTIVE NAV LINK
// ========================
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active-link');
    }
});

// ========================
// SMOOTH SCROLL FOR ANCHORS
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================
// AOS-LIKE SCROLL ANIMATIONS
// ========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('aos-visible');
        }
    });
};
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // run on load

// ========================
// VEHICLE FILTER (fleet.html)
// ========================
const filterBtns = document.querySelectorAll('.filter-btn');
const vehicleCards = document.querySelectorAll('.vehicle-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        vehicleCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========================
// TABS (dashboard / offers)
// ========================
const tabBtns = document.querySelectorAll('[data-tab]');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pane = document.getElementById(targetTab);
        if (pane) pane.classList.add('active');
    });
});

// ========================
// FAQ ACCORDION
// ========================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});
