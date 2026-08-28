// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Get Started Button
document.querySelector('.btn-primary').addEventListener('click', function() {
    const coursesSection = document.getElementById('courses');
    coursesSection.scrollIntoView({ behavior: 'smooth' });
});

// Enroll Now Buttons
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        alert('Thank you for your interest! Please log in to enroll in this course.');
    });
});

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (name && email && message) {
        alert(`Thank you ${name}! Your message has been sent. We'll contact you at ${email} soon.`);
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add Scroll Animation for Course Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Login Button Handler
document.querySelector('.btn-login').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Login feature coming soon! You will be redirected to our authentication portal.');
});

console.log('Hesbone Darasa - Learning Platform Loaded Successfully!');
