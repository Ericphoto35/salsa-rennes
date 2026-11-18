/* ==========================================================================
   QUÉ RICO MAMBO — RENNES | MOTION DESIGN & INTERACTIVE UX ENGINE
   ========================================================================== */

const WEB3FORMS_ACCESS_KEY = '05382d22-d210-4752-874d-08cc2c041940';

const sendToInbox = async (fields) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      botcheck: '',
      ...fields,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Envoi impossible');
  }
  return data;
};

const showFormStatus = (el, text, isError) => {
  el.textContent = text;
  el.style.display = 'block';
  el.style.borderColor = isError ? '#e07a7a' : '';
  el.style.color = isError ? '#ffd0d0' : '';
};

const boot = () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const siteHeader = document.getElementById('siteHeader');
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  const menuToggle = document.getElementById('menuToggle');
  const navLinksContainer = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');

  const setMenu = (open) => {
    if (!menuToggle || !navLinksContainer) return;
    navLinksContainer.classList.toggle('is-open', open);
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('nav-open', open);
  };

  /* --------------------------------------------------------------------------
     1. SCROLL PROGRESS, STICKY HEADER & ACTIVE SECTION SPY
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = `${pct}%`;
    }

    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', scrollTop > 40);
    }

    const floatingWa = document.querySelector('.floating-wa');
    if (floatingWa) {
      floatingWa.classList.toggle('is-away', scrollTop < 520);
    }

    let currentSectionId = 'accueil';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (scrollTop >= top) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      const active = href === `#${currentSectionId}`;
      link.classList.toggle('active', active);
      if (link.getAttribute('role') === 'tab') return;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --------------------------------------------------------------------------
     2. MOBILE MENU DRAWER
     -------------------------------------------------------------------------- */
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      setMenu(!navLinksContainer.classList.contains('is-open'));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('click', (event) => {
      if (!navLinksContainer.classList.contains('is-open')) return;
      if (navLinksContainer.contains(event.target) || menuToggle.contains(event.target)) return;
      setMenu(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1180) setMenu(false);
    });
  }

  /* --------------------------------------------------------------------------
     3. AMBIENT CURSOR SPOTLIGHT & 3D TILT MOTION
     -------------------------------------------------------------------------- */
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cursorSpotlight && finePointer && !reduceMotion) {
    window.addEventListener('mousemove', (e) => {
      cursorSpotlight.style.left = `${e.clientX}px`;
      cursorSpotlight.style.top = `${e.clientY}px`;
    }, { passive: true });
  } else if (cursorSpotlight) {
    cursorSpotlight.style.display = 'none';
  }

  const heroTiltCard = document.getElementById('heroTiltCard');
  if (heroTiltCard && finePointer && !reduceMotion) {
    heroTiltCard.addEventListener('mousemove', (e) => {
      const rect = heroTiltCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroTiltCard.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
    });
    heroTiltCard.addEventListener('mouseleave', () => {
      heroTiltCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* --------------------------------------------------------------------------
     4. INTERSECTION OBSERVER — SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const showReveal = (el) => el.classList.add('is-visible');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(showReveal);
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showReveal(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => {
      if (el.classList.contains('is-visible')) return;
      revealObserver.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     5. INTERACTIVE MAMBO ON2 RHYTHM STEPPER (1-2-3 • 5-6-7)
     -------------------------------------------------------------------------- */
  const mamboSteps = document.querySelectorAll('#mamboSteps .mambo-step');
  const claveToggle = document.getElementById('claveToggle');
  const beatSequence = [0, 1, 2, null, 3, 4, 5, null];
  let currentBeatIdx = 0;
  let isRhythmRunning = !reduceMotion;

  if (claveToggle) {
    claveToggle.setAttribute('aria-pressed', isRhythmRunning ? 'true' : 'false');
    claveToggle.classList.toggle('is-paused', !isRhythmRunning);
  }

  window.setInterval(() => {
    if (!isRhythmRunning || !mamboSteps.length) return;
    mamboSteps.forEach((step) => step.classList.remove('is-active'));
    const activeStepIdx = beatSequence[currentBeatIdx];
    if (activeStepIdx !== null && mamboSteps[activeStepIdx]) {
      mamboSteps[activeStepIdx].classList.add('is-active');
    }
    currentBeatIdx = (currentBeatIdx + 1) % beatSequence.length;
  }, 460);

  if (claveToggle) {
    claveToggle.addEventListener('click', () => {
      isRhythmRunning = !isRhythmRunning;
      claveToggle.classList.toggle('is-paused', !isRhythmRunning);
      claveToggle.setAttribute('aria-pressed', isRhythmRunning ? 'true' : 'false');
    });
  }

  /* --------------------------------------------------------------------------
     6. COURSES FILTER TABS (LES DIFFÉRENTS COURS)
     -------------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.level-tab');
  const courseCards = document.querySelectorAll('#coursesGrid .course-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((other) => {
        other.classList.remove('is-active');
        other.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      courseCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
        if (show) card.classList.add('is-visible');
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. PRICING SOLO / COUPLE SWITCHER
     -------------------------------------------------------------------------- */
  const pricingBtns = document.querySelectorAll('[data-pricing-mode]');
  const priceAmounts = document.querySelectorAll('[data-price-solo]');
  const pricePeriods = document.querySelectorAll('[data-period-solo]');

  pricingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pricingBtns.forEach((other) => {
        other.classList.remove('is-active');
        other.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const mode = btn.getAttribute('data-pricing-mode');
      priceAmounts.forEach((el) => {
        const nextValue = mode === 'couple'
          ? el.getAttribute('data-price-couple')
          : el.getAttribute('data-price-solo');
        if (!reduceMotion) {
          el.style.transform = 'scale(0.9)';
          el.style.opacity = '0.4';
        }
        window.setTimeout(() => {
          el.textContent = nextValue;
          el.style.transform = '';
          el.style.opacity = '';
        }, reduceMotion ? 0 : 140);
      });

      pricePeriods.forEach((el) => {
        el.textContent = mode === 'couple'
          ? el.getAttribute('data-period-couple')
          : el.getAttribute('data-period-solo');
      });
    });
  });

  /* --------------------------------------------------------------------------
     8. SMOOTH FAQ ACCORDION
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  const setFaqOpen = (item, open) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    item.classList.toggle('is-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (answer) answer.style.maxHeight = open ? `${answer.scrollHeight + 24}px` : '0px';
  };

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    setFaqOpen(item, item.classList.contains('is-open'));

    btn.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      faqItems.forEach((other) => setFaqOpen(other, false));
      if (willOpen) setFaqOpen(item, true);
    });
  });

  const remeasureOpenFaqs = () => {
    faqItems.forEach((item) => {
      if (!item.classList.contains('is-open')) return;
      const answer = item.querySelector('.faq-answer');
      if (answer) answer.style.maxHeight = `${answer.scrollHeight + 24}px`;
    });
  };

  window.addEventListener('resize', remeasureOpenFaqs);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(remeasureOpenFaqs).catch(() => {});
  }

  /* --------------------------------------------------------------------------
     9. MODALS: INSCRIPTION, YOUTUBE VIDEO, LEVEL QUIZ & PLANNING LIGHTBOX
     -------------------------------------------------------------------------- */
  const videoContainer = document.getElementById('videoContainer');
  const regCourseSelect = document.getElementById('regCourse');
  let lastFocus = null;

  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const selectCourse = (label) => {
    if (!label || !regCourseSelect) return;
    const normalize = (value) => value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const needle = normalize(label);
    const options = Array.from(regCourseSelect.options);
    const match = options.find((opt) => normalize(opt.value) === needle)
      || options.find((opt) => {
        const value = normalize(opt.value);
        return needle.includes(value) || value.includes(needle);
      });
    if (match) {
      regCourseSelect.value = match.value;
      return;
    }
    const created = options.find((opt) => opt.value === label) || new Option(label, label);
    if (!created.parentElement) regCourseSelect.add(created);
    regCourseSelect.value = label;
  };

  const openModal = (modalId, coursePreselect) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    setMenu(false);
    selectCourse(coursePreselect);

    if (modalId === 'videoModal' && videoContainer) {
      videoContainer.replaceChildren();
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/MsAAtc09k4E?autoplay=1&rel=0&playsinline=1';
      frame.title = 'Qué Rico MAMBO — Salsa Rennes';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      videoContainer.appendChild(frame);
    }

    lastFocus = document.activeElement;
    modal.inert = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const dialog = modal.querySelector('[role="dialog"]') || modal;
    const closeBtn = modal.querySelector('.modal-close');
    (closeBtn || dialog).focus();
  };

  const closeAllModals = () => {
    document.querySelectorAll('.modal-backdrop.is-open').forEach((modal) => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      modal.inert = true;
    });
    if (videoContainer) videoContainer.replaceChildren();
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  };

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(trigger.getAttribute('data-open-modal'), trigger.getAttribute('data-course-select'));
    });
  });

  const openPlanningLightbox = document.getElementById('openPlanningLightbox');
  if (openPlanningLightbox) {
    openPlanningLightbox.addEventListener('click', () => {
      const img = document.querySelector('#planningModal img');
      if (img && img.dataset.src && !img.getAttribute('src')) {
        img.src = img.dataset.src;
      }
      openModal('planningModal');
    });
  }

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navLinksContainer && navLinksContainer.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
        return;
      }
      closeAllModals();
      return;
    }

    if (e.key !== 'Tab') return;
    const modal = document.querySelector('.modal-backdrop.is-open');
    if (!modal) return;
    const focusable = Array.from(modal.querySelectorAll(focusableSelector))
      .filter((el) => el.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* --------------------------------------------------------------------------
     10. INTERACTIVE LEVEL QUIZ LOGIC
     -------------------------------------------------------------------------- */
  const quizBody = document.getElementById('quizBody');
  const quizTemplate = quizBody ? quizBody.innerHTML : '';

  const bindQuiz = () => {
    if (!quizBody) return;
    quizBody.querySelectorAll('.quiz-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const course = opt.getAttribute('data-quiz-result') || '';
        const desc = opt.getAttribute('data-quiz-desc') || '';
        quizBody.replaceChildren();

        const result = document.createElement('div');
        result.className = 'quiz-result';

        const kicker = document.createElement('span');
        kicker.className = 'quiz-result__kicker';
        kicker.textContent = 'Notre recommandation pour vous';

        const title = document.createElement('h4');
        title.className = 'quiz-result__title';
        title.textContent = course;

        const text = document.createElement('p');
        text.className = 'quiz-result__text';
        text.textContent = desc;

        const actions = document.createElement('div');
        actions.className = 'quiz-result__actions';

        const proceedBtn = document.createElement('button');
        proceedBtn.type = 'button';
        proceedBtn.className = 'btn btn--gold';
        proceedBtn.textContent = `M'inscrire en ${course}`;
        proceedBtn.addEventListener('click', () => {
          closeAllModals();
          openModal('inscriptionModal', course);
        });

        const restartBtn = document.createElement('button');
        restartBtn.type = 'button';
        restartBtn.className = 'btn btn--outline';
        restartBtn.textContent = 'Recommencer';
        restartBtn.addEventListener('click', () => {
          quizBody.innerHTML = quizTemplate;
          bindQuiz();
        });

        actions.append(proceedBtn, restartBtn);
        result.append(kicker, title, text, actions);
        quizBody.appendChild(result);
        proceedBtn.focus();
      });
    });
  };

  bindQuiz();

  /* --------------------------------------------------------------------------
     11. REGISTRATION & NEWSLETTER FORM SUBMISSIONS
     -------------------------------------------------------------------------- */
  const registrationForm = document.getElementById('registrationForm');
  const regSuccessMsg = document.getElementById('regSuccessMsg');

  if (registrationForm && regSuccessMsg) {
    const submitButton = registrationForm.querySelector('button[type="submit"]');
    const submitLabel = submitButton ? submitButton.textContent : '';

    registrationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (registrationForm.querySelector('[name="botcheck"]')?.checked) return;

      const name = document.getElementById('regName')?.value.trim() || '';
      const phone = document.getElementById('regPhone')?.value.trim() || '';
      const email = document.getElementById('regEmail')?.value.trim() || '';
      const courseSelect = document.getElementById('regCourse');
      const course = courseSelect?.selectedOptions?.[0]?.textContent.trim() || courseSelect?.value || '';
      const role = document.getElementById('regRole')?.value || '';
      const message = document.getElementById('regMessage')?.value.trim() || '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours…';
      }

      try {
        await sendToInbox({
          subject: `Inscription — ${course}`,
          from_name: name,
          name,
          email,
          phone,
          cours: course,
          role,
          message: message || 'Aucun message',
        });
        registrationForm.reset();
        showFormStatus(
          regSuccessMsg,
          `Merci ${name}. Ta demande pour « ${course} » est bien partie. Éric et Clémentine te recontactent à ${email} ou au ${phone}.`,
          false
        );
      } catch (error) {
        showFormStatus(
          regSuccessMsg,
          'L’envoi n’a pas abouti. Réessaie dans un instant, ou écris-nous sur WhatsApp au 07 61 46 18 92.',
          true
        );
        console.error(error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = submitLabel;
        }
      }
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterFeedback = document.getElementById('newsletterFeedback');
  if (newsletterForm && newsletterFeedback) {
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const submitLabel = submitButton ? submitButton.textContent : '';

    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (newsletterForm.querySelector('[name="botcheck"]')?.checked) return;

      const email = newsletterForm.querySelector('input[type="email"]')?.value.trim() || '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi…';
      }

      try {
        await sendToInbox({
          subject: 'Alerte soirées et inscriptions',
          from_name: 'Site Qué Rico MAMBO',
          name: 'Alerte site',
          email,
          message: 'Souhaite recevoir les dates des soirées, des stages et l’ouverture des inscriptions.',
        });
        newsletterForm.reset();
        showFormStatus(
          newsletterFeedback,
          `C’est noté. La demande pour ${email} est bien partie.`,
          false
        );
      } catch (error) {
        showFormStatus(
          newsletterFeedback,
          'L’inscription n’a pas abouti. Réessaie dans un instant.',
          true
        );
        console.error(error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = submitLabel;
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  try {
    boot();
  } catch (error) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    console.error(error);
  }
});
