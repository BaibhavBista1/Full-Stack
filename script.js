// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const projectsGrid = document.getElementById('projectsGrid');
const scrollProgress = document.getElementById('scrollProgress');
const currentYearElement = document.getElementById('currentYear');
const hoverSound = document.getElementById('hoverSound');

// Projects Data
const projects = [
    {
        title: "Weather Application",
        description: "A responsive weather app that displays current weather and forecasts using JavaScript, CSS, HTML, and PHP.",
        image: "assets/weather-app.jpg",
        tags: ["HTML", "CSS", "JavaScript", "PHP"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        title: "Unity Game Project",
        description: "A 3D game developed with Unity and C++ featuring immersive gameplay and stunning visuals.",
        image: "assets/game-project.jpg",
        tags: ["Unity", "C++", "3D Modeling"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        title: "Mobile Application",
        description: "A cross-platform mobile app built with Java and C++ with focus on user experience and performance.",
        image: "assets/mobile-app.jpg",
        tags: ["Java", "C++", "UI/UX"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        title: "E-commerce Website",
        description: "A fully responsive e-commerce platform with product listings, cart functionality, and secure checkout.",
        image: "assets/ecommerce.jpg",
        tags: ["HTML", "CSS", "JavaScript", "PHP"],
        demoLink: "#",
        codeLink: "#"
    }
];

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearElement.textContent = new Date().getFullYear();
    
    // Load projects
    loadProjects();
    
    // Add scroll event listener for navbar and progress bar
    window.addEventListener('scroll', handleScroll);
    
    // Add hover sound to project cards
    addHoverSoundToProjects();
});

// Mobile menu toggle
menuToggle.addEventListener('click', toggleMenu);

function toggleMenu() {
    // Toggle the CSS class (controls visibility via CSS)
    navLinks.classList.toggle('active');
    
    // Update the button for accessibility
    const isExpanded = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Change icon (hamburger to X)
    const icon = menuToggle.querySelector('i');
    if (isExpanded) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Please fill out all required fields.';
        formMessage.style.color = 'red';
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    formMessage.textContent = `Thank you for your message, ${name}! I will get back to you soon.`;
    formMessage.style.color = 'green';
    
    // Reset form
    this.reset();
});

// Load projects dynamically
function loadProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link">Live Demo</a>
                    <a href="${project.codeLink}" class="project-link outline">View Code</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Handle scroll for navbar effect and progress bar
function handleScroll() {
    // Navbar effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add hover sound to project cards
function addHoverSoundToProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Play hover sound (optional)
            // hoverSound.currentTime = 0;
            // hoverSound.play().catch(e => console.log("Audio play failed:", e));
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu if open when resizing to desktop
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});