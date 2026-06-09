const portfolioKnowledge = {
  experience:
    "Anubhav has worked across Bluwheelz, Stadtgemüse, Moyyn, AigenEdge, Pg On Palm, and other product/business roles, with a focus on fleet analytics, operations intelligence, AI automation, ESG reporting, and audit workflows.",
  projects:
    "Featured systems include a Fleet Performance Dashboard, ESG CO₂ Emission System, Audit Intelligence Tool, EV Route Optimization Tool, and AI Reporting Automation System.",
  skills:
    "Core skills include Python, SQL, AI agents, n8n, dashboarding, KPI monitoring, workflow automation, fleet analytics, and ESG reporting.",
  operations:
    "The operations focus is turning messy execution data into visible control loops: KPIs, exceptions, route performance, reporting automation, audit signals, and management-ready dashboards.",
  ai: "Anubhav builds AI workflow automation systems using agents, structured knowledge bases, reporting pipelines, and orchestration tools like n8n.",
  esg: "ESG systems include CO₂ emission tracking, EV fleet impact reporting, operational activity conversion, and sustainability dashboards for leadership visibility.",
  fleet:
    "Fleet analytics work covers EV utilization, route optimization, uptime, charging behavior, downtime, SLA performance, and operational performance dashboards.",
  audit:
    "Audit intelligence work includes payroll leakage detection, variance analysis, anomaly spotting, and exception workflows. One highlighted result is ₹2M+ payroll leakage identified.",
  default:
    "I work across operations, analytics, AI automation, dashboards, and systems that make messy business workflows easier to run.",
};

const typingPhrases = [
  "Designing dashboards that behave like command centers.",
  "Automating reporting loops from raw data to decisions.",
  "Building AI workflows for operations teams.",
  "Mapping EV fleet signals into measurable performance.",
];

const CHAT_RETRYABLE_ERRORS = [
  "high demand",
  "overloaded",
  "overload",
  "temporarily unavailable",
  "resource has been exhausted",
  "quota",
  "unable to reach gemini",
  "live ai response glitched",
];

function initLibraries() {
  if (window.lucide) {
    lucide.createIcons();
  }

  if (window.AOS) {
    AOS.init({
      duration: 820,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
    });
  }

  if (window.Lenis) {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.85,
      smoothWheel: true,
    });

    window.portfolioLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".project-card, .metric-card, .skill-card").forEach((card) => {
      gsap.fromTo(
        card,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        }
      );
    });

    gsap.to(".hero-orbit-one", {
      rotate: 360,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".hero-orbit-two", {
      rotate: -360,
      duration: 34,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".hero-dashboard", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

function initSmoothAnchors() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId && targetId.length > 1 ? document.querySelector(targetId) : null;
      if (!target) return;

      event.preventDefault();

      if (window.portfolioLenis?.scrollTo) {
        window.portfolioLenis.scrollTo(target, { offset: -88, duration: 1.15 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: "smooth" });
      }

      history.pushState(null, "", targetId);
    });
  });
}

function initHeroTilt() {
  const cards = document.querySelectorAll("[data-tilt-card]");

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const count = window.matchMedia("(max-width: 768px)").matches ? 22 : 46;

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 14}s`;
    particle.style.animationDelay = `${Math.random() * -18}s`;
    particle.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    container.appendChild(particle);
  }
}

function initTypingAnimation() {
  const target = document.getElementById("typedText");
  if (!target) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = typingPhrases[phraseIndex];
    const nextText = phrase.slice(0, charIndex);
    target.textContent = nextText;

    if (!deleting && charIndex < phrase.length) {
      charIndex += 1;
      setTimeout(tick, 42);
      return;
    }

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      setTimeout(tick, 1400);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(tick, 24);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    setTimeout(tick, 260);
  }

  tick();
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length || !window.gsap || !window.ScrollTrigger) return;

  counters.forEach((counter) => {
    const value = Number(counter.dataset.counter);
    const prefix = counter.dataset.prefix || "";
    const suffix = counter.dataset.suffix || "";
    const state = { value: 0 };

    gsap.to(state, {
      value,
      duration: 1.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        counter.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
      },
    });
  });
}

function resolveAnswer(input) {
  const query = input.toLowerCase();

  if (query.includes("why should we hire") || query.includes("why hire") || query.includes("why should we choose")) {
    if (query.includes("ecommerce") || query.includes("marketing") || query.includes("brand")) {
      return "For an e-commerce brand, I’d be valuable because I don’t look at marketing in isolation. I think in terms of operations, funnels, reporting, automation, customer behavior, and decision systems. If your team has data spread across tools, repetitive reporting, messy execution, or campaigns that look busy but don’t translate into clear insights, I’m the kind of person who builds the structure behind the growth so the team can move faster with less chaos.";
    }

    return "You should hire Anubhav because he doesn’t just analyze problems, he builds systems that reduce them permanently. He connects operations, automation, analytics, and product thinking so teams get better visibility, faster execution, and less manual chaos. He’s especially strong in fast-moving environments where people are tired of broken processes pretending to be strategy.";
  }

  if (query.includes("tell me about yourself")) {
    return "I sit between operations, product, automation, and business strategy. I like fixing messy systems, automating repetitive work, and turning chaos into processes that actually scale. Most of my work happens where someone says, 'this is too manual,' and I end up building a smarter system for it.";
  }

  if (query.includes("roast")) {
    return "Anubhav will spend 6 hours automating a task that takes 11 minutes because 'long-term scalability matters.' He has 47 business ideas, 19 dashboards, 8 Notion systems, and one sleep schedule held together by caffeine and optimism.";
  }

  if (query.includes("gemini") || query.includes("why is ai not working") || query.includes("why ai is not working")) {
    return "Usually it means the live model had a temporary overload, quota hiccup, or one of those classic cloud drama moments. The site falls back to the local knowledge layer so the chat does not die completely, but yes, ideally the live response should come through on the first try.";
  }

  if (query.includes("marketing") || query.includes("ecommerce") || query.includes("brand")) {
    return "He’s not a traditional brand marketer, but he is very useful for e-commerce teams that need cleaner reporting, better operational visibility, smarter automation, and less spreadsheet theatre. He’s the person you bring in when growth starts getting messy behind the scenes and someone needs to connect execution with systems.";
  }

  const rules = [
    ["experience", ["experience", "work", "career", "bluwheelz", "bluewheelz", "stadt", "moyyn", "aigenedge", "palm"]],
    ["projects", ["project", "built", "showcase", "tool", "dashboard", "system"]],
    ["skills", ["skill", "stack", "python", "sql", "n8n", "agent"]],
    ["operations", ["operation", "ops", "process", "kpi", "monitoring"]],
    ["ai", ["ai", "automation", "workflow", "agent", "bot"]],
    ["esg", ["esg", "co2", "co₂", "carbon", "emission", "sustainability"]],
    ["fleet", ["fleet", "ev", "vehicle", "route", "charging", "uptime"]],
    ["audit", ["audit", "payroll", "leakage", "variance", "risk"]],
  ];

  const match = rules.find(([, keywords]) => keywords.some((keyword) => query.includes(keyword)));
  return portfolioKnowledge[match?.[0] || "default"];
}

function humanizeAIError(errorMessage) {
  const message = String(errorMessage || "").toLowerCase();

  if (
    message.includes("high demand") ||
    message.includes("overloaded") ||
    message.includes("overload") ||
    message.includes("temporarily unavailable") ||
    message.includes("resource has been exhausted") ||
    message.includes("quota")
  ) {
    return "The live AI is having one of its dramatic cloud moments right now, so I’m answering from the local knowledge layer instead.";
  }

  if (message.includes("not configured")) {
    return "The live AI connection is not configured correctly yet, so I’m falling back to the local knowledge layer.";
  }

  return "The live AI response glitched, so I’m answering from the local knowledge layer for now.";
}

function appendMessage(container, text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
  return message;
}

function appendTyping(container) {
  const typing = document.createElement("div");
  typing.className = "message bot typing-bubble";
  typing.innerHTML = "<span></span><span></span><span></span>";
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
  return typing;
}

async function requestAIResponse(message, history) {
  if (window.location.protocol === "file:") {
    throw new Error("Run the local server to enable live AI replies.");
  }

  let lastError = new Error("The AI assistant is unavailable.");

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, history }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.setup || data.error || "The AI assistant is unavailable.");
      }

      return data.answer;
    } catch (error) {
      lastError = error;
      const normalized = String(error.message || "").toLowerCase();
      const shouldRetry = CHAT_RETRYABLE_ERRORS.some((item) => normalized.includes(item));

      if (!shouldRetry || attempt === 1) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 900));
    }
  }

  throw lastError;
}

function initChatbot() {
  const launcher = document.getElementById("chatLauncher");
  const windowEl = document.getElementById("chatWindow");
  const minimize = document.getElementById("chatMinimize");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

  if (!launcher || !windowEl || !minimize || !form || !input || !messages) return;

  const chatHistory = [];

  function openChat() {
    windowEl.classList.add("open");
    launcher.setAttribute("aria-expanded", "true");
    setTimeout(() => input.focus(), 120);
  }

  function closeChat() {
    windowEl.classList.remove("open");
    launcher.setAttribute("aria-expanded", "false");
  }

  launcher.addEventListener("click", () => {
    if (windowEl.classList.contains("open")) {
      closeChat();
    } else {
      openChat();
    }
  });

  minimize.addEventListener("click", closeChat);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    appendMessage(messages, value, "user");
    chatHistory.push({ role: "user", content: value });
    input.value = "";
    input.disabled = true;

    const typing = appendTyping(messages);

    try {
      const answer = await requestAIResponse(value, chatHistory.slice(0, -1));
      typing.remove();
      appendMessage(messages, answer, "bot");
      chatHistory.push({ role: "assistant", content: answer });
    } catch (error) {
      const fallback = `${resolveAnswer(value)}\n\n${humanizeAIError(error.message)}`;
      typing.remove();
      appendMessage(messages, fallback, "bot");
      chatHistory.push({ role: "assistant", content: fallback });
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLibraries();
  initSmoothAnchors();
  initHeroTilt();
  initCursorGlow();
  createParticles();
  initTypingAnimation();
  initCounters();
  initChatbot();
});
