/* ===== CONFIGURAÇÃO: troque pelos dados reais ===== */
const CONFIG = {
  brand: "Nome da Marca",
  whatsapp: "5500000000000", // DDI + DDD + número, só dígitos
  message: "Olá! Gostaria de solicitar um orçamento de site.",
  email: "contato@seudominio.com.br",
  instagram: "@suamarca",
  region: "[Cidade, UF] e atendimento remoto"
};

/* ===== PORTFÓLIO: adicione projetos reais aqui =====
   Para um projeto real: concept:false, image:"assets/projeto.jpg" e url:"https://..." */
const PROJECTS = [
  { title: "Clínica Aurora", type: "Site institucional", desc: "Apresentação de serviços, equipe e agendamento.", bg: "#DDEFEA", fg: "#14172B", ac: "#2E9C87", concept: true },
  { title: "Ateliê Vento", type: "Landing page", desc: "Página única para divulgar uma coleção e receber pedidos.", bg: "#14172B", fg: "#F3F4F8", ac: "#FFC93C", concept: true },
  { title: "Prumo Engenharia", type: "Site institucional", desc: "Serviços, projetos e canal de contato para obras.", bg: "#E8EAF0", fg: "#1B2370", ac: "#E8742C", concept: true }
];

const $ = (s, el = document) => [...el.querySelectorAll(s)];
$("[data-brand]").forEach(el => el.textContent = CONFIG.brand);
const wa = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.message);
$("[data-wa]").forEach(a => { a.href = wa; a.target = "_blank"; a.rel = "noopener"; });
$("[data-mail]").forEach(a => { a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });
$("[data-ig]").forEach(a => { a.href = "https://instagram.com/" + CONFIG.instagram.replace("@", ""); a.textContent = "Instagram " + CONFIG.instagram; });
$("[data-region]").forEach(p => p.textContent = CONFIG.region);
document.getElementById("year").textContent = new Date().getFullYear();

const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
const setMenu = open => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
};
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

document.getElementById("projects").innerHTML = PROJECTS.map(p => {
  const visual = p.image
    ? `<img src="${p.image}" alt="Projeto ${p.title}" loading="lazy">`
    : "<i></i><i></i><i></i><i></i><i></i><i></i>";
  const box = `<span class="mock" style="--bg:${p.bg};--fg:${p.fg};--ac:${p.ac}" ${p.image ? "" : 'role="img" aria-label="Ilustração do conceito ' + p.title + '"'}>${visual}</span>`;
  return `<article class="project">
    ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${box}</a>` : box}
    <h3>${p.title}</h3><p>${p.type}. ${p.desc}</p>
    ${p.concept ? '<span class="chip">Conceito demonstrativo</span>' : ""}
  </article>`;
}).join("");
