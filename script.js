document.getElementById("year").textContent = new Date().getFullYear();

const highlights = [
  {
    title: "Community builder.",
    text: "I care about making spaces where people feel seen and supported — and I’m comfortable taking the first step to make that happen.",
    img: "highlight-1.jpeg",
    alt: "Maddy in a community/leadership moment"
  },
  {
    title: "Calm under pressure.",
    text: "When things get messy, I simplify. I ask the right questions, write down decisions, and keep momentum without drama.",
    img: "highlight-2.jpeg",
    alt: "Maddy in a calm, focused moment"
  },
  {
    title: "Friendly competitor.",
    text: "I love games and puzzles because they reward strategy, practice, and curiosity — and they bring people together.",
    img: "highlight-3.jpeg",
    alt: "Maddy at a board game / card game event"
  },
  {
    title: "High-ownership follow-through.",
    text: "If I say I’ll do it, it gets done. I like turning big goals into small steps and clear next actions.",
    img: "highlight-4.jpeg",
    alt: "Maddy working / planning / organizing"
  },
  {
    title: "Always learning.",
    text: "I’m happiest when I’m improving — whether that’s strength training, building something new, or getting better at how I collaborate.",
    img: "highlight-5.jpeg",
    alt: "Maddy hiking / learning / training moment"
  }
];

let active = 0;
let timer = null;
const DURATION_MS = 7000;

const tabs = Array.from(document.querySelectorAll(".hTab"));
const dots = Array.from(document.querySelectorAll(".hDot"));
const titleEl = document.getElementById("hTitle");
const textEl = document.getElementById("hText");
const imgEl = document.getElementById("hImg");
const progressEl = document.getElementById("hProgressBar");

function setActive(index) {
  active = index;

  tabs.forEach((t, i) => {
    const on = i === active;
    t.classList.toggle("isActive", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });

  dots.forEach((d, i) => d.classList.toggle("isActive", i === active));

  const h = highlights[active];
  titleEl.textContent = h.title;
  textEl.textContent = h.text;
  imgEl.src = h.img;
  imgEl.alt = h.alt;

  resetProgress();
  restartTimer();
}

let progressStart = null;
function tickProgress(ts) {
  if (!progressStart) progressStart = ts;
  const elapsed = ts - progressStart;
  const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
  progressEl.style.width = pct + "%";
  if (elapsed < DURATION_MS) requestAnimationFrame(tickProgress);
}

function resetProgress() {
  progressStart = null;
  progressEl.style.width = "0%";
  requestAnimationFrame(tickProgress);
}

function restartTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    setActive((active + 1) % highlights.length);
  }, DURATION_MS);
}

tabs.forEach(btn => btn.addEventListener("click", () => setActive(Number(btn.dataset.index))));
dots.forEach(btn => btn.addEventListener("click", () => setActive(Number(btn.dataset.index))));

// keyboard nicety
document.querySelector(".highlightsNav")?.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
  e.preventDefault();
  const dir = e.key === "ArrowDown" ? 1 : -1;
  setActive((active + dir + highlights.length) % highlights.length);
});

setActive(0);