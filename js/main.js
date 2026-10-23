/* CarpQuest bootstrap: navigation, theme, section tracking, modals. */
(() => {
  /* theme */
  const root = document.documentElement;
  try { const t = localStorage.getItem("carpquest-theme"); if (t) root.dataset.theme = t; } catch (e) { /* ignore */ }
  $("#themeBtn").onclick = () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("carpquest-theme", root.dataset.theme); } catch (e) { /* ignore */ }
  };

  /* bubbles */
  const bub = $(".bubbles");
  for (let i = 0; i < 18; i++) { const b = document.createElement("i"); const s = 6 + Math.random() * 22;
    Object.assign(b.style, { left: Math.random() * 100 + "%", width: s + "px", height: s + "px", animationDuration: 8 + Math.random() * 14 + "s", animationDelay: -Math.random() * 20 + "s" }); bub.appendChild(b); }

  /* quest map + drawer */
  const MAP = [
    ["carps", "Slide 1", "Meet the carps"], ["why", "Slide 2", "Justification"], ["objectives", "Slides 3–4", "Objectives & outputs"],
    ["atlas", "Background", "Disease atlas"], ["survey", "Slides 5–7", "Farmer survey"], ["lab", "Slide 8", "Lab pipeline"],
    ["molecular", "Slide 8", "Molecular lab"], ["timeline", "Slide 9", "Work schedule"], ["graph", "All", "Knowledge graph"],
    ["flashcards", "All", "Flashcards"], ["quiz", "All", "Quiz arena"], ["library", "Slide 10 · Thank you", "Library & certificate"],
  ];
  const renderNav = () => {
    const v = Game.state.visited;
    $("#questMap").innerHTML = MAP.map(([id, n, t], i) => `<a class="island ${v.includes(id) ? "done" : ""}" href="#${id}"><span class="st"></span><span class="n">${String(i + 1).padStart(2, "0")} · ${n}</span><h4>${t}</h4></a>`).join("");
    $("#drawerList").innerHTML = SECTIONS.map(s => `<li class="${v.includes(s.id) ? "done" : ""}"><a href="#${s.id}"><span class="tick">${v.includes(s.id) ? "✓" : ""}</span>${s.label}<small>${s.slide}</small></a></li>`).join("");
  };
  const drawer = $("#drawer"), scrim = $("#scrim");
  const toggleDrawer = open => { drawer.classList.toggle("open", open); scrim.classList.toggle("show", open); };
  $("#menuBtn").onclick = () => toggleDrawer(true);
  $("#drawerClose").onclick = () => toggleDrawer(false);
  scrim.onclick = () => toggleDrawer(false);
  drawer.addEventListener("click", e => { if (e.target.closest("a")) toggleDrawer(false); });
  $("#resetBtn").onclick = () => { if (confirm("Reset all XP, badges and progress?")) Game.reset(); };

  /* modals */
  const closeModal = m => { m.classList.remove("show"); if (m.id === "videoModal") $("#videoFrame").innerHTML = ""; };
  $$(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m || e.target.closest("[data-close]")) closeModal(m); }));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { $$(".modal.show").forEach(closeModal); toggleDrawer(false); } });
  $("#badgeBtn").onclick = () => { Game.renderBadges(); $("#badgeModal").classList.add("show"); };

  /* init everything; each widget is isolated so one failure doesn't take down the page */
  const safe = (name, fn) => { try { fn(); } catch (err) { console.error("[CarpQuest] " + name + " failed:", err); } };
  safe("stats", renderStats); safe("carps", renderCarps); safe("pond", initPond);
  safe("pillars", renderPillars); safe("calc", initCalc); safe("onehealth", initOneHealth);
  safe("trace", initTrace); safe("inspector", initInspector); safe("diseases", initDiseases); safe("cases", initCases);
  safe("stepper", initStepper); safe("qgame", initQGame); safe("lab", Lab.init); safe("gantt", initGantt);
  safe("videos", initVideoRows); safe("flash", Learn.initFlash); safe("quiz", Learn.initQuiz); safe("library", Learn.initLibrary);
  safe("cert", Learn.renderCert);
  // the graph needs layout size, so start it when it first nears the viewport
  const gio = new IntersectionObserver(es => { if (es[0].isIntersecting) { gio.disconnect(); safe("graph", Learn.initGraph); } }, { rootMargin: "400px" });
  gio.observe($("#graph"));

  Game.renderHUD(); Game.renderBadges(); renderNav();
  document.addEventListener("cq:visit", renderNav);
  document.addEventListener("cq:badge", Learn.renderCert);

  /* section visits: count a section once it crosses the middle band of the viewport (works for very tall sections too) */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) Game.visit(e.target.dataset.section); }), { rootMargin: "-45% 0px -45% 0px" });
  $$("[data-section]").forEach(s => io.observe(s));

  if (!Game.state.once.includes("welcome")) setTimeout(() => Game.xp(10, "Welcome aboard, explorer! 🐟", "welcome"), 900);
})();
