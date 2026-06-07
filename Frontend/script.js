/* ============================================================
   Meghnath Marndi — Portfolio
   script.js  (extracted from portfolio.html)
   ============================================================ */

/* ── Custom cursor ── */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

let mx = 0,
    my = 0; // mouse position
let rx = 0,
    ry = 0; // ring position (lerped for smooth lag)

document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
});

function animCursor() {
    // Dot snaps to cursor instantly
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;

    // Ring follows with a lerp (smooth lag effect)
    rx += (mx - rx - 18) * 0.15;
    ry += (my - ry - 18) * 0.15;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;

    requestAnimationFrame(animCursor);
}

animCursor();

/* ── Scroll reveal ── */
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger siblings by their index inside their parent
                const delay =
                    Array.from(entry.target.parentElement.children).indexOf(
                        entry.target,
                    ) * 80;
                setTimeout(() => entry.target.classList.add("visible"), delay);
            }
        });
    },
    { threshold: 0.12 },
);

reveals.forEach((el) => revealObserver.observe(el));

/* ── Page dots — scroll position tracking ── */
const sectionIds = ["home", "about", "skills", "projects", "contact"];
const dots = document.querySelectorAll(".dot");
const sectionEls = sectionIds.map((id) => document.getElementById(id));

/** Smooth-scroll to a section by its id */
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + window.innerHeight / 2;

    sectionEls.forEach((sec, i) => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            dots.forEach((d) => d.classList.remove("active"));
            dots[i].classList.add("active");
        }
    });
});

/* ── Load projects from backend API ── */
async function loadProjects() {
    try {
        const API_URL =
            location.hostname === "localhost" || location.protocol === "file:"
                ? "http://localhost:3000"
                : "https://portfolio-full-stack-xz6i.onrender.com";

        const response = await fetch(`${API_URL}/projects`);

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const projects = await response.json();
        const grid = document.getElementById("projectsGrid");

        let html = "";

        projects.forEach((project, index) => {
            html += `
                <div class="project-card">
                    <div class="project-num">
                        PROJECT ${String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-year">${project.tech}</div>
                    <p class="project-desc">Project loaded from MongoDB database.</p>
                    <div class="project-tags">
                        <span class="tag tag-lang">${project.tech}</span>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
    } catch (error) {
        console.error("Error loading projects:", error);

        document.getElementById("projectsGrid").innerHTML = `
            <div class="project-card">
                <h3 class="project-title">Failed to load projects</h3>
            </div>
        `;
    }
}

loadProjects();
