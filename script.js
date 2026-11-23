/* ===== CONFIGURAÇÃO: troque pelos dados reais ===== */
const CONFIG = {
  brand: "Studio Appex",
  whatsapp: "5500000000000", // DDI + DDD + número, só dígitos
  message: "Olá! Gostaria de solicitar um orçamento de site.",
  email: "contato@seudominio.com.br",
  instagram: "@suamarca",
  region: "[Cidade, UF] e atendimento remoto"
};

/* ===== PORTFÓLIO: detalhes exibidos no modal =====
   Para um projeto real, acrescente concept:false e adapte o texto do modal. */
const PROJECTS = {
  aurora: { title: "Clínica Aurora", type: "Site institucional",
    goal: "Mostrar como um site institucional pode apresentar especialidades e equipe e facilitar o agendamento.",
    audience: "Pessoas que procuram uma clínica de fisioterapia e bem-estar (público fictício).",
    structure: ["Início com chamada para agendar", "Especialidades", "Equipe", "Contato e agendamento"],
    visual: ["Paleta verde-água, suave e acolhedora", "Silhueta simples no lugar de fotos reais", "Botão de agendamento sempre em destaque"],
    features: ["Botão fixo de agendamento", "Cartões de especialidades", "Página de equipe"] },
  vento: { title: "Ateliê Vento", type: "Landing page",
    goal: "Demonstrar uma landing page editorial para uma marca criativa que recebe pedidos pelo WhatsApp.",
    audience: "Pessoas interessadas em cerâmica artesanal (público fictício).",
    structure: ["Título expressivo", "Vitrine de peças", "Como fazer um pedido", "Contato"],
    visual: ["Título em serifa itálica de grande escala", "Tons de argila e areia", "Peças em formas geométricas simples"],
    features: ["Vitrine de produtos", "Botão de pedido pelo WhatsApp", "Composição editorial"] },
  prumo: { title: "Prumo Engenharia", type: "Site institucional corporativo",
    goal: "Mostrar um site corporativo e sóbrio, com serviços, segmentos de atuação e contato comercial em destaque.",
    audience: "Empresas que buscam serviços de engenharia (público fictício).",
    structure: ["Apresentação institucional", "Serviços", "Segmentos de atuação", "Projetos", "Contato comercial"],
    visual: ["Azul-petróleo com acento laranja", "Cantos retos e grade rígida", "Bloco lateral que reforça a linguagem técnica"],
    features: ["Cartões de serviços", "Chamada para contato comercial", "Estrutura pronta para projetos reais"] }
};

const FAQ = [
  ["Quanto custa desenvolver um site?", "O valor depende do tipo de projeto, do conteúdo e das funcionalidades necessárias. Por isso não trabalhamos com tabela fixa: depois de entender o seu caso, enviamos um orçamento personalizado."],
  ["Quanto tempo leva para desenvolver um projeto?", "Depende do escopo, do volume de conteúdo e do tempo de aprovação de cada etapa. O prazo é combinado no planejamento, antes de o projeto começar."],
  ["O site funciona em celulares e tablets?", "Sim. Os projetos são desenvolvidos para se adaptar a celulares, tablets e computadores."],
  ["Posso solicitar um site personalizado?", "Sim. Se você precisa de funcionalidades ou de uma interface específica, descreva a necessidade no formulário e avaliamos o melhor caminho."],
  ["O Studio Appex oferece manutenção?", "Manutenção e suporte são serviços complementares. O formato e as condições são combinados de acordo com o projeto."],
  ["Como funciona a contratação?", "Começamos com uma conversa inicial, seguida de planejamento, design e desenvolvimento, revisão e publicação. Os detalhes da contratação são combinados no orçamento."],
  ["Como solicitar um orçamento?", "Preencha o formulário nesta página ou chame pelo WhatsApp. Conte brevemente sobre o seu negócio e o que você precisa."]
];

const $ = (s, el = document) => [...el.querySelectorAll(s)];
const $1 = (s, el = document) => el.querySelector(s);
const make = (tag, text, cls) => { const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; };
document.documentElement.classList.add("js");

/* ===== Contatos e marca ===== */
const waReady = /^\d{12,13}$/.test(CONFIG.whatsapp) && !/^\d{2}0{9,}/.test(CONFIG.whatsapp) && !/^550{2}/.test(CONFIG.whatsapp);
const waLink = text => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text);
$("[data-brand]").forEach(el => el.textContent = CONFIG.brand);
$("[data-wa]").forEach(a => { if (waReady) { a.href = waLink(CONFIG.message); a.target = "_blank"; a.rel = "noopener"; } });
$("[data-mail]").forEach(a => { a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });
$("[data-ig]").forEach(a => { a.href = "https://instagram.com/" + CONFIG.instagram.replace("@", ""); a.textContent = "Instagram " + CONFIG.instagram; });
$("[data-region]").forEach(p => p.textContent = CONFIG.region);
$1("#year").textContent = new Date().getFullYear();

/* ===== Header e menu mobile ===== */
const header = $1(".site-header"), burger = $1(".burger"), menu = $1("#menu");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
onScroll(); addEventListener("scroll", onScroll, { passive: true });
const setMenu = open => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
};
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); } });

/* ===== Mockups (clonados dos <template>) ===== */
const mock = (id, target) => target.replaceChildren(document.getElementById("t-" + id).content.cloneNode(true));
$("[data-mock]").forEach(el => mock(el.dataset.mock, el));

/* ===== Portfólio: modal acessível (<dialog>) ===== */
const dlg = $1("#dlg"); let opener = null;
const openProject = (id, from) => {
  const p = PROJECTS[id]; if (!p) return;
  opener = from;
  mock(id, $1("#dmock"));
  $1("#dt").textContent = p.title; $1("#dcat").textContent = p.type;
  const body = $1("#dbody"); body.replaceChildren();
  [["Objetivo do conceito", p.goal], ["Público-alvo fictício", p.audience], ["Estrutura do site", p.structure], ["Decisões visuais", p.visual], ["Recursos demonstrativos", p.features]].forEach(([k, v]) => {
    const row = make("div"); row.append(make("dt", k));
    if (Array.isArray(v)) { const ul = make("ul"); v.forEach(i => ul.append(make("li", i))); const dd = make("dd"); dd.append(ul); row.append(dd); }
    else row.append(make("dd", v));
    body.append(row);
  });
  dlg.showModal();
};
document.addEventListener("click", e => {
  const t = e.target.closest("[data-project]");
  if (t) openProject(t.dataset.project, t.closest("button") || t);
  if (e.target.closest(".x") || e.target === dlg) dlg.close();
  if (e.target.id === "dcta") dlg.close();
});
dlg.addEventListener("close", () => { if (opener && opener.focus) opener.focus(); });

/* ===== FAQ: acordeão ===== */
const acc = $1("#acc");
FAQ.forEach(([q, a], i) => {
  const b = make("button", q, "q"); b.id = "q" + i; b.type = "button";
  b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", "p" + i);
  const p = make("div", a, "pn"); p.id = "p" + i; p.hidden = true;
  p.setAttribute("role", "region"); p.setAttribute("aria-labelledby", b.id);
  b.addEventListener("click", () => { const o = b.getAttribute("aria-expanded") === "true"; b.setAttribute("aria-expanded", !o); p.hidden = o; });
  acc.append(b, p);
});
acc.addEventListener("keydown", e => {
  const qs = $(".q", acc), i = qs.indexOf(document.activeElement); if (i < 0) return;
  const to = { ArrowDown: (i + 1) % qs.length, ArrowUp: (i - 1 + qs.length) % qs.length, Home: 0, End: qs.length - 1 }[e.key];
  if (to !== undefined) { e.preventDefault(); qs[to].focus(); }
});

/* ===== Formulário: valida e abre o WhatsApp ===== */
const form = $1("#form"), status = $1("#fstatus");
const preset = tipo => { form.tipo.value = tipo; };
$("[data-type]").forEach(a => a.addEventListener("click", () => preset(a.dataset.type)));
const rules = {
  nome: v => v.trim().length >= 2 || "Informe seu nome.",
  contato: v => /^\S+@\S+\.\S+$/.test(v.trim()) || v.replace(/\D/g, "").length >= 10 || "Informe um e-mail válido ou um WhatsApp com DDD.",
  tipo: v => !!v || "Escolha o tipo de projeto.",
  desc: v => v.trim().length >= 10 || "Descreva o projeto em pelo menos 10 caracteres."
};
form.addEventListener("submit", e => {
  e.preventDefault();
  let first = null;
  Object.keys(rules).forEach(k => {
    const f = form[k], r = rules[k](f.value), msg = r === true ? "" : r;
    $1("#e-" + k).textContent = msg;
    f.setAttribute("aria-invalid", !!msg);
    if (msg && !first) first = f;
  });
  if (first) { first.focus(); return; }
  if (!waReady) {
    status.textContent = "O número de WhatsApp ainda não foi configurado. Defina CONFIG.whatsapp no script.js para ativar o envio.";
    status.className = "fnote warn"; return;
  }
  const d = k => form[k].value.trim();
  const text = [CONFIG.message, "", "*Nome:* " + d("nome"), "*Empresa:* " + (d("empresa") || "não informada"), "*Contato:* " + d("contato"), "*Tipo de projeto:* " + d("tipo"), "*Sobre o projeto:* " + d("desc")].join("\n");
  status.textContent = "Abrimos o WhatsApp com a sua mensagem. Confirme o envio por lá.";
  status.className = "fnote";
  window.open(waLink(text), "_blank", "noopener");
});

/* ===== Entrada suave das seções ===== */
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 });
  $("main section:not(.hero) .wrap > *, .strip li").forEach(el => { el.dataset.r = ""; io.observe(el); });
}
