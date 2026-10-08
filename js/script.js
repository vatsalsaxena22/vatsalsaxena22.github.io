const skillElement = document.querySelector(".skills .box");

// Fetch both skills
Promise.all([fetch("./data/skills.json").then((response) => response.json())])
  .then(([skills]) => {
    // Generate HTML for skills
    const skillsHTML = skills.skills
      .map(
        (element) => `
        <div class="skills-item">
        <img class="${element.animation}" src="./images/skills/${element.image}" alt="${element.alt}">
        <h2>${element.skillName}</h2>
        </div>
      `,
      )
      .join("");

    // Update the DOM
    skillElement.innerHTML += skillsHTML;
  })
  .catch((error) => console.error("Error fetching data:", error));

// Custom cursor stays on the document layer, independent of the sticky header.
const cursor = document.querySelector(".cursor");
const cursorInner = document.querySelector(".cursor2");
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");

if (cursor && cursorInner && finePointer.matches) {
  document.documentElement.classList.add("has-custom-cursor");
  let cursorFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (cursorFrame) return;

    cursorFrame = requestAnimationFrame(() => {
      cursor.style.left = `${pointerX}px`;
      cursor.style.top = `${pointerY}px`;
      cursorInner.style.left = `${pointerX}px`;
      cursorInner.style.top = `${pointerY}px`;
      cursor.classList.add("is-visible");
      cursorInner.classList.add("is-visible");
      cursorFrame = 0;
    });
  }, { passive: true });

  document.addEventListener("pointerdown", () => {
    cursor.classList.add("click");
    cursorInner.classList.add("cursorinnerhover");
  });
  document.addEventListener("pointerup", () => {
    cursor.classList.remove("click");
    cursorInner.classList.remove("cursorinnerhover");
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button")) cursor.classList.add("hover");
  });
  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button") && !event.relatedTarget?.closest("a, button")) {
      cursor.classList.remove("hover");
    }
  });
}

// Loading

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");

  // Simulate loading time - adjust as needed
  setTimeout(function () {
    // Hide the loading screen after animation completes
    loadingScreen.classList.add("hidden");
  }, 1500); // Wait for animation to finish before hiding

  // Fallback to ensure loading screen disappears
  window.addEventListener("load", function () {
    setTimeout(function () {
      loadingScreen.classList.add("hidden");
    }, 1500);
  });
});




// Runs after script.js. Skills, cursor and loader code there stay as they are.
const $ = (s, r = document) => r.querySelector(s);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const skillsReady = fetch("./data/skills.json")
  .then((r) => r.json())
  .then((d) => d.skills.map((s) => s.skillName))
  .catch(() => []);

/* Hero entrance starts when the loader hides */
const loader = $("#loadingScreen");
let started = false;
function go() {
  if (started) return;
  started = true;
  document.documentElement.classList.add("ready");
  startTerminal();
}
new MutationObserver(() => loader.classList.contains("hidden") && go()).observe(loader, { attributes: true });
setTimeout(go, 3000);

/* Terminal: types two commands, then prints your real stack from skills.json */
async function startTerminal() {
  const el = $("#termBody");
  const sleep = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const stack = (await Promise.race([skillsReady, sleep(1500).then(() => [])])).join(", ") || "HTML, CSS, JavaScript";
  const role = $(".experience .card a").textContent;
  let html = "";
  const type = async (cmd) => {
    for (let i = 1; i <= cmd.length; i++) {
      el.innerHTML = `${html}<b>$</b> ${cmd.slice(0, i)}<u></u>`;
      await sleep(35);
    }
    html += `<b>$</b> ${cmd}\n`;
  };
  const out = (t) => { html += t + "\n"; el.innerHTML = html + "<u></u>"; };
  await type("whoami");
  out("Vatsal Saxena, Full Stack Developer");
  await sleep(300);
  await type("cat stack.txt");
  out(`<em>${stack}</em>`);
  await sleep(300);
  await type("git log -1 --format=%an@%cn");
  out(`Currently at ${role}`);
  el.innerHTML = html + "<b>$</b> <u></u>";
}

/* Scroll progress + active nav link */
const prog = $(".scroll-progress");
addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  prog.style.setProperty("--p", max > 0 ? scrollY / max : 0);
}, { passive: true });

const navLinks = [...document.querySelectorAll("nav a")];
const sections = [...document.querySelectorAll("section[id]")];
const homeLink = "#top";

function setActiveNav(href) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === href;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

setActiveNav(homeLink);
navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveNav(link.getAttribute("href")));
});

const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) setActiveNav("#" + e.target.id);
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((section) => spy.observe(section));

addEventListener("scroll", () => {
  if (sections[0] && sections[0].getBoundingClientRect().top > innerHeight * 0.45) {
    setActiveNav(homeLink);
  }
}, { passive: true });

/* Time spent in each role, calculated live */
document.querySelectorAll(".tenure").forEach((el) => {
  const [sy, sm] = el.dataset.start.split("-").map(Number);
  const end = el.dataset.end ? el.dataset.end.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  const months = (end[0] - sy) * 12 + (end[1] - sm);
  if (months < 1) return;
  const y = Math.floor(months / 12), m = months % 12;
  el.textContent = [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(" ");
});

/* Contact form (EmailJS) */
emailjs.init({ publicKey: "4T-nuIusr_WSXK11D" });
const form = $("#contact-form");
const statusEl = $("#status-message");
const btn = form.querySelector("button[type='submit']");
const label = btn.textContent;
let sending = false;

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = type;
  if (type === "success") setTimeout(() => { statusEl.textContent = ""; statusEl.className = ""; }, 5000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (sending) return;
  const d = new FormData(form);
  const name = d.get("formName")?.trim(), email = d.get("formEmail")?.trim(), msg = d.get("message")?.trim();
  if (!name || !email || !msg) return showStatus("Fill in your name, email and message.", "error");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showStatus("Enter a valid email address, like you@example.com.", "error");
  try {
    sending = true;
    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span>Sending...';
    showStatus("Sending your message...", "loading");
    await emailjs.sendForm("service_uu2xf55", "template_znhg5hj", form);
    showStatus("Message sent. I'll reply by email.", "success");
    form.reset();
  } catch (err) {
    console.error("EmailJS Error:", err);
    showStatus("Message not sent. Check your connection and try again, or email me directly.", "error");
  } finally {
    sending = false;
    btn.disabled = false;
    btn.textContent = label;
  }
});