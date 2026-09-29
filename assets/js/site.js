(() => {
  'use strict';

  const WHATSAPP = '201284883885';
  const PHONE = '+201284883885';
  const GENERAL_MSG = 'السلام عليكم، جاي من موقع عاطف بدر وعايز أستفسر عن العربيات المتاحة.';

  const html = document.documentElement;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  /* ---------- intro (every load): a light line, the name written in gold, then the doors open ---------- */
  const intro = $('.intro');
  if (intro && html.classList.contains('intro-on')) {
    if (!location.hash) window.scrollTo(0, 0);
    html.style.overflow = 'hidden';

    const VIEWBOX_WIDTH = 4090;
    const EXIT_AT = 3450;
    const DOORS = { delay: 150, duration: 950, easing: 'cubic-bezier(.76, 0, .24, 1)' };
    const anims = [];
    const play = (el, frames, opts) => {
      const a = el.animate(frames, { fill: 'both', easing: 'cubic-bezier(.16, 1, .3, 1)', ...opts });
      anims.push(a);
      return a;
    };
    const fadeOut = (el, duration = 600) => play(el, [{ opacity: getComputedStyle(el).opacity }, { opacity: 0 }], { duration, easing: 'ease' });

    const mark = $('.intro__mark', intro);
    const outline = $('.intro__outline', intro);
    const strokes = $$('path', outline);
    const bar = $('.intro__bar', intro);
    const glow = $('.intro__glow', intro);
    const flare = $('.intro__flare', intro);
    const flash = (from, peak, to, opts) => play(flare, [
      { opacity: 0, transform: `translate(-50%, -50%) scale(${from})` },
      { opacity: peak, transform: 'translate(-50%, -50%) scale(1)', offset: 0.3 },
      { opacity: 0, transform: `translate(-50%, -50%) scale(${to})` },
    ], { easing: 'ease-out', ...opts });
    const dust = $('.intro__dust', intro);
    const heroMark = $('.hero__title .wordmark');
    const seal = $('.intro__seal', intro);
    const headerSeal = $('.site-header .brand__seal');
    seedMotes(dust, 70);

    // keep the tracing line about 1.6px wide at any screen size
    const unit = mark.getBoundingClientRect().width / VIEWBOX_WIDTH;
    strokes.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeWidth = String(1.6 / unit);
      p.style.strokeDasharray = `${len} ${len}`;
      p.style.strokeDashoffset = String(len);
    });

    flash(0.2, 1, 1.7, { delay: 80, duration: 1200 });
    play(bar, [{ transform: 'translate(-50%, -50%) scaleX(0)', opacity: 0 }, { transform: 'translate(-50%, -50%) scaleX(1)', opacity: 1 }], { delay: 150, duration: 1000 });
    play(glow, [{ opacity: 0, transform: 'translate(-50%, -58%) scale(.8)' }, { opacity: 1, transform: 'translate(-50%, -58%) scale(1)' }], { delay: 250, duration: 1800 });
    play(dust, [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, easing: 'ease' });
    // letters are traced in reading order, right to left
    strokes.forEach((p, i) => play(p, [{ strokeDashoffset: p.style.strokeDashoffset }, { strokeDashoffset: '0' }],
      { delay: 400 + i * 110, duration: 1150, easing: 'cubic-bezier(.65, 0, .35, 1)' }));
    play($('.intro__fill', intro), [{ opacity: 0 }, { opacity: 1 }], { delay: 1550, duration: 800, easing: 'ease' });
    play(outline, [{ opacity: 1 }, { opacity: 0 }], { delay: 2000, duration: 700, easing: 'ease' });
    play($('.intro__shine', intro), [{ opacity: 1, backgroundPosition: '160% 0' }, { opacity: 1, backgroundPosition: '-60% 0' }],
      { delay: 2150, duration: 1000, easing: 'cubic-bezier(.45, 0, .2, 1)' });
    play($('.intro__latin', intro), [{ opacity: 0, letterSpacing: '.9em' }, { opacity: 1, letterSpacing: '.45em' }], { delay: 2050, duration: 1100 });
    play($('.intro__tag', intro), [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { delay: 2300, duration: 800 });
    // his seal is stamped onto the light line
    play(seal, [
      { opacity: 0, transform: 'translate(-50%, -50%) scale(2.4) rotate(-24deg)', filter: 'blur(3px)' },
      { opacity: 1, transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', filter: 'blur(0px)' },
    ], { delay: 2300, duration: 460, easing: 'cubic-bezier(.55, 0, .8, .2)' });
    play($('.intro__ring', intro), [
      { opacity: 0.95, transform: 'translate(-50%, -50%) scale(.95)' },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(2.8)' },
    ], { delay: 2760, duration: 950, fill: 'forwards' });
    flash(0.5, 0.8, 2, { delay: 2740, duration: 700, fill: 'none' });
    play(mark, [
      { transform: 'translateY(0)' }, { transform: 'translateY(4px)', offset: 0.25 },
      { transform: 'translateY(-2px)', offset: 0.6 }, { transform: 'translateY(0)' },
    ], { delay: 2760, duration: 340, easing: 'ease-out', fill: 'none' });

    let timer = 0;
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      html.classList.remove('intro-on', 'intro-off');
      html.style.overflow = '';
      anims.forEach((a) => a.cancel());
      document.dispatchEvent(new Event('ab:intro-done'));
    };
    const exit = () => {
      if (html.classList.contains('intro-off')) return;
      html.classList.add('intro-off');
      html.classList.remove('intro-on'); // the hero copy and header start rising behind the doors
      fadeOut($('.intro__sub', intro), 300);
      fadeOut($('.intro__skip', intro), 250);
      play(bar, [
        { transform: 'translate(-50%, -50%) scaleX(1)', opacity: 1, filter: 'brightness(1)' },
        { transform: 'translate(-50%, -50%) scaleX(1.15)', opacity: 1, filter: 'brightness(1.9)', offset: 0.25 },
        { transform: 'translate(-50%, -50%) scaleX(1.5)', opacity: 0, filter: 'brightness(1)' },
      ], { duration: 800, easing: 'ease-out' });
      flash(0.6, 0.85, 2.2, { duration: 800 });
      const [top, bottom] = $$('.intro__door', intro);
      play(top, [{ transform: 'none' }, { transform: 'translateY(-101%)' }], DOORS);
      play(bottom, [{ transform: 'none' }, { transform: 'translateY(101%)' }], DOORS);
      $$('.intro__edge', intro).forEach((edge) => play(edge, [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0.6 }], DOORS));
      [glow, dust, $('.intro__grain', intro)].forEach((el) => fadeOut(el));

      // the gold name flies to its place in the hero
      const from = mark.getBoundingClientRect();
      const to = heroMark && heroMark.getBoundingClientRect();
      if (to && to.width && to.bottom > 0 && to.top < window.innerHeight) {
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        play(mark, [{ transform: 'none' }, { transform: `translate(${dx}px, ${dy}px) scale(${to.width / from.width})` }], DOORS);
      } else {
        fadeOut(mark, 500);
      }
      const sFrom = seal.getBoundingClientRect();
      const sTo = headerSeal && headerSeal.getBoundingClientRect();
      if (sTo && sTo.width) {
        const dx = sTo.left + sTo.width / 2 - (sFrom.left + sFrom.width / 2);
        const dy = sTo.top + sTo.height / 2 - (sFrom.top + sFrom.height / 2);
        play(seal, [
          { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          { opacity: 1, transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${sTo.width / sFrom.width})` },
        ], DOORS);
      } else {
        fadeOut(seal, 400);
      }
      timer = setTimeout(done, DOORS.delay + DOORS.duration + 30);
    };
    const skip = () => {
      if (finished) return;
      clearTimeout(timer);
      html.classList.remove('intro-on');
      intro.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: 'ease', fill: 'forwards' }).finished.then(done, done);
    };
    timer = setTimeout(exit, EXIT_AT);
    $('.intro__skip', intro).addEventListener('click', skip);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') skip(); });
  }

  // drifting gold dust: tiny CSS-animated specks. They run on the GPU, so the page does no work per frame
  // (a canvas redrawn from JavaScript kept phones recalculating the page 60 times a second).
  function seedMotes(box, count) {
    if (!box) return;
    const n = Math.round(count * (window.innerWidth < 700 ? 0.5 : 1));
    let out = '';
    for (let i = 0; i < n; i++) {
      const big = Math.random() < 0.12;
      const size = big ? 16 + Math.random() * 18 : 2 + Math.random() * 2.6;
      const alpha = (0.25 + Math.random() * 0.6) * (big ? 0.4 : 1);
      out += `<i class="mote${big ? ' mote--bloom' : ''}" style="left:${(Math.random() * 100).toFixed(1)}%;top:${(20 + Math.random() * 85).toFixed(1)}%;`
        + `width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;opacity:${alpha.toFixed(2)};`
        + `--path:mote-${Math.random() < 0.5 ? 'l' : 'r'};--dur:${(10 + Math.random() * 12).toFixed(1)}s;--delay:${(-Math.random() * 22).toFixed(1)}s"></i>`;
    }
    box.innerHTML = out;
  }
  // pause the specks while their section is off screen
  const pauseOffscreen = (box, section) => {
    if (!box || !section || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(([entry]) => box.classList.toggle('is-paused', !entry.isIntersecting)).observe(section);
  };

  /* ---------- WhatsApp links get a ready-made first message ---------- */
  $$('a[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa || GENERAL_MSG); });

  /* ---------- cars ---------- */
  const list = $('#cars-list');
  const filtersBox = $('#car-filters');
  const cars = (window.AB_CARS || []).filter((c) => c && c.status !== 'sold' && c.brand && c.model);

  const carTitle = (c) => [c.brand, c.model, c.year].filter(Boolean).join(' ');
  const priceText = (c) => (c.price ? `${Number(c.price).toLocaleString('en-US')} جنيه` : 'اسأل على واتساب');

  function carHTML(c) {
    const title = carTitle(c);
    const photos = (c.photos || []).filter(Boolean);
    const msg = `السلام عليكم، عايز أعرف سعر وتفاصيل ${title}${c.trim ? ` (${c.trim})` : ''} المعروضة على موقع عاطف بدر.`;
    const badge = c.status === 'reserved' ? 'محجوزة' : c.badge;
    const specs = (c.specs || []).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    const nav = photos.length > 1 ? `
      <div class="car__nav">
        <button type="button" data-step="-1" aria-label="الصورة السابقة"><svg class="icon"><use href="#i-prev"/></svg></button>
        <span class="car__count latin" dir="ltr"><span data-current>1</span> / ${photos.length}</span>
        <button type="button" data-step="1" aria-label="الصورة التالية"><svg class="icon"><use href="#i-next"/></svg></button>
      </div>` : '';
    return `
      <article class="car reveal" data-status="${esc(c.status || 'available')}" data-brand="${esc(c.brand)}">
        <div class="car__media">
          <div class="car__track"${photos.length > 1 ? ` tabindex="0" aria-label="صور ${esc(title)}"` : ''}>
            ${photos.map((p, i) => `<img src="${esc(p)}" alt="${esc(title)}${photos.length > 1 ? `، صورة ${i + 1}` : ''}" loading="lazy" decoding="async">`).join('')}
          </div>
          ${badge ? `<span class="car__badge">${esc(badge)}</span>` : ''}
          ${nav}
        </div>
        <div class="car__body">
          ${c.brandLatin ? `<p class="car__brand">${esc(c.brandLatin)}</p>` : ''}
          <h3 class="car__title">${esc(`${c.brand} ${c.model}`)}${c.year ? ` <span class="car__year">${esc(c.year)}</span>` : ''}</h3>
          ${c.trim ? `<p class="car__trim">${esc(c.trim)}</p>` : ''}
          ${specs ? `<dl class="car__specs">${specs}</dl>` : ''}
          <div class="car__price"><span>السعر</span><strong>${esc(priceText(c))}</strong></div>
          <div class="car__actions">
            <a class="btn btn--dark" href="${waLink(msg)}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-wa"/></svg>${c.price ? 'اسأل عن العربية' : 'اسأل عن السعر'}</a>
            <a class="btn btn--outline btn--square" href="tel:${PHONE}" aria-label="اتصل بالمعرض"><svg class="icon"><use href="#i-phone"/></svg></a>
          </div>
          ${c.post ? `<a class="car__post" href="${esc(c.post)}" target="_blank" rel="noopener">شوف المنشور على فيسبوك<svg class="icon"><use href="#i-out"/></svg></a>` : ''}
        </div>
      </article>`;
  }

  if (list) {
    if (cars.length) {
      list.innerHTML = cars.map(carHTML).join('');
      list.dataset.count = String(cars.length);
    } else {
      list.innerHTML = `<p class="cars__fallback">المعروض بيتجدد دلوقتي. <a href="${waLink(GENERAL_MSG)}" target="_blank" rel="noopener">اسألنا على واتساب</a> عن المتاح النهارده.</p>`;
    }

    // brand filter, only once the showroom list is long enough to need it
    const brands = [...new Set(cars.map((c) => c.brand))];
    if (filtersBox && cars.length >= 4 && brands.length > 1) {
      filtersBox.innerHTML = ['الكل', ...brands].map((b, i) =>
        `<button type="button" data-filter="${i ? esc(b) : ''}" aria-pressed="${i === 0}">${esc(b)}</button>`).join('');
      filtersBox.hidden = false;
      filtersBox.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        const want = btn.dataset.filter;
        $$('button', filtersBox).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        $$('.car', list).forEach((card) => {
          card.hidden = Boolean(want) && card.dataset.brand !== want;
          card.classList.add('is-in');
        });
      });
    }

    // the car card leans toward the pointer, with a soft light on the photo
    if (!calm && window.matchMedia('(pointer: fine)').matches) {
      list.addEventListener('pointermove', (e) => {
        const card = e.target.closest('.car');
        if (!card || !card.classList.contains('is-in') && html.classList.contains('motion')) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const tilt = list.dataset.count === '1' ? 3 : 6;
        card.classList.add('is-tilting');
        card.style.transform = `perspective(1400px) rotateX(${(-y * tilt).toFixed(2)}deg) rotateY(${(x * tilt).toFixed(2)}deg) translateY(-4px)`;
        const m = $('.car__media', card).getBoundingClientRect();
        card.style.setProperty('--gx', `${(((e.clientX - m.left) / m.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${(((e.clientY - m.top) / m.height) * 100).toFixed(1)}%`);
      });
      list.addEventListener('pointerout', (e) => {
        const card = e.target.closest('.car');
        if (!card || card.contains(e.relatedTarget)) return;
        card.classList.remove('is-tilting');
        card.style.transform = '';
      });
    }

    // photo galleries: swipe on phones, arrows everywhere
    list.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-step]');
      if (!btn) return;
      const track = $('.car__track', btn.closest('.car'));
      // RTL: moving forward means scrolling toward the left
      track.scrollBy({ left: -Number(btn.dataset.step) * track.clientWidth, behavior: calm ? 'auto' : 'smooth' });
    });
    list.addEventListener('scroll', (e) => {
      const track = e.target;
      if (!track.classList || !track.classList.contains('car__track')) return;
      const current = $('[data-current]', track.closest('.car'));
      if (current) current.textContent = String(Math.round(Math.abs(track.scrollLeft) / track.clientWidth) + 1);
    }, true);
  }

  /* ---------- the seal: a gold coin that spins in, sways, leans toward the mouse and flips on tap ----------
     Two image faces and three light wrappers. Every movement is a CSS or Web Animations transform, so it
     runs on the GPU and stays smooth on phones even while the reels' players load just below. */
  const coin = $('.coin');
  const persona = $('#persona');
  if (coin && persona) {
    const hoverEl = $('.coin__hover', coin);
    const spinEl = $('.coin__spin', coin);
    const stage = $('.persona__stage', persona);
    const shadow = $('.coin__shadow', persona);
    const canAnimate = !calm && typeof spinEl.animate === 'function';
    let angle = 0;
    let busy = false;
    const turn = (keyframes, options) => {
      busy = true;
      coin.classList.add('is-turning');
      const end = () => { busy = false; coin.classList.remove('is-turning'); };
      spinEl.animate(keyframes, options).finished.then(end, end);
    };

    coin.addEventListener('click', () => {
      if (busy) return;
      angle += 180;
      coin.setAttribute('aria-pressed', String(angle % 360 !== 0));
      if (canAnimate) turn([{ transform: `rotateY(${angle - 180}deg)` }, { transform: `rotateY(${angle}deg)` }], { duration: 1100, easing: 'cubic-bezier(.3, 1.3, .45, 1)' });
      spinEl.style.transform = `rotateY(${angle}deg)`;
    });

    if (canAnimate && 'IntersectionObserver' in window) {
      // the first time it comes into view, the gold coin spins in and lands on his face
      spinEl.classList.add('is-pre');
      const once = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        once.disconnect();
        spinEl.classList.remove('is-pre');
        const ease = { duration: 2600, easing: 'cubic-bezier(.16, 1, .3, 1)' };
        turn([{ transform: 'rotateY(-900deg) scale(.72)' }, { transform: 'rotateY(0deg) scale(1)' }], ease);
        if (shadow) shadow.animate([{ transform: 'scaleX(.55)', opacity: 0.3 }, { transform: 'none', opacity: 1 }], ease);
        setTimeout(() => stage.classList.add('is-struck'), 1500);
      }, { threshold: 0.45 });
      once.observe(coin);

      seedMotes($('.persona__dust', persona), 36);
      pauseOffscreen($('.persona__dust', persona), persona);
    }

    // with a mouse, the coin leans toward the pointer (the loop stops as soon as it settles)
    if (!calm && window.matchMedia('(pointer: fine)').matches) {
      let tx = 0;
      let ty = 0;
      let rx = 0;
      let ry = 0;
      let raf = 0;
      const step = () => {
        raf = 0;
        rx += (tx - rx) * 0.1;
        ry += (ty - ry) * 0.1;
        hoverEl.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        if (Math.abs(tx - rx) > 0.05 || Math.abs(ty - ry) > 0.05) raf = requestAnimationFrame(step);
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
      stage.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = coin.getBoundingClientRect();
        ty = ((e.clientX - r.left) / r.width - 0.5) * 24;
        tx = -((e.clientY - r.top) / r.height - 0.5) * 18;
        kick();
      });
      stage.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    }
  }

  /* ---------- reels from the showroom's Facebook page ----------
     Facebook's own player is loaded inside each card before anyone taps, so a single tap lands on it
     and the reel plays right there with sound. Our design sits on top with pointer-events: none. */
  const reelsSection = $('#reels');
  const reelsList = $('#reels-list');
  const reels = (window.AB_REELS || []).filter((r) => r && /^\d+$/.test(String(r.id)));
  if (reelsSection && reelsList && reels.length) {
    const reelUrl = (id) => `https://www.facebook.com/reel/${id}/`;
    reelsList.innerHTML = reels.map((r) => `
      <article class="reel reveal" data-reel="${esc(r.id)}" aria-label="${esc(r.title || 'ريل من صفحة المعرض')}">
        <div class="reel__player"><div class="fb-video" id="fbv-${esc(r.id)}" data-href="${reelUrl(esc(r.id))}" data-show-text="false" data-allowfullscreen="true"></div></div>
        <img class="reel__poster" src="assets/reels/${esc(r.id)}.webp" alt="" loading="lazy" decoding="async">
        <div class="reel__ui" aria-hidden="true">
          <span class="reel__shade"></span>
          <span class="reel__play"><svg class="icon"><use href="#i-play"/></svg></span>
          <span class="reel__body">
            ${r.title ? `<strong>${esc(r.title)}</strong>` : ''}
            <span class="reel__meta">
              ${r.views ? `<span class="reel__views"><svg class="icon"><use href="#i-eye"/></svg>${esc(r.views)} مشاهدة</span>` : '<span></span>'}
              ${r.time ? `<span class="reel__time latin" dir="ltr">${esc(r.time)}</span>` : ''}
            </span>
          </span>
        </div>
        <a class="reel__link" href="${reelUrl(esc(r.id))}" target="_blank" rel="noopener" aria-label="شوف «${esc(r.title || 'الريل')}» على فيسبوك"></a>
      </article>`).join('');

    // stagger the entrance only; hover stays instant afterwards
    $$('.reel', reelsList).forEach((card, i) => {
      card.style.transitionDelay = `${Math.min(i, 4) * 70}ms`;
      card.addEventListener('transitionend', () => { card.style.transitionDelay = ''; }, { once: true });
    });

    const arrows = $('.reels__arrows');
    const [prevBtn, nextBtn] = $$('[data-rail]', arrows);
    const syncArrows = () => {
      const max = reelsList.scrollWidth - reelsList.clientWidth;
      const pos = Math.abs(reelsList.scrollLeft);
      arrows.hidden = max < 8;
      prevBtn.disabled = pos < 4;
      nextBtn.disabled = pos > max - 4;
    };
    arrows.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-rail]');
      if (!btn) return;
      // RTL: "next" scrolls toward the left
      reelsList.scrollBy({ left: -Number(btn.dataset.rail) * reelsList.clientWidth * 0.8, behavior: calm ? 'auto' : 'smooth' });
    });
    reelsList.addEventListener('scroll', () => requestAnimationFrame(syncArrows), { passive: true });
    window.addEventListener('resize', syncArrows);
    syncArrows();

    const players = new Map();
    const cardOf = (id) => reelsList.querySelector(`[data-reel="${id}"]`);
    const fallback = () => reelsSection.classList.add('is-fallback');
    const pauseOthers = (id) => players.forEach((p, other) => { if (other !== id) { try { p.pause(); } catch (e) {} } });

    const loadFacebook = () => new Promise((resolve, reject) => {
      if (window.FB && window.FB.XFBML) { resolve(window.FB); return; }
      window.fbAsyncInit = () => { window.FB.init({ xfbml: false, version: 'v21.0' }); resolve(window.FB); };
      const s = document.createElement('script');
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.src = 'https://connect.facebook.net/ar_AR/sdk.js';
      s.onerror = reject;
      document.body.appendChild(s);
    });

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      // each player is drawn at its card's real width
      $$('.fb-video', reelsList).forEach((el) => { el.dataset.width = String(Math.round(el.closest('.reel').getBoundingClientRect().width)); });
      const giveUp = setTimeout(fallback, 15000);
      loadFacebook().then((FB) => {
        FB.Event.subscribe('xfbml.ready', (msg) => {
          if (msg.type !== 'video' || !String(msg.id).startsWith('fbv-')) return;
          const id = String(msg.id).slice(4);
          const card = cardOf(id);
          if (!card) return;
          clearTimeout(giveUp);
          const player = msg.instance;
          players.set(id, player);
          card.classList.add('is-ready');
          player.subscribe('startedPlaying', () => {
            pauseOthers(id);
            card.classList.remove('is-waiting', 'is-paused');
            card.classList.add('is-active');
          });
          // paused (by the viewer, or because another reel started): only our play button comes back,
          // leaving Facebook's progress bar visible; when it ends, the whole card design returns
          player.subscribe('paused', () => { card.classList.remove('is-active'); card.classList.add('is-paused'); });
          player.subscribe('finishedPlaying', () => card.classList.remove('is-active', 'is-paused'));
          if (card.classList.contains('is-waiting')) player.play();
        });
        FB.XFBML.parse(reelsList);
      }).catch(() => { clearTimeout(giveUp); fallback(); });
    };

    // a tap that arrives before Facebook's player is ready: play it as soon as it is
    reelsList.addEventListener('click', (e) => {
      const card = e.target.closest('.reel');
      if (!card || card.classList.contains('is-ready') || reelsSection.classList.contains('is-fallback')) return;
      card.classList.add('is-waiting');
      start();
    });

    if ('IntersectionObserver' in window) {
      // load the players a little before the section scrolls in, and pause them when it leaves
      new IntersectionObserver(([entry]) => { if (entry.isIntersecting) start(); }, { rootMargin: '450px 0px' }).observe(reelsSection);
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) players.forEach((p) => { try { p.pause(); } catch (e) {} });
      }).observe(reelsSection);
    } else {
      start();
    }
  }

  /* ---------- "request a car" form → WhatsApp ---------- */
  const form = $('#request-form');
  if (form) {
    const model = form.elements.model;
    const error = $('#rq-error');
    model.addEventListener('input', () => { model.removeAttribute('aria-invalid'); error.hidden = true; });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (name) => form.elements[name].value.trim();
      if (!val('model')) {
        model.setAttribute('aria-invalid', 'true');
        error.hidden = false;
        model.focus();
        return;
      }
      const lines = ['السلام عليكم، بدوّر على عربية:', `• الماركة والموديل: ${val('model')}`];
      if (val('year')) lines.push(`• السنة: ${val('year')}`);
      if (val('budget')) lines.push(`• الميزانية التقريبية: ${val('budget')}`);
      if (val('notes')) lines.push(`• تفاصيل: ${val('notes')}`);
      lines.push('(من موقع عاطف بدر)');
      const url = waLink(lines.join('\n'));
      const tab = window.open(url, '_blank');
      if (tab) tab.opener = null;
      else window.location.href = url;
    });
  }

  /* ---------- header, mobile menu, quick-contact dock ---------- */
  const header = $('.site-header');
  const dock = $('.dock');
  const hero = $('.hero');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 16);
    if (dock) dock.classList.toggle('is-visible', y > (hero ? hero.offsetHeight * 0.6 : 480));
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  const toggle = $('.menu-toggle');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    html.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('a', menu).focus();
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1081px)').addEventListener('change', (m) => { if (m.matches && !menu.hidden) setMenu(false); });
  }

  /* ---------- where am I: highlight the current section in the nav ---------- */
  if ('IntersectionObserver' in window) {
    const links = new Map($$('.site-nav a[href^="#"]').map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = links.get(entry.target.id);
        if (!link || !entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
    const top = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) links.forEach((a) => a.removeAttribute('aria-current'));
    }, { rootMargin: '-45% 0px -50% 0px' });
    if (hero) top.observe(hero);
  }

  /* ---------- hero: parallax with the mouse and the scroll, gold dust while it is on screen ---------- */
  const visual = $('.hero__visual');
  const heroInner = $('.hero__inner');
  if (hero && visual && heroInner && !calm) {
    const wide = window.matchMedia('(min-width: 901px)');
    const mouse = window.matchMedia('(pointer: fine)').matches;
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let raf = 0;
    const frame = () => {
      raf = 0;
      if (!wide.matches) {
        visual.style.transform = '';
        heroInner.style.transform = '';
        heroInner.style.opacity = '';
        return;
      }
      mx += (tx - mx) * 0.07;
      my += (ty - my) * 0.07;
      const y = Math.min(window.scrollY, hero.offsetHeight);
      visual.style.transform = `translate3d(${(mx * -20).toFixed(2)}px, ${(my * -14 + y * 0.22).toFixed(2)}px, 0)`;
      heroInner.style.transform = `translate3d(${(mx * 8).toFixed(2)}px, ${(my * 6 + y * 0.1).toFixed(2)}px, 0)`;
      heroInner.style.opacity = String(1 - Math.min(y / (hero.offsetHeight * 0.85), 1) * 0.75);
      if (Math.abs(tx - mx) > 0.002 || Math.abs(ty - my) > 0.002) kick();
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    if (mouse) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
        kick();
      });
      hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    }
    window.addEventListener('scroll', kick, { passive: true });
    wide.addEventListener('change', kick);

    seedMotes($('.hero__dust'), 40);
    pauseOffscreen($('.hero__dust'), hero);
  }

  /* ---------- numbers count up the first time they are seen ---------- */
  const countUp = (el) => {
    const target = Number(el.dataset.countup);
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min((t - t0) / 1600, 1);
      el.textContent = `+${Math.round(target * (1 - Math.pow(1 - k, 3)))}`;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!calm && 'IntersectionObserver' in window) {
    $$('[data-countup]').forEach((el) => {
      const watch = () => {
        const io = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          countUp(el);
        }, { threshold: 0.6 });
        io.observe(el);
      };
      if (html.classList.contains('intro-on')) document.addEventListener('ab:intro-done', watch, { once: true });
      else watch();
    });
  }

  /* ---------- the three steps light up as you read down ---------- */
  const stepsWrap = $('.steps-wrap');
  if (stepsWrap && !calm) {
    const items = $$('.steps li', stepsWrap);
    const progress = $('.steps__progress', stepsWrap);
    let pending = false;
    const update = () => {
      pending = false;
      const line = window.innerHeight * 0.62;
      const r = stepsWrap.getBoundingClientRect();
      progress.style.setProperty('--p', Math.min(Math.max((line - r.top) / r.height, 0), 1).toFixed(3));
      items.forEach((li) => li.classList.toggle('is-active', li.getBoundingClientRect().top < line));
    };
    window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- section titles rise word by word (words stay whole, so Arabic letters keep joining) ---------- */
  const splitWords = (el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const outer = document.createElement('span');
            const inner = document.createElement('span');
            outer.className = 'w';
            inner.textContent = part;
            inner.style.setProperty('--i', String(i++));
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.add('split');
  };
  if (!calm) $$('.reveal h2').forEach(splitWords);

  /* ---------- scroll reveal ---------- */
  if (!calm && 'IntersectionObserver' in window) {
    html.classList.add('motion');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach((el) => io.observe(el));
  }

  const year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
