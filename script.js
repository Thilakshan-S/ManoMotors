// Initialize Lucide Icons
lucide.createIcons();

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false, // Animates every time you scroll up/down
    mirror: true,
    offset: 50
});

// Dark Mode Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');

const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

// Check initial theme 
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    if (lightIcon) lightIcon.classList.remove('hidden');
    if (lightIconMobile) lightIconMobile.classList.remove('hidden');
} else {
    if (darkIcon) darkIcon.classList.remove('hidden');
    if (darkIconMobile) darkIconMobile.classList.remove('hidden');
}

function toggleTheme() {
    // Animate toggle buttons
    const btns = [themeToggleBtn, themeToggleBtnMobile];
    btns.forEach(btn => {
        if (btn) {
            btn.classList.add('rotate-[360deg]');
            setTimeout(() => {
                btn.classList.remove('rotate-[360deg]');
            }, 500);
        }
    });

    // toggle icons
    setTimeout(() => {
        if (darkIcon) darkIcon.classList.toggle('hidden');
        if (lightIcon) lightIcon.classList.toggle('hidden');
        if (darkIconMobile) darkIconMobile.classList.toggle('hidden');
        if (lightIconMobile) lightIconMobile.classList.toggle('hidden');
    }, 100);

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('max-h-0');
        mobileMenu.classList.toggle('max-h-screen');
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('opacity-100');
        mobileMenu.classList.toggle('border-t-0');
        mobileMenu.classList.toggle('border-t');
        mobileMenu.classList.toggle('pointer-events-none');
    }
    if (menuIcon) menuIcon.classList.toggle('hidden');
    if (closeIcon) closeIcon.classList.toggle('hidden');
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMobileMenu();
    });
}

// Close mobile menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (mobileMenu && mobileMenu.classList.contains('max-h-screen')) {
        // If the click is NOT inside the mobile menu AND NOT on the mobile menu button
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            toggleMobileMenu();
        }
    }
});

// --- Owner Login Logic ---
const ownerLoginTrigger = document.getElementById('owner-login-trigger');
const ownerLoginModal = document.getElementById('owner-login-modal');
const closeLoginModal = document.getElementById('close-login-modal');
const ownerLoginForm = document.getElementById('owner-login-form');
const loginError = document.getElementById('login-error');

function toggleLoginModal(show) {
    if (show) {
        ownerLoginModal.classList.remove('hidden');
        ownerLoginModal.classList.add('flex');
        setTimeout(() => {
            ownerLoginModal.classList.remove('opacity-0');
            ownerLoginModal.classList.add('opacity-100');
            ownerLoginModal.querySelector('div').classList.remove('scale-95');
            ownerLoginModal.querySelector('div').classList.add('scale-100');
        }, 10);
    } else {
        ownerLoginModal.classList.remove('opacity-100');
        ownerLoginModal.classList.add('opacity-0');
        ownerLoginModal.querySelector('div').classList.remove('scale-100');
        ownerLoginModal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            ownerLoginModal.classList.add('hidden');
            ownerLoginModal.classList.remove('flex');
            loginError.classList.add('hidden');
            ownerLoginForm.reset();
        }, 300);
    }
}

if (ownerLoginTrigger) ownerLoginTrigger.addEventListener('click', () => toggleLoginModal(true));
if (closeLoginModal) closeLoginModal.addEventListener('click', () => toggleLoginModal(false));

ownerLoginModal?.addEventListener('click', (e) => {
    if (e.target === ownerLoginModal) toggleLoginModal(false);
});

ownerLoginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('owner-email').value;
    const password = document.getElementById('owner-password').value;

    if (email === 'manomotors@gmail.com' && password === 'mano225%94') {
        localStorage.setItem('isOwner', 'true');
        window.open('dashboard.html', '_blank');
        toggleLoginModal(false);
    } else {
        loginError.classList.remove('hidden');
    }
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('max-h-screen')) {
            toggleMobileMenu();
        }
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 10) {
        navbar.classList.add('shadow-lg', 'bg-opacity-95', 'backdrop-blur-md');
        navbar.classList.remove('shadow-none', 'bg-opacity-100');
    } else {
        navbar.classList.remove('shadow-lg', 'bg-opacity-95', 'backdrop-blur-md');
        navbar.classList.add('shadow-none', 'bg-opacity-100');
    }
});