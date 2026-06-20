// ============================
// やきとり呑福 - JavaScript
// ============================

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mainNav.classList.contains('open'));
  });

  // ナビリンクをクリックで閉じる
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });

  // 外側クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });
}

// スクロールでフェードイン
const fadeEls = document.querySelectorAll('.fade-in');

if (fadeEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));
}

// ヘッダーのナビアクティブ状態をスクロールで更新
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.includes(current) && current !== '') {
      link.classList.add('active');
    }
  });
});

// 定番メニューカルーセル
const carouselInner = document.getElementById('carousel-inner');
const dots = document.querySelectorAll('.carousel-dots .dot');

if (carouselInner) {
  let currentIndex = 0;
  const slideCount = document.querySelectorAll('.carousel-item').length;
  let autoSlideInterval;

  function updateCarousel(index) {
    if (index >= slideCount) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slideCount - 1;
    } else {
      currentIndex = index;
    }

    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      updateCarousel(index);
      startAutoSlide();
    });
  });

  startAutoSlide();
}

// ヒーロー背景スライダー
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
  let currentHeroIndex = 0;
  setInterval(() => {
    heroSlides[currentHeroIndex].classList.remove('active');
    currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
    heroSlides[currentHeroIndex].classList.add('active');
  }, 6000);
}


