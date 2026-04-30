/* ================================================
   Like a Canvas — Main JS
   Webflow完全独立版
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ================================================
  // PRELOADER
  // ================================================
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 300);
    });
  }

  // ================================================
  // NAVBAR スクロール
  // ================================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ================================================
  // ハンバーガーメニュー
  // ================================================
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ================================================
  // HERO VIDEO SLIDER
  // ================================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    heroSlides[currentSlide]?.classList.remove('active');
    heroDots[currentSlide]?.classList.remove('active');
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide]?.classList.add('active');
    heroDots[currentSlide]?.classList.add('active');
  }

  function startSlider() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  if (heroSlides.length > 0) {
    goToSlide(0);
    startSlider();

    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(i);
        startSlider();
      });
    });

    // 矢印ボタン
    const heroSection = document.querySelector('.hero');
    heroSection?.querySelector('.hero-arrow-prev')?.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(currentSlide - 1);
      startSlider();
    });
    heroSection?.querySelector('.hero-arrow-next')?.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(currentSlide + 1);
      startSlider();
    });

    // スワイプ（スマホ）
    let heroTouchX = 0;
    heroSection?.addEventListener('touchstart', e => { heroTouchX = e.touches[0].clientX; }, { passive: true });
    heroSection?.addEventListener('touchend', e => {
      const diff = heroTouchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        clearInterval(sliderInterval);
        goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        startSlider();
      }
    }, { passive: true });
  }

  // ================================================
  // ARCHIVES — スプレッドシートからロード
  // ================================================
  const archivesGrid = document.querySelector('.archives-grid[data-dynamic]');
  if (archivesGrid) {
    loadArchives(archivesGrid);
  }

  // ================================================
  // PRODUCT DETAIL — サムネイル切り替え
  // ================================================
  const thumbs = document.querySelectorAll('.detail-thumb');
  const mainImg = document.querySelector('.detail-main-img');

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = thumb.src;
          mainImg.style.opacity = '1';
        }, 200);
      }
    });
  });

  // ================================================
  // スクロールアニメーション
  // ================================================
  const fadeEls = document.querySelectorAll('[data-fade]');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

});

// ================================================
// 商品データ（インライン）
// ================================================
const PRODUCTS = [
  {
    slug: 'nfrgmt-tape',
    title: 'NFRGMT Masking Tape',
    description: 'NFRGMTオリジナルマスキングテープ。',
    images: ['6819d717e97984633ddb818a_DSC01543 2のコピー.jpg']
  },
  {
    slug: 'strike-staff-t-shirt',
    title: '"STRIKE!" STAFF T-shirt',
    description: 'スタッフ向けオリジナルTシャツ。',
    images: ['681ac9e687cad6b4b083b570_DSC01419_0002_DSC01434.jpg', '681b02869f09a54f86f32551_DSC01590.jpg']
  },
  {
    slug: 'join-alive-nf-sacoche',
    title: '"JOIN ALIVE × NF" サコッシュ',
    description: 'JOIN ALIVE × NFコラボサコッシュ。',
    images: ['681af5a9a7e83363a565b3be_DSC01439_0003_背景.jpg']
  },
  {
    slug: 'sakanaction-eureka-t-shirt',
    title: 'sakanaction Eureka T-shirt',
    description: 'sakanaction Eureka ツアーTシャツ。',
    images: ['681afca6b1026f7389055124_DSC01732_0000_レイヤー 0_0003_背景.jpg']
  },
  {
    slug: 'nfrgmt-slumbers-hoodie',
    title: 'NFRGMT slumbers Hoodie',
    description: 'NFRGMTオリジナルパーカー。',
    images: ['681b068125cef1412628d803_DSC01703_0004_背景_0003_背景.jpg']
  },
  {
    slug: 'item-06',
    title: 'Original Item 06',
    description: 'OEMオリジナルアイテム。',
    images: ['681b02869f09a54f86f32551_DSC01590.jpg']
  },
  {
    slug: 'item-07',
    title: 'Original Item 07',
    description: 'OEMオリジナルアイテム。',
    images: ['6726f97f12589c89e209d25f_スクリーンショット 2024-11-03 13.14.14.jpg']
  },
  {
    slug: 'item-08',
    title: 'Original Item 08',
    description: 'OEMオリジナルアイテム。',
    images: ['6726fd7bda54fc946df22c83_スクリーンショット 2024-11-03 13.32.37.jpg']
  },
  {
    slug: 'item-09',
    title: 'Original Item 09',
    description: 'OEMオリジナルアイテム。',
    images: ['6726fd911d64c7d0aa81d4ca_スクリーンショット 2024-11-03 13.32.26.jpg']
  },
  {
    slug: 'item-10',
    title: 'Original Item 10',
    description: 'OEMオリジナルアイテム。',
    images: ['67273aa6aca8c9d370007363_スクリーンショット 2024-11-03 17.55.10.jpg']
  },
  {
    slug: 'item-11',
    title: 'Original Item 11',
    description: 'OEMオリジナルアイテム。',
    images: ['67273ab27cab3af512d607aa_スクリーンショット 2024-11-03 17.53.28.jpg']
  },
  {
    slug: 'item-12',
    title: 'Original Item 12',
    description: 'OEMオリジナルアイテム。',
    images: ['67273abfae56b39e24af4bd6_スクリーンショット 2024-11-03 17.54.37.jpg']
  },
  {
    slug: 'item-13',
    title: 'Original Item 13',
    description: 'OEMオリジナルアイテム。',
    images: ['67273acccb09c6c7744d306f_スクリーンショット 2024-11-03 17.53.19.jpg']
  },
  {
    slug: 'item-14',
    title: 'Original Item 14',
    description: 'OEMオリジナルアイテム。',
    images: ['67273ae982aa37fea65877ab_スクリーンショット 2024-11-03 17.53.02.jpg']
  },
  {
    slug: 'item-15',
    title: 'Original Item 15',
    description: 'OEMオリジナルアイテム。',
    images: ['67273af4aad62a5fb8796628_スクリーンショット 2024-11-03 17.50.30.jpg']
  },
  {
    slug: 'item-16',
    title: 'Original Item 16',
    description: 'OEMオリジナルアイテム。',
    images: ['67273afe41f0c324a91e0752_スクリーンショット 2024-11-03 17.52.17.jpg']
  },
  {
    slug: 'item-17',
    title: 'Original Item 17',
    description: 'OEMオリジナルアイテム。',
    images: ['67273b09f881d1a5e6fa5ba7_スクリーンショット 2024-11-03 17.50.12.jpg']
  },
  {
    slug: 'item-18',
    title: 'Original Item 18',
    description: 'OEMオリジナルアイテム。',
    images: ['67273b1ff947d566edcc29b9_スクリーンショット 2024-11-03 17.50.43.jpg']
  }
];

// ================================================
// アーカイブ描画
// ================================================
function loadArchives(container) {
  container.innerHTML = '';
  PRODUCTS.forEach(p => {
    const item = document.createElement('div');
    item.className = 'archive-item';
    item.innerHTML = `
      <a href="product.html?id=${p.slug}">
        <img src="assets/images/${p.images[0]}" alt="${p.title}" loading="lazy">
        <div class="archive-item-overlay">
          <div class="archive-item-info">
            <div class="archive-item-title">${p.title}</div>
            <div class="archive-item-desc">${p.description}</div>
          </div>
        </div>
      </a>
    `;
    container.appendChild(item);
  });
}
