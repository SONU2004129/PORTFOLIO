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

/* ── Static projects data (no backend needed — instant load) ── */
const PROJECTS = [
    {
        title: "AI Resume Builder",
        tech: "HTML · CSS · JavaScript",
        desc: "An AI-powered resume builder that generates professional resumes from user input. Features live preview, multiple templates, and one-click PDF export.",
        demo: "https://resume-builder-psi-beryl.vercel.app/",
        github: "https://github.com/SONU2004129/Resume-builder",
    },
    {
        title: "Image Gallery Website",
        tech: "HTML · CSS · JavaScript",
        desc: "A responsive image gallery with dynamic filtering, lightbox preview, and smooth animations. Built with vanilla JS for zero-dependency fast performance.",
        demo: "https://imgallery-web.vercel.app",
        github: "https://github.com/SONU2004129/Resume-builder",
    },
    {
        title: "Project Management App",
        tech: "TypeScript · React · Node.js",
        desc: "A full-featured project management dashboard for tracking tasks, milestones, and team progress. Built with TypeScript for type-safe, scalable architecture.",
        demo: null,
        github: "https://github.com/SONU2004129/PROJECT-MANAGEMENT",
    },
    {
        title: "Blog Platform",
        tech: "JavaScript · Node.js · Express",
        desc: "A full-stack blogging platform where users can create, edit, and publish posts. Supports rich-text content, categories, and a clean reading experience.",
        demo: null,
        github: "https://github.com/SONU2004129/Blog-Platform",
    },
    {
        title: "E-Commerce Website",
        tech: "HTML · CSS · JavaScript",
        desc: "A modern e-commerce storefront featuring product listings, shopping cart, and a responsive UI. Designed with clean aesthetics for an optimal shopping experience.",
        demo: null,
        github: "https://github.com/SONU2004129/E-commerce",
    },
    {
        title: "P2P File Transfer System",
        tech: "Go (Golang)",
        desc: "A peer-to-peer file transfer system built in Go, enabling direct device-to-device file sharing over a local network without any central server.",
        demo: null,
        github: "https://github.com/SONU2004129/P2P-file-transfer-System-",
    },
    {
        title: "Hospital Management System",
        tech: "Java · OOP",
        desc: "An object-oriented hospital management system for handling patient records, doctor appointments, and billing. Demonstrates strong OOP design principles in Java.",
        demo: null,
        github: "https://github.com/SONU2004129/Hospital-Management-System",
    },
    {
        title: "Bank Management System",
        tech: "C++",
        desc: "A console-based banking application in C++ supporting account creation, deposits, withdrawals, and balance enquiry. Showcases file handling and OOP concepts.",
        demo: null,
        github: "https://github.com/SONU2004129/Bank-Management-System",
    },
    {
        title: "Library Management System",
        tech: "C++",
        desc: "A C++ library management system to manage books, members, and issue/return records. Features search and data persistence via file handling.",
        demo: null,
        github: "https://github.com/SONU2004129/Library-Management-System",
    },
    {
        title: "Student Management System",
        tech: "C++",
        desc: "A comprehensive student record management system in C++ that tracks student data, marks, and generates reports using object-oriented programming.",
        demo: null,
        github: "https://github.com/SONU2004129/Student-Management-System",
    },
    {
        title: "Tic-Tac-Toe Game",
        tech: "C++",
        desc: "A classic two-player Tic-Tac-Toe game implemented in C++ with a clean console interface, game state tracking, and win/draw detection logic.",
        demo: null,
        github: "https://github.com/SONU2004129/Tic-Tack-Toe-game",
    },
];

function loadProjects() {
    const grid = document.getElementById("projectsGrid");

    let html = "";

    PROJECTS.forEach((project, index) => {
        html += `
            <div class="project-card">
                <div class="project-num">
                    PROJECT ${String(index + 1).padStart(2, "0")}
                </div>
                <h3 class="project-title">${project.title}</h3>
                <div class="project-year">${project.tech}</div>
                <p class="project-desc">${project.desc}</p>
                <div class="project-btns">
                    ${project.demo ? `
                    <a href="${project.demo}" target="_blank" class="project-demo-btn">
                        Live Demo →
                    </a>` : ""}
                    ${project.github ? `
                    <a href="${project.github}" target="_blank" class="project-github-btn">
                        GitHub ↗
                    </a>` : ""}
                </div>
                <div class="project-tags">
                    <span class="tag tag-lang">${project.tech}</span>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

loadProjects();
