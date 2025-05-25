const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const step = entry.target.dataset.step;
            updateProgressDot(step);
            
            const content = entry.target.querySelector('.step-content');
            const image = entry.target.querySelector('.step-image');
            
            content.style.opacity = '0';
            content.style.transform = 'translateX(-20px)';
            image.style.opacity = '0';
            image.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                content.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
                
                image.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                image.style.opacity = '1';
                image.style.transform = 'translateX(0)';
            }, 200);
        }
    });
}, observerOptions);

document.querySelectorAll('.step-card').forEach(card => {
    observer.observe(card);
});

function updateProgressDot(step) {
    document.querySelectorAll('.progress-dot').forEach(dot => {
        const dotStep = parseInt(dot.dataset.step);
        const currentStep = parseInt(step);
        
        if (dotStep <= currentStep) {
            dot.classList.add('active');
            dot.style.transform = 'scale(1.1)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 200);
        } else {
            dot.classList.remove('active');
        }
    });
}

document.querySelectorAll('.progress-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const step = dot.dataset.step;
        const targetCard = document.querySelector(`.step-card[data-step="${step}"]`);
        
        document.querySelectorAll('.progress-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        const offset = 100;
        const targetPosition = targetCard.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navContainer = document.querySelector('.nav-container');

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navContainer.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navContainer.classList.contains('scroll-down')) {
        navContainer.classList.remove('scroll-up');
        navContainer.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navContainer.classList.contains('scroll-down')) {
        navContainer.classList.remove('scroll-down');
        navContainer.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('touchstart', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}, { passive: true });

// Smooth scroll for mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // Update active section
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').includes(current)) {
                    item.classList.add('active');
                }
            });
        }, 100);
    }
}, { passive: true });

let ticking = false;
document.querySelectorAll('.step-screenshot').forEach((image, idx) => {
    let currentY = 0;
    let isHovered = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = image.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                if (isInView) {
                    const speed = idx === 0 ? 0 : 0.05;
                    currentY = -(window.pageYOffset * speed);
                } else {
                    currentY = 0;
                }
                if (isHovered) {
                    image.style.transform = `translateY(${currentY}px) scale(1.05)`;
                } else {
                    image.style.transform = `translateY(${currentY}px) scale(1)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    image.addEventListener('mouseenter', () => {
        isHovered = true;
        image.style.transform = `translateY(${currentY}px) scale(1.05)`;
    });
    image.addEventListener('mouseleave', () => {
        isHovered = false;
        image.style.transform = `translateY(${currentY}px) scale(1)`;
    });
});

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.transform = 'translateY(-5px)';
        ctaButton.querySelector('.button-icon').style.transform = 'translateX(5px)';
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'translateY(0)';
        ctaButton.querySelector('.button-icon').style.transform = 'translateX(0)';
    });
} 