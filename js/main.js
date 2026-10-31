(function () {
  "use strict";

  const C = window.CONTENT;
  const $ = (id) => document.getElementById(id);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PASTELS = ["#ffc8dd", "#bde0fe", "#cdb4db", "#c8ead9", "#ffd8be", "#fff1b8"];
  const HEART_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>';

  /* ---------- Floating hearts ---------- */

  const heartsLayer = $("floating-hearts");
  function spawnHeart() {
    if (document.hidden || reduceMotion) return;
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.innerHTML = HEART_SVG;
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.width = 14 + Math.random() * 22 + "px";
    heart.style.color = pick(PASTELS);
    heart.style.animationDuration = 7 + Math.random() * 6 + "s";
    heart.style.setProperty("--drift", (Math.random() - 0.5) * 140 + "px");
    heart.style.setProperty("--rot", (Math.random() - 0.5) * 80 + "deg");
    heart.addEventListener("animationend", () => heart.remove());
    heartsLayer.appendChild(heart);
  }

  function heartShower(count) {
    for (let i = 0; i < count; i++) setTimeout(spawnHeart, i * 60);
  }

  setInterval(spawnHeart, 900);

  /* ---------- Confetti ---------- */

  const Confetti = (function () {
    const canvas = $("confetti");
    const ctx = canvas.getContext("2d");
    const COLOURS = ["#f6a8c7", "#9fcaf2", "#b9a3dd", "#9fd8bf", "#ffc49b", "#ffe28a", "#ffffff"];
    let particles = [];
    let running = false;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawHeart(size) {
      const s = size;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
      ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
      ctx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
      ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
      ctx.fill();
    }

    function makeParticle(x, y, vx, vy) {
      return {
        x, y, vx, vy,
        size: 8 + Math.random() * 10,
        colour: pick(COLOURS),
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        heart: Math.random() < 0.4,
      };
    }

    function loop() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles = particles.filter((p) => p.y < window.innerHeight + 40);
      for (const p of particles) {
        p.vy += 0.22;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.colour;
        if (p.heart) {
          ctx.translate(0, -p.size / 2);
          drawHeart(p.size * 1.3);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }
      if (particles.length) {
        requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }

    function start() {
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    }

    // A burst from the middle of the screen.
    function burst(count) {
      const total = reduceMotion ? Math.round(count / 4) : count;
      for (let i = 0; i < total; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 10;
        particles.push(makeParticle(
          window.innerWidth / 2,
          window.innerHeight * 0.4,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 6
        ));
      }
      start();
    }

    // Confetti falling from the top for a few seconds.
    function rain(seconds) {
      if (reduceMotion) return;
      const end = Date.now() + seconds * 1000;
      (function drop() {
        for (let i = 0; i < 4; i++) {
          particles.push(makeParticle(
            Math.random() * window.innerWidth, -20,
            (Math.random() - 0.5) * 3, Math.random() * 2
          ));
        }
        start();
        if (Date.now() < end) setTimeout(drop, 50);
      })();
    }

    resize();
    window.addEventListener("resize", resize);
    return { burst, rain };
  })();

  /* ---------- Quiz ---------- */

  const quizEl = $("quiz");
  const quizCard = $("quiz-card");
  const form = $("quiz-form");
  const input = $("quiz-answer");
  const questionEl = $("quiz-question");
  const feedback = $("quiz-feedback");
  const progress = $("quiz-progress");
  const questions = C.quiz.questions;
  let questionIndex = 0;
  let wrongCount = 0;
  let busy = false;

  // Lowercase and strip spaces, punctuation and accents so "Frozen Yoghurt!" matches "frozen yoghurt".
  function normalise(text) {
    return text.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
  }

  function isCorrect(answer, accepted) {
    const given = normalise(answer);
    return accepted.some((option) => given.includes(normalise(option)));
  }

  function renderProgress() {
    progress.innerHTML = "";
    questions.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "progress-dot";
      if (i < questionIndex) dot.classList.add("done");
      if (i === questionIndex) dot.classList.add("current");
      progress.appendChild(dot);
    });
  }

  function restartAnimation(el, className) {
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }

  function showQuestion() {
    wrongCount = 0;
    questionEl.textContent = questions[questionIndex].question;
    input.value = "";
    feedback.textContent = "";
    feedback.classList.remove("good");
    renderProgress();
    restartAnimation(form, "enter");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (busy) return;

    const answer = input.value.trim();
    if (!answer) {
      feedback.classList.remove("good");
      feedback.textContent = "Type an answer first";
      return;
    }

    if (isCorrect(answer, questions[questionIndex].answers)) {
      busy = true;
      feedback.classList.add("good");
      feedback.textContent = pick(C.quiz.correctMessages);
      questionIndex++;
      renderProgress();
      setTimeout(() => {
        busy = false;
        if (questionIndex < questions.length) {
          showQuestion();
        } else {
          passQuiz();
        }
      }, 1000);
    } else {
      wrongCount++;
      const messages = C.quiz.wrongMessages;
      feedback.classList.remove("good");
      feedback.textContent = messages[Math.min(wrongCount, messages.length) - 1];
      restartAnimation(quizCard, "shake");
      input.select();
    }
  });

  function passQuiz() {
    input.blur();
    const celebration = $("celebration");
    celebration.hidden = false;
    Confetti.burst(180);
    heartShower(30);

    setTimeout(() => {
      quizEl.classList.add("leaving");
      celebration.classList.add("leaving");
    }, 2400);

    setTimeout(() => {
      quizEl.hidden = true;
      celebration.hidden = true;
      showSite();
    }, 3100);
  }

  /* ---------- Main site ---------- */

  function showSite() {
    $("site").hidden = false;
    window.scrollTo(0, 0);
    startSlideshow();
    startCounter();
    observeReveals();
  }

  function startSlideshow() {
    const container = $("slideshow");
    const slides = C.slideshow.images.map((src, i) => {
      const slide = document.createElement("div");
      slide.className = "slide" + (i === 0 ? " active" : "");
      slide.style.backgroundImage = 'url("' + src + '")';
      container.appendChild(slide);
      return slide;
    });
    if (slides.length < 2) return;

    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, C.slideshow.secondsPerSlide * 1000);
  }

  function startCounter() {
    const a = C.anniversary;
    const start = new Date(a.year, a.month - 1, a.day, a.hour, a.minute);
    const parts = {
      days: $("c-days"),
      hours: $("c-hours"),
      minutes: $("c-minutes"),
      seconds: $("c-seconds"),
    };

    $("hero-since").textContent = "since " + start.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

    function tick() {
      const total = Math.max(0, Math.floor((Date.now() - start) / 1000));
      parts.days.textContent = Math.floor(total / 86400);
      parts.hours.textContent = Math.floor((total % 86400) / 3600);
      parts.minutes.textContent = Math.floor((total % 3600) / 60);
      parts.seconds.textContent = total % 60;
    }
    tick();
    setInterval(tick, 1000);
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Letter ---------- */

  function renderLetter() {
    const letter = $("letter");
    const add = (tag, className, text) => {
      const el = document.createElement(tag);
      if (className) el.className = className;
      el.textContent = text;
      letter.appendChild(el);
    };
    add("p", "letter-greeting", C.letter.greeting);
    C.letter.paragraphs.forEach((text) => add("p", "", text));
    add("p", "letter-signoff", C.letter.signOff);
    add("p", "letter-signature", C.letter.signature);

    const envelope = $("envelope");
    const wrap = $("envelope-wrap");
    envelope.addEventListener("click", () => {
      if (envelope.classList.contains("open")) return;
      envelope.classList.add("open");
      setTimeout(() => wrap.classList.add("leaving"), 1300);
      setTimeout(() => {
        wrap.hidden = true;
        letter.hidden = false;
        heartShower(12);
      }, 1700);
    });
  }

  /* ---------- Timeline ---------- */

  function renderTimeline() {
    const list = $("timeline");
    C.timeline.forEach((item) => {
      const li = document.createElement("li");
      li.className = "timeline-item reveal";

      const dot = document.createElement("span");
      dot.className = "timeline-dot";
      dot.innerHTML = HEART_SVG;

      const card = document.createElement("div");
      card.className = "timeline-card";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.loading = "lazy";

      const body = document.createElement("div");
      body.className = "timeline-body";
      const date = document.createElement("p");
      date.className = "timeline-date";
      date.textContent = item.date;
      const title = document.createElement("h3");
      title.textContent = item.title;
      const text = document.createElement("p");
      text.textContent = item.text;
      body.append(date, title, text);

      card.append(img, body);
      li.append(dot, card);
      list.appendChild(li);
    });
  }

  /* ---------- Reasons deck ---------- */

  function setupReasons() {
    const card = $("reason-card");
    const number = $("reason-number");
    const text = $("reason-text");
    const count = $("reason-count");
    const reasons = C.reasons;
    let index = 0;
    let animating = false;

    function render() {
      number.textContent = "#" + (index + 1);
      text.textContent = reasons[index];
      card.style.setProperty("--card-colour", PASTELS[index % PASTELS.length]);
      count.textContent = (index + 1) + " of " + reasons.length + " · tap or swipe for the next one";
    }

    function next(direction) {
      if (animating) return;
      animating = true;
      card.style.transform = "translateX(" + direction * 120 + "%) rotate(" + direction * 18 + "deg)";
      card.style.opacity = "0";
      setTimeout(() => {
        index = (index + 1) % reasons.length;
        render();
        card.style.transition = "none";
        card.style.transform = "scale(0.85)";
        void card.offsetWidth;
        card.style.transition = "";
        card.style.transform = "";
        card.style.opacity = "";
        animating = false;
      }, 320);
    }

    // Drag to swipe; a short tap also moves to the next card.
    let startX = null;
    let dx = 0;

    card.addEventListener("pointerdown", (e) => {
      if (animating) return;
      startX = e.clientX;
      dx = 0;
      card.setPointerCapture(e.pointerId);
      card.style.transition = "none";
    });

    card.addEventListener("pointermove", (e) => {
      if (startX === null) return;
      dx = e.clientX - startX;
      card.style.transform = "translateX(" + dx + "px) rotate(" + dx / 14 + "deg)";
    });

    function release() {
      if (startX === null) return;
      startX = null;
      card.style.transition = "";
      if (Math.abs(dx) > 70) {
        next(dx > 0 ? 1 : -1);
      } else if (Math.abs(dx) < 8) {
        card.style.transform = "";
        next(1);
      } else {
        card.style.transform = "";
      }
    }

    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", () => {
      startX = null;
      card.style.transition = "";
      card.style.transform = "";
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next(1);
      }
    });

    render();
  }

  /* ---------- Final question ---------- */

  function setupFinalQuestion() {
    const F = C.finalQuestion;
    const section = $("final");
    const yesBtn = $("yes-btn");
    const noBtn = $("no-btn");
    const message = $("final-message");
    let dodges = 0;
    let lastDodge = 0;

    $("final-question").textContent = F.question;
    yesBtn.textContent = F.yes;
    noBtn.textContent = F.no;

    function dodge(event) {
      if (event) event.preventDefault();
      const now = Date.now();
      if (now - lastDodge < 250) return;
      lastDodge = now;

      // On the first dodge, lift the button out of the row so it can roam the section.
      if (!noBtn.classList.contains("runaway")) {
        const from = noBtn.getBoundingClientRect();
        const area = section.getBoundingClientRect();
        section.appendChild(noBtn);
        noBtn.classList.add("runaway");
        noBtn.style.left = from.left - area.left + "px";
        noBtn.style.top = from.top - area.top + "px";
        void noBtn.offsetWidth;
      }

      dodges++;
      message.textContent = F.noMessages[Math.min(dodges, F.noMessages.length) - 1];
      restartAnimation(message, "pop-in");
      yesBtn.style.fontSize = Math.min(1 + dodges * 0.08, 1.6) + "rem";

      const pad = 12;
      const maxX = Math.max(pad, section.clientWidth - noBtn.offsetWidth - pad);
      const maxY = Math.max(pad, section.clientHeight - noBtn.offsetHeight - pad);
      const currentX = parseFloat(noBtn.style.left) || 0;
      const currentY = parseFloat(noBtn.style.top) || 0;
      let x;
      let y;
      let tries = 0;
      do {
        x = pad + Math.random() * (maxX - pad);
        y = pad + Math.random() * (maxY - pad);
        tries++;
      } while (Math.hypot(x - currentX, y - currentY) < 120 && tries < 20);

      noBtn.style.left = x + "px";
      noBtn.style.top = y + "px";
    }

    noBtn.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") dodge(e);
    });
    noBtn.addEventListener("pointerdown", dodge);
    noBtn.addEventListener("click", dodge);

    yesBtn.addEventListener("click", () => {
      $("final-buttons").hidden = true;
      message.hidden = true;
      noBtn.remove();
      const answer = $("final-answer");
      answer.textContent = F.afterYes;
      answer.hidden = false;
      Confetti.burst(220);
      Confetti.rain(4);
      heartShower(40);
    });
  }

  /* ---------- Start ---------- */

  $("quiz-intro").textContent = C.quiz.intro;
  $("hero-eyebrow").textContent = C.hero.eyebrow;
  $("hero-title").textContent = C.hero.title;
  document.title = "For " + C.herName;

  renderLetter();
  renderTimeline();
  setupReasons();
  setupFinalQuestion();

  // Add ?preview to the URL to skip the quiz while you're editing.
  if (new URLSearchParams(window.location.search).has("preview")) {
    quizEl.hidden = true;
    showSite();
  } else {
    showQuestion();
  }
})();
