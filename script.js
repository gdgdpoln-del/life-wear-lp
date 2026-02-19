document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    const toggleMenu = () => {
        const isOpen = !mobileMenu.classList.contains('translate-x-full');
        if (isOpen) {
            mobileMenu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
            body.classList.remove('overflow-hidden');
            // Animate hamburger back
            menuBtn.querySelectorAll('span')[0].classList.remove('rotate-45', 'translate-y-2');
            menuBtn.querySelectorAll('span')[1].classList.remove('opacity-0');
            menuBtn.querySelectorAll('span')[2].classList.remove('-rotate-45', '-translate-y-2', 'w-6');
        } else {
            mobileMenu.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
            body.classList.add('overflow-hidden');
            // Animate hamburger to X
            menuBtn.querySelectorAll('span')[0].classList.add('rotate-45', 'translate-y-2');
            menuBtn.querySelectorAll('span')[1].classList.add('opacity-0');
            menuBtn.querySelectorAll('span')[2].classList.add('-rotate-45', '-translate-y-2', 'w-6');
        }
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('translate-x-full')) {
                toggleMenu();
            }
        });
    });

    // Intersection Observer for fade-in animations with staggered effects
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Check if it's a service card for staggered effect
                if (entry.target.classList.contains('group')) {
                    const cards = Array.from(document.querySelectorAll('#services .group'));
                    const cardIndex = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${cardIndex * 150}ms`;
                }

                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('#about h2, #about h3, #about p, #services h2, #services h3, #services .group, #contact h2, #contact h3, form');
    animateElements.forEach(el => {
        el.classList.add('transition', 'duration-1000', 'opacity-0', 'translate-y-10', 'ease-out');
        observer.observe(el);
    });

    // Header scroll effect, Hero Parallax, and Back-to-top
    const header = document.getElementById('header');
    const headerLogo = document.getElementById('header-logo');
    const heroImg = document.getElementById('hero-bg-img');
    const backToTop = document.getElementById('back-to-top');

    const updateEffects = () => {
        const scrollY = window.scrollY;

        // Header effect
        if (scrollY > 50) {
            header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'text-brand-navy', 'py-3');
            header.classList.remove('bg-transparent', 'text-white', 'py-4');
            if (headerLogo) {
                headerLogo.style.filter = 'invert(1)';
                headerLogo.style.mixBlendMode = 'normal';
            }
        } else {
            header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'text-brand-navy', 'py-3');
            header.classList.add('bg-transparent', 'text-white', 'py-4');
            if (headerLogo) {
                headerLogo.style.filter = 'none';
                headerLogo.style.mixBlendMode = 'normal';
            }
        }

        // Hero Parallax effect
        if (heroImg && scrollY < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`;
        }

        // Back to top button
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            } else {
                backToTop.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            }
        }
    };

    window.addEventListener('scroll', updateEffects);
    updateEffects();

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const btnSpan = submitBtn.querySelector('span');
            const originalText = btnSpan.innerText;

            btnSpan.innerText = '送信中...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success UI
                    formMessage.classList.remove('hidden');
                    contactForm.reset();
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Hide original button/form parts if desired, but here we just keep it clean
                    submitBtn.style.display = 'none';
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("送信中にエラーが発生しました。時間を置いて再度お試しください。");
                    }
                    btnSpan.innerText = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert("通信エラーが発生しました。ネットワーク接続を確認してください。");
                btnSpan.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

