// Initialize EmailJS
emailjs.init("S3cEx7j5h9pPJ2bya");

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Initialize splash screen
function initSplashScreen() {
    const splashScreen = document.querySelector('.splash-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    // Array of loading messages
    const loadingMessages = [
        'Loading amazing things...',
        'Preparing your experience...',
        'Almost there...',
        'Just a moment...'
    ];
    
    // Change loading message every 800ms
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        loadingText.textContent = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 800);
    
    // Hide splash screen after animation
    setTimeout(() => {
        clearInterval(messageInterval);
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, 3000);
}

// Initialize skill bars with animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                bar.style.width = level;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Navigation Active State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor hover effects
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('link-grow');
        cursorFollower.classList.add('link-grow');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('link-grow');
        cursorFollower.classList.remove('link-grow');
    });
});

// Projects Data
const projects = [
    {
        title: "Peach Project",
        description: "An innovative web application focused on user experience.",
        image: "project.png",
        link: "https://peach-nancey-79.tiiny.site"
    },
    {
        title: "Silver Project",
        description: "Advanced data visualization and analytics platform.",
        image: "project.png",
        link: "https://silver-diane-marie-96.tiiny.site"
    },
    {
        title: "Lavender Project",
        description: "Modern e-learning management system.",
        image: "project.png",
        link: "https://lavender-elmira-23.tiiny.site"
    },
    {
        title: "Sapphire Project",
        description: "Real-time collaboration tools for remote teams.",
        image: "project.png",
        link: "https://sapphire-allis-14.tiiny.site/"
    },
    {
        title: "Chocolate Project",
        description: "E-commerce solution with AI-powered recommendations.",
        image: "project.png",
        link: "chocolate-glori-29.tiiny.site"
    },
    {
        title: "Brown Project",
        description: "Content management system with advanced features.",
        image: "project.png",
        link: "https://brown-cody-68.tiiny.site"
    },
    {
        title: "Blue Project",
        description: "Cloud-based file management solution.",
        image: "project.png",
        link: "https://orange-carmen-93.tiiny.site"
    },
    {
        title: "Orange Project",
        description: "Mobile-first responsive web application.",
        image: "project.png",
        link: "https://coral-gretna-59.tiiny.site"
    },
    {
        title: "Snap Shiksha",
        description: "teacher booking educational platform.",
        image: "logo.jpg",
        link: "https://673f764d7a24a.site123.me/"
    }
];

// Load Projects
const projectsContainer = document.getElementById('projects-container');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <a href="${project.link}" class="view-project" target="_blank">View Project</a>
        </div>
    `;
    projectsContainer.appendChild(projectCard);
});

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const message = form.querySelector('#message').value;
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Send email using EmailJS
        emailjs.send("service_qnp5i5u", "template_q94a4un", {
            from_name: name,
            reply_to: email,
            message: message
        }).then(
            () => {
                alert('Message sent successfully!');
                form.reset();
            },
            (error) => {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            }
        );
    });
}

// Email validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize scroll animations
function initScrollAnimations() {
    ScrollReveal().reveal('.hero-content', {
        delay: 200,
        distance: '50px',
        origin: 'bottom'
    });

    ScrollReveal().reveal('.about-left', {
        delay: 200,
        distance: '50px',
        origin: 'left'
    });

    ScrollReveal().reveal('.about-right', {
        delay: 400,
        distance: '50px',
        origin: 'right'
    });

    ScrollReveal().reveal('.skill-category', {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        interval: 200
    });

    ScrollReveal().reveal('.timeline-item', {
        delay: 200,
        distance: '50px',
        origin: 'left',
        interval: 200
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    initSkillBars();
    initThemeToggle();
    initScrollAnimations();
});
