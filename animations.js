/* ===== Animações GSAP (aprimoramento progressivo) =====
   Sem GSAP/ScrollTrigger, ou com prefers-reduced-motion, nada é escondido nem animado. */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add({
    desk: "(min-width:1001px) and (prefers-reduced-motion:no-preference)",
    tab: "(min-width:601px) and (max-width:1000px) and (prefers-reduced-motion:no-preference)",
    mob: "(max-width:600px) and (prefers-reduced-motion:no-preference)",
    hov: "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)"
  }, ctx => {
    try {
      const { desk, mob, hov } = ctx.conditions;
      const D = desk ? { y: 36, d: .95, s: .12 } : mob ? { y: 18, d: .7, s: .07 } : { y: 24, d: .8, s: .09 };
      const $$ = s => gsap.utils.toArray(s);
      const off = [];
      const on = (el, ev, fn) => { el.addEventListener(ev, fn); off.push(() => el.removeEventListener(ev, fn)); };
      const CLR = "opacity,transform";

      /* Revelação padrão ao rolar: dispara uma vez e devolve o elemento ao estado original do CSS */
      const R = (t, v = {}, trig) => {
        const el = $$(t); if (!el.length) return;
        gsap.from(el, { opacity: 0, y: D.y, duration: D.d, ease: "power3.out", stagger: D.s, clearProps: CLR,
          scrollTrigger: { trigger: trig || el[0], start: "top 88%", once: true }, ...v });
      };

      /* ----- Hero: timeline de entrada ----- */
      const float = () => {
        if (!desk) return;
        gsap.to(".stage .browser", { y: -6, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".stage .phone", { y: 5, duration: 5.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: .6 });
        gsap.to(".stage .phone", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      };
      gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: float })
        .from(".logo,.nav a,.bar > .btn", { y: -14, opacity: 0, duration: .7, stagger: .06, clearProps: CLR }, 0)
        .from(".hero h1", { y: D.y + 8, opacity: 0, duration: 1.1, ease: "power4.out", clearProps: CLR }, .15)
        .from(".lead", { y: D.y * .6, opacity: 0, duration: .9, clearProps: CLR }, "-=.7")
        .from(".hero .actions .btn", { y: 20, opacity: 0, duration: .7, stagger: .1, clearProps: CLR }, "-=.6")
        .from(".hint", { y: 12, opacity: 0, duration: .7, clearProps: CLR }, "-=.4")
        .from(".stage .browser", { y: 40, scale: .96, opacity: 0, duration: 1.1, ease: "power4.out", clearProps: "opacity" }, .35)
        .from(".stage .phone", { y: 50, x: -20, opacity: 0, duration: 1, clearProps: "opacity" }, .6)
        .from(".stage .demo", { opacity: 0, duration: .8, clearProps: "opacity" }, 1.1);

      /* ----- Seções ----- */
      R("#sobre .two > div:first-child > *", { stagger: .12 }, "#sobre .two");
      R("#sobre .pillars > div", { y: desk ? 0 : D.y * .6, x: desk ? 24 : 0, stagger: .1 }, ".pillars");
      R(".strip li", { y: D.y * .6 }, ".strip");

      R("#servicos h2");
      R("#servicos .card", { y: i => D.y + i * 8 }, ".cards3");
      R(".extras li", { y: D.y * .5, stagger: .1 }, ".extras");

      R("#portfolio h2,#portfolio .note", { stagger: .12 });
      $$(".pj").forEach((pj, i) => {
        const side = i === 1 && desk;
        gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: pj, start: "top 85%", once: true } })
          .from(pj, { opacity: 0, x: side ? 40 : 0, y: side ? 0 : D.y + 6, duration: D.d, clearProps: CLR })
          .fromTo(pj.querySelector(".fig"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out", clearProps: "clipPath" }, "<.1")
          .from(pj.querySelector(".pi"), { opacity: 0, y: 20, duration: .8, clearProps: CLR }, "<.2");
      });

      R("#processo h2");
      const steps = document.querySelector(".steps");
      if (steps) {
        gsap.fromTo(steps, { "--p": 0 }, { "--p": 1, ease: "none", scrollTrigger: { trigger: steps, start: "top 75%", end: "bottom 65%", scrub: .5 } });
        gsap.from(".steps span", { scale: .7, duration: .7, ease: "power3.out", stagger: D.s + .04, clearProps: "scale,transform", scrollTrigger: { trigger: steps, start: "top 88%", once: true } });
      }
      R(".steps li", { stagger: D.s + .04, y: D.y * .7 }, ".steps");

      R("#formatos h2,#formatos .note", { stagger: .12 });
      R(".rows2 > div", { y: D.y * .6, stagger: .14 }, ".rows2");

      R("#diferenciais .two > div:first-child > *", { stagger: .12 }, "#diferenciais .two");
      R(".dlist li", { y: D.y * .5, stagger: .08 }, ".dlist");

      R("#faq h2");
      R("#faq .q", { y: D.y * .5, stagger: .07 }, "#acc");

      gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: "#contato", start: "top 70%", once: true } })
        .from(".c-copy > *", { opacity: 0, y: D.y * .7, duration: D.d, stagger: .1, clearProps: CLR })
        .from(".form", { opacity: 0, y: D.y, duration: D.d, clearProps: CLR }, "<.1")
        .from(".form > *", { opacity: 0, y: 14, duration: .6, stagger: .07, clearProps: CLR }, "<.2");

      /* ----- Microinterações: botões (clique em qualquer dispositivo, elevação só com mouse) e cards ----- */
      $$(".btn").forEach(b => {
        on(b, "pointerdown", () => gsap.to(b, { scale: .97, duration: .12, overwrite: "auto" }));
        ["pointerup", "pointerleave", "pointercancel"].forEach(e => on(b, e, () => gsap.to(b, { scale: 1, duration: .3, ease: "power2.out", overwrite: "auto" })));
        if (hov) {
          on(b, "pointerenter", () => gsap.to(b, { y: -2, duration: .25, ease: "power2.out" }));
          on(b, "pointerleave", () => gsap.to(b, { y: 0, duration: .3, ease: "power2.out" }));
        }
      });
      if (hov) $$(".card").forEach(c => {
        on(c, "pointerenter", () => gsap.to(c, { y: -2, duration: .35, ease: "power2.out" }));
        on(c, "pointerleave", () => gsap.to(c, { y: 0, duration: .4, ease: "power2.out" }));
      });

      /* ----- Ganchos usados pelo script.js (menu mobile e FAQ) ----- */
      window.AppexMotion = {
        menu() { gsap.fromTo(".nav a", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .35, ease: "power2.out", stagger: .05, clearProps: CLR, overwrite: true }); },
        panel(p, close) {
          gsap.killTweensOf(p);
          if (!close) {
            p.hidden = false;
            gsap.fromTo(p, { height: 0, paddingBottom: 0, opacity: 0, overflow: "hidden" }, { height: "auto", paddingBottom: "1.2rem", opacity: 1, duration: .45, ease: "power2.out", clearProps: "height,paddingBottom,opacity,overflow", onComplete: () => ScrollTrigger.refresh() });
          } else {
            gsap.to(p, { height: 0, paddingBottom: 0, opacity: 0, overflow: "hidden", duration: .3, ease: "power2.inOut",
              onComplete() { p.hidden = true; gsap.set(p, { clearProps: "height,paddingBottom,opacity,overflow" }); ScrollTrigger.refresh(); } });
          }
        }
      };
      return () => { off.forEach(f => f()); delete window.AppexMotion; };
    } catch (err) {
      console.warn("Animações desativadas:", err);
      delete window.AppexMotion; mm.revert();
    }
  });

  /* Recalcula posições quando fontes e imagens terminam de carregar */
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  addEventListener("load", refresh);
})();
