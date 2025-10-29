// DOM Elements
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const closeMenu = document.getElementById('close-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sideLinks = document.querySelectorAll('.side-link');
const ctaButtons = document.querySelectorAll('.cta-button');
const modelButtons = document.querySelectorAll('.model-button');
const contactForm = document.querySelector('.contact-form form');

// Menu Toggle Functionality
function toggleMenu() {
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Close Menu Function
function closeMenuFunc() {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners for Menu
hamburger.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', closeMenuFunc);

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', closeMenuFunc);
});

sideLinks.forEach(link => {
    link.addEventListener('click', closeMenuFunc);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenuFunc();
    }
});

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scroll to all navigation links
[...navLinks, ...sideLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target.startsWith('#')) {
            smoothScroll(target);
        }
    });
});

// CTA Button functionality
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Descobrir')) {
            smoothScroll('#models');
        } else if (button.textContent.includes('Agendar')) {
            smoothScroll('#contact');
        }
    });
});

// Model button functionality
modelButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // Add animation or modal functionality here
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Scroll to contact section for more info
        smoothScroll('#contact');
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add transition to navbar
navbar.style.transition = 'transform 0.3s ease-in-out';

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.model-card, .value-card, .contact-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        const requiredFields = ['Nome', 'Email'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`input[placeholder="${field}"]`);
            if (!input.value.trim()) {
                input.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
            contactForm.reset();
        } else {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
        closeMenuFunc();
    }
});

// Add hover effects to model cards
const modelCards = document.querySelectorAll('.model-card');
modelCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Images are loaded normally without lazy loading to avoid disappearing issues

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #b8941f);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rexor website loaded successfully');
    
    // Add any initialization code here
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.minHeight = '100vh';
    }
});
