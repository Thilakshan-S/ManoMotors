// Initialize Lucide Icons
lucide.createIcons();

// Initialize AOS
AOS.init({ duration: 800, once: true });

// Dark Mode Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    if (lightIcon) lightIcon.classList.remove('hidden');
    if (lightIconMobile) lightIconMobile.classList.remove('hidden');
} else {
    if (darkIcon) darkIcon.classList.remove('hidden');
    if (darkIconMobile) darkIconMobile.classList.remove('hidden');
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');

    [darkIcon, lightIcon, darkIconMobile, lightIconMobile].forEach(icon => {
        if (icon) icon.classList.toggle('hidden');
    });
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('max-h-0');
    mobileMenu.classList.toggle('max-h-screen');
    mobileMenu.classList.toggle('opacity-0');
    mobileMenu.classList.toggle('opacity-100');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    mobileMenu.classList.toggle('pointer-events-none');
});

// EmailJS Integration
(function () {
    // Replace with your Public Key
    emailjs.init("*******");
})();

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span><i data-lucide="loader" class="w-5 h-5 animate-spin"></i>';
    lucide.createIcons();

    // Replace with your Service ID and Template ID
    const serviceID = '*******';
    const templateID = '*******';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            formStatus.textContent = "Message sent successfully! We'll get back to you soon.";
            formStatus.classList.remove('hidden', 'text-red-500');
            formStatus.classList.add('text-green-500');
            contactForm.reset();
        }, (error) => {
            formStatus.textContent = "Failed to send message. Please try again or contact us directly.";
            formStatus.classList.remove('hidden', 'text-green-500');
            formStatus.classList.add('text-red-500');
            console.log('FAILED...', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i data-lucide="send" class="w-5 h-5"></i>';
            lucide.createIcons();
        });
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

    if (email === 'owner@gmail.com' && password === '123456') {
        localStorage.setItem('isOwner', 'true');
        window.open('dashboard.html', '_blank');
        toggleLoginModal(false);
    } else {
        loginError.classList.remove('hidden');
    }
});