// Portfolio Website JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Smooth Scrolling for Navigation Links
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            mobileNavLinks.forEach(link => link.classList.remove('active'));
            
            const activeNavLink = document.querySelector(`[href="#${sectionId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
        }
    });
}

// Contact Form Handling
function handleContactForm(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        event.target.reset();
        showNotification('Message sent successfully!', 'success');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
    notification.classList.add(bgColor, 'text-white');
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Typing Animation Effect with Enhanced Color Transitions
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const nameElement = document.getElementById('name-text');
    if (!typingElement || !nameElement) return;
    
    const words = [
        { text: 'Machine Learning Enthusiast', color: 'from-blue-600 to-purple-600' },
        { text: 'AI Explorer', color: 'from-blue-500 to-cyan-500' },
        { text: 'Data Engineer', color: 'from-green-600 to-emerald-600' },
        { text: 'Python Developer', color: 'from-yellow-500 to-orange-500' },
        { text: 'Part-time Web Developer', color: 'from-orange-500 to-red-500' }
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.text.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.text.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Update gradient color based on current word
        typingElement.className = `text-2xl md:text-3xl font-semibold mb-8 text-gray-700 dark:text-gray-300 typing-animation bg-gradient-to-r ${currentWord.color} bg-clip-text text-transparent`;
        
        // Synchronize name colors with typing animation
        const nameColors = [
            'from-blue-600 via-purple-600 to-cyan-600',
            'from-purple-600 via-pink-600 to-blue-600',
            'from-green-600 via-emerald-600 to-blue-600',
            'from-yellow-500 via-orange-500 to-red-500',
            'from-orange-500 via-red-500 to-purple-600'
        ];
        
        nameElement.className = `text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${nameColors[wordIndex]} bg-clip-text text-transparent animate-name-colors`;
        
        let typeSpeed = 120;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentWord.text.length) {
            typeSpeed = 2500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 800; // Pause before typing next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(type, 1500);
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

// Profile Image Loading Animation
function initProfileImageAnimation() {
    const profileImage = document.querySelector('.profile-image-container img');
    if (!profileImage) return;
    
    profileImage.addEventListener('load', () => {
        profileImage.classList.add('image-loaded');
        profileImage.style.opacity = '1';
    });
    
    profileImage.addEventListener('error', () => {
        console.log('Profile image failed to load, using fallback');
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypingAnimation();
    initScrollAnimations();
    initParallaxEffect();
    initProfileImageAnimation();
    
    themeToggle.addEventListener('click', toggleTheme);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', handleContactForm);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);
            toggleMobileMenu();
        });
    });
    
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    });
    
    // Add smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
