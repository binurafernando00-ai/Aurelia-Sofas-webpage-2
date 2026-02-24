import { categories, galleryImages } from './data.js';


lucide.createIcons();


document.addEventListener('DOMContentLoaded', () => {
    

    const grid = document.getElementById('collection-grid');
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = `group relative overflow-hidden rounded-2xl h-80 ${cat.colSpan} cursor-pointer collection-card`;
        
        item.innerHTML = `
            <img src="${cat.image}" alt="${cat.title}" class="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition-all">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 class="text-white font-serif text-2xl font-medium">${cat.title}</h3>
                <p class="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-75 transform translate-y-2 group-hover:translate-y-0">${cat.desc}</p>
            </div>
            <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </div>
        `;
        grid.appendChild(item);
    });


    const galleryTrack = document.getElementById('gallery-track');
    galleryImages.forEach(src => {
        const imgDiv = document.createElement('div');
        imgDiv.className = "w-[300px] md:w-[400px] h-[300px] rounded-xl overflow-hidden flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300";
        imgDiv.innerHTML = `<img src="${src}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery Image">`;
        galleryTrack.appendChild(imgDiv);
    });


    

    gsap.registerPlugin(ScrollTrigger);


    const heroTl = gsap.timeline();
    heroTl.to('.hero-content', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
          .to('.hero-image', { scale: 1, duration: 2, ease: 'power2.out' }, "<");


    gsap.to('.feature-item', {
        scrollTrigger: {
            trigger: '.feature-bar',
            start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });


    gsap.to('.about-text', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });


    gsap.to('.section-header', {
        scrollTrigger: {
            trigger: '#collection',
            start: 'top 75%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8
    });


    gsap.to('.custom-content', {
        scrollTrigger: {
            trigger: '#custom',
            start: 'top 60%',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });
    gsap.to('.custom-image', {
        scrollTrigger: {
            trigger: '#custom',
            start: 'top 60%',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });


    const scroller = document.getElementById('gallery-scroller');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -400, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }


    let isDown = false;
    let startX;
    let scrollLeft;

    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        scroller.classList.add('active');
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });
    scroller.addEventListener('mouseleave', () => {
        isDown = false;
        scroller.classList.remove('active');
    });
    scroller.addEventListener('mouseup', () => {
        isDown = false;
        scroller.classList.remove('active');
    });
    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scroller.scrollLeft = scrollLeft - walk;
    });


    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isOpen = !mobileMenu.classList.contains('hidden');
        menuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });


    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });


    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

});
