document.addEventListener('DOMContentLoaded', () => {
    // Simple intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('h2, h3, p, .group, form');
    animateElements.forEach(el => {
        el.classList.add('transition', 'duration-1000', 'opacity-0', 'translate-y-10', 'ease-out');
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white', 'shadow-md', 'text-brand-navy');
            header.classList.remove('bg-transparent', 'text-white');
            // Change logo/text color logic if needed based on structure
            // For now, the header starts transparent? Wait, the initial HTML has fixed header but no bg color specified initially for transparent effect?
            // Let's adjust header initial state in CSS/JS or just let it be white always?
            // The HTML has `bg-white` not set initially? Adjusting logic:
            if(header.querySelector('h1')) {
                // header.querySelector('h1').classList.remove('text-white');
                // header.querySelector('h1').classList.add('text-brand-navy');
            }
        } else {
           if(window.scrollY <= 10) {
               header.classList.remove('bg-white', 'shadow-md');
               header.classList.add('bg-white/90', 'backdrop-blur-sm'); // Keep it readable always for now as hero text is white
           }
        }
    });
    
    // Initial header state
    header.classList.add('bg-white/90', 'backdrop-blur-sm', 'shadow-sm');
});
