import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.querySelector('.navbar');
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  const reveals = document.querySelectorAll('.reveal');

  // Auto-hide navbar on scroll
  let lastScrollY = 0;
  let ticking = false;

  const handleScroll = () => {
    let scrollY = window.pageYOffset;

    // Navbar: show on top, hide when scrolling down, show when scrolling up
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
      if (scrollY > lastScrollY && scrollY > 200) {
        // Scrolling DOWN — hide the navbar
        navbar.classList.add('navbar-hidden');
      } else {
        // Scrolling UP — show the navbar
        navbar.classList.remove('navbar-hidden');
      }
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = scrollY;

    // Move parallax backgrounds
    parallaxBgs.forEach((bg) => {
      let parentSection = bg.parentElement;
      let offsetTop = parentSection.offsetTop;
      let offsetHeight = parentSection.offsetHeight;

      if (scrollY >= offsetTop - window.innerHeight && scrollY <= offsetTop + offsetHeight) {
        let diff = scrollY - offsetTop;
        bg.style.transform = `translateY(${diff * 0.4}px)`;
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Init Check

  // Intersection Observer for scroll reveal animations
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // ========== Animated Counter for About Section ==========
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const suffix = element.dataset.suffix || '';

    function updateCounter() {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString() + suffix;
        return;
      }
      element.textContent = Math.floor(start).toLocaleString() + suffix;
      requestAnimationFrame(updateCounter);
    }
    updateCounter();
  }

  // Observe the stats section and trigger counting when visible
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = statsSection.querySelectorAll('.counter-number');
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            animateCounter(counter, target, 2500);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // Smooth scrolling for Anchor tags
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
