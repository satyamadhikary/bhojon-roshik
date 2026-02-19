(function () {
  var body = document.body;
  var header = document.getElementById('siteHeader');
  function setHeaderState() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
  }

  function initHeroSlider() {
    var slider = document.getElementById('heroSlider');
    var dotsWrap = document.getElementById('sliderDots');
    if (!slider || !dotsWrap) return;

    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide-card'));
    if (!slides.length) return;

    dotsWrap.innerHTML = '';
    slides.forEach(function (_, index) {
      var dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';
      dot.setAttribute('data-dot', String(index));
      dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
      dotsWrap.appendChild(dot);
    });

    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('.dot'));

    var current = 0;
    var timer = null;

    function render(index) {
      current = index;
      slides.forEach(function (slide, i) {
        slide.classList.remove('is-active', 'is-prev');
        if (i === current) slide.classList.add('is-active');
        else if (i === (current - 1 + slides.length) % slides.length) slide.classList.add('is-prev');
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-pressed', String(i === current));
      });
    }

    function next() {
      render((current + 1) % slides.length);
    }

    function start() {
      stop();
      timer = window.setInterval(next, 5000);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        render(i);
        start();
      });
    });

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);

    render(0);
    start();
  }

  function initFaqBot() {
    var faqBot = document.getElementById('faqBot');
    var faqToggle = document.getElementById('faqBotToggle');
    var faqPanel = document.getElementById('faqBotPanel');
    var faqClose = document.getElementById('faqBotClose');
    var faqList = document.getElementById('faqQuickList');
    var faqResponse = document.getElementById('faqBotResponse');
    var faqForm = document.getElementById('faqBotForm');
    var faqInput = document.getElementById('faqBotInput');
    var suggestions = document.getElementById('faqSuggestions');

    if (!faqBot || !faqToggle || !faqPanel || !faqResponse) return;

    var faqData = {
      hours: 'We are open every day from 11:30 AM to 11:00 PM.',
      veg: 'Yes. We serve multiple vegetarian Bengali dishes and seasonal specials.',
      reservation: 'Call +91 98300 24888 for table reservations and group bookings.',
      catering: 'We provide catering for weddings, family events, and corporate occasions.',
      recipes: 'Our menu follows traditional Bengali cooking with mustard oil, panch phoron, and slow-cooking methods.',
      parking: 'Parking availability depends on outlet location. Please call before visiting for current guidance.',
      locations: 'Check the Outlets page for full address and map directions.'
    };

    var keywords = {
      hours: ['hour', 'open', 'close', 'time'],
      veg: ['veg', 'vegetarian', 'paneer', 'plant'],
      reservation: ['reservation', 'book', 'table', 'booking'],
      catering: ['catering', 'event', 'wedding', 'party', 'corporate'],
      recipes: ['recipe', 'traditional', 'mustard', 'authentic'],
      parking: ['parking', 'car', 'vehicle'],
      locations: ['location', 'outlet', 'address', 'map']
    };

    function setOpen(open) {
      faqBot.classList.toggle('is-open', open);
      faqPanel.setAttribute('aria-hidden', String(!open));
      faqToggle.setAttribute('aria-expanded', String(open));
      if (open && faqInput) faqInput.focus();
    }

    function respondByKey(key) {
      if (!faqData[key]) return;
      faqResponse.textContent = faqData[key];
      renderSuggestions(key);
    }

    function findMatch(text) {
      var query = (text || '').toLowerCase();
      var keys = Object.keys(keywords);

      for (var i = 0; i < keys.length; i += 1) {
        var key = keys[i];
        var words = keywords[key];
        for (var j = 0; j < words.length; j += 1) {
          if (query.indexOf(words[j]) !== -1) return key;
        }
      }
      return null;
    }

    function renderSuggestions(current) {
      if (!suggestions) return;

      suggestions.innerHTML = '';
      Object.keys(faqData)
        .filter(function (key) {
          return key !== current;
        })
        .slice(0, 3)
        .forEach(function (key) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = key.charAt(0).toUpperCase() + key.slice(1);
          btn.addEventListener('click', function () {
            respondByKey(key);
          });
          suggestions.appendChild(btn);
        });
    }

    faqToggle.addEventListener('click', function () {
      setOpen(!faqBot.classList.contains('is-open'));
    });

    if (faqClose) {
      faqClose.addEventListener('click', function () {
        setOpen(false);
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && faqBot.classList.contains('is-open')) {
        setOpen(false);
      }
    });

    if (faqList) {
      faqList.querySelectorAll('button[data-faq-key]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          respondByKey(btn.getAttribute('data-faq-key'));
          setOpen(true);
        });
      });
    }

    if (faqForm && faqInput) {
      faqForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var text = faqInput.value.trim();
        if (!text) return;

        var match = findMatch(text);
        if (match) {
          respondByKey(match);
        } else {
          faqResponse.textContent =
            'Thanks for your question. Please call +91 98300 24888 or use Contact page for detailed support.';
          renderSuggestions(null);
        }

        faqInput.value = '';
        setOpen(true);
      });
    }

    renderSuggestions(null);
  }

  function initReviews() {
    var track = document.getElementById('reviewsTrack');
    if (!track) return;

    var cards = Array.prototype.slice.call(track.querySelectorAll('.review-card'));
    var toggles = Array.prototype.slice.call(track.querySelectorAll('.review-toggle'));
    var navButtons = Array.prototype.slice.call(document.querySelectorAll('[data-reviews-nav]'));
    var autoTimer = null;
    var isPaused = false;

    function setExpanded(card, expanded) {
      card.classList.toggle('is-expanded', expanded);
      var btn = card.querySelector('.review-toggle');
      if (btn) btn.textContent = expanded ? 'Show less' : 'Read more';
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.stopPropagation();
        var card = btn.closest('.review-card');
        if (!card) return;
        setExpanded(card, !card.classList.contains('is-expanded'));
      });
    });

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        setExpanded(card, !card.classList.contains('is-expanded'));
      });
    });

    function getGap() {
      var styles = window.getComputedStyle(track);
      var gapValue = parseFloat(styles.columnGap || styles.gap || '0');
      return isNaN(gapValue) ? 0 : gapValue;
    }

    function getStep() {
      if (!cards.length) return track.clientWidth * 0.9;
      return cards[0].getBoundingClientRect().width + getGap();
    }

    function scrollByStep(direction) {
      var step = getStep();
      track.scrollBy({ left: step * direction, behavior: 'smooth' });
    }

    function startAuto() {
      stopAuto();
      autoTimer = window.setInterval(function () {
        if (isPaused) return;
        var maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 2) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollByStep(1);
        }
      }, 5200);
    }

    function stopAuto() {
      if (autoTimer) {
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    navButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var direction = btn.getAttribute('data-reviews-nav') === 'next' ? 1 : -1;
        scrollByStep(direction);
      });
    });

    track.addEventListener('mouseenter', function () {
      isPaused = true;
    });

    track.addEventListener('mouseleave', function () {
      isPaused = false;
    });

    track.addEventListener('touchstart', function () {
      isPaused = true;
    }, { passive: true });

    track.addEventListener('touchend', function () {
      isPaused = false;
    });

    startAuto();
  }

  initHeroSlider();
  initFaqBot();
  initReviews();

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
})();
