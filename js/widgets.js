/* CarpQuest widgets: slide-content sections and their mini-games. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- icons (stroke icons, 24px grid) ---------- */
const ICONS = {
  coins: '<circle cx="9" cy="9" r="6"/><path d="M15.5 9.5a6 6 0 1 1-6 6"/><path d="M9 6v6M7 8h3.5a1.5 1.5 0 0 1 0 3H7"/>',
  microscope: '<path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  landmark: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4Z"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>',
  flask: '<path d="M10 2v7.5L4.5 19A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7M7 16h10"/>',
  dna: '<path d="M2 15c6.7-6 13.3 0 20-6M2 9c6.7 6 13.3 0 20 6"/><path d="M5 10.5v3M9 8.5v7M15 8.5v7M19 10.5v3"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h2M14 14h2M8 18h2"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/>',
  footprints: '<path d="M4 16v-2.4C4 11.5 3 10.5 3 8c0-2.7 1.5-6 4.5-6C9.4 2 10 3.8 10 5.5c0 3.1-2 5.7-2 8.7V16a2 2 0 1 1-4 0ZM20 20v-2.4c0-2.1 1-3.1 1-5.6 0-2.7-1.5-6-4.5-6C14.6 6 14 7.8 14 9.5c0 3.1 2 5.7 2 8.7V20a2 2 0 1 0 4 0Z"/>',
};
const icon = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;

/* ---------- carp drawing ---------- */
const FISH = {
  body: "M38 150 C58 103 132 70 232 68 C334 66 420 94 458 124 C466 130 472 134 478 136 L566 80 Q532 150 566 222 L478 166 C472 168 466 172 458 177 C420 207 334 234 232 232 C132 230 58 197 38 150 Z",
  dorsal: "M246 72 L298 26 Q330 30 362 78 Z",
  pect: "M178 184 Q200 218 238 218 Q218 196 204 180 Z",
  pelvic: "M290 224 Q304 254 332 256 Q322 236 316 226 Z",
  anal: "M398 207 Q414 238 442 238 Q436 208 430 197 Z",
};
let fishUid = 0;
function carpSVG(color, { sick = false, w = 600, h = 300, cls = "" } = {}) {
  const id = "f" + (++fishUid);
  const sickLayer = sick ? `
    <g clip-path="url(#${id}c)">
      <ellipse cx="80" cy="150" rx="70" ry="60" fill="#d42a1e" opacity=".55"/>
      <ellipse cx="170" cy="190" rx="30" ry="16" fill="#d42a1e" opacity=".45"/>
      ${[[250,190],[268,176],[300,200],[330,186],[352,206],[384,180],[410,196],[226,206],[440,170]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${4+((x*7)%5)}" fill="#c62828" opacity=".75"/>`).join("")}
      <ellipse cx="318" cy="128" rx="26" ry="16" fill="#7a1a14" opacity=".85"/><ellipse cx="318" cy="128" rx="16" ry="9" fill="#e0675a"/>
    </g>
    <path d="M540 92 L556 84 M542 208 L556 216" stroke="#f3efe7" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="282" cy="206" rx="70" ry="22" fill="#f1c3b5" opacity=".35"/>` : "";
  return `<svg viewBox="0 0 ${w} ${h}" class="${cls}" role="img" aria-label="Carp illustration">
    <defs>
      <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}"/><stop offset=".55" stop-color="${color}" stop-opacity=".55"/><stop offset="1" stop-color="#f4f1ea"/></linearGradient>
      <pattern id="${id}p" width="22" height="16" patternUnits="userSpaceOnUse"><path d="M0 16 Q11 2 22 16" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="1.4"/></pattern>
      <clipPath id="${id}c"><path d="${FISH.body}"/></clipPath>
    </defs>
    <path d="${FISH.dorsal}" fill="${color}" opacity=".85"/>
    <path d="${FISH.anal}" fill="${color}" opacity=".75"/>
    <path d="${FISH.pelvic}" fill="${color}" opacity=".75"/>
    <path d="${FISH.body}" fill="url(#${id}g)" stroke="${color}" stroke-width="2"/>
    <path d="${FISH.body}" fill="url(#${id}p)"/>
    ${sickLayer}
    <path d="M168 96 Q190 150 168 204" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="3"/>
    <path d="M176 150 Q320 138 470 150" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2" stroke-dasharray="4 5"/>
    <path d="${FISH.pect}" fill="${color}" opacity=".8"/>
    <circle cx="105" cy="128" r="14" fill="#fff"/><circle cx="103" cy="128" r="7" fill="#111"/><circle cx="100" cy="125" r="2.2" fill="#fff"/>
    <path d="M40 152 Q50 160 62 157" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- stat counters ---------- */
function renderStats() {
  const box = $("#bdStats");
  box.innerHTML = BD_STATS.map(s => `<div class="stat"><b data-v="${s.v}" data-suf="${esc(s.suf)}">0</b><span>${esc(s.label)}</span></div>`).join("");
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, v = +el.dataset.v, suf = el.dataset.suf, dec = v % 1 ? 1 : 0, t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 1200), ease = 1 - Math.pow(1 - k, 3);
      el.textContent = "≈" + (v * ease).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .6 });
  $$("b", box).forEach(b => io.observe(b));
}

/* ---------- carp cards ---------- */
function renderCarps() {
  $("#carpGrid").innerHTML = CARPS.map(c => `
    <button class="carp" data-id="${c.id}" aria-label="${esc(c.name)}: flip for details">
      <div class="carp-inner">
        <div class="carp-face">
          ${carpSVG(c.color)}
          <h4>${esc(c.name)}</h4><span class="bn">${esc(c.bn)}</span>
          <span class="sci">${esc(c.sci)}</span>
          <div><span class="tag">${esc(c.origin)}</span><span class="tag">${c.zone.join(" / ")}</span></div>
          <span class="flip-hint">Tap to flip ↻</span>
        </div>
        <div class="carp-face back">
          <p><b>Feeds:</b> ${esc(c.feed)}</p>
          <p><b>Did you know?</b> ${esc(c.fact)}</p>
          <p><b>Disease note:</b> ${esc(c.disease)}</p>
        </div>
      </div>
    </button>`).join("");
  $$("#carpGrid .carp").forEach(b => b.addEventListener("click", e => {
    b.classList.toggle("flipped");
    const seen = Game.flag("carpsSeen") || [];
    if (!seen.includes(b.dataset.id)) { seen.push(b.dataset.id); Game.flag("carpsSeen", seen); Game.xp(3, null, "carp-" + b.dataset.id, e); }
  }));
}

/* ---------- pond game ---------- */
function initPond() {
  const tray = $("#pondTray"), fb = $("#pondFb");
  let sel = null; const placed = {};
  const pool = CARPS.filter(c => c.id !== "kalibaus");
  tray.innerHTML = pool.map(c => `<button class="fishchip" data-id="${c.id}"><span style="color:${c.color}">●</span>${esc(c.name)}</button>`).join("");
  tray.addEventListener("click", e => {
    const b = e.target.closest(".fishchip"); if (!b || b.classList.contains("placed")) return;
    $$(".fishchip", tray).forEach(x => x.classList.remove("sel"));
    b.classList.add("sel"); sel = b.dataset.id;
    $$(".layer").forEach(l => l.classList.add("target"));
    fb.className = "feedback"; fb.textContent = "Now tap a pond layer.";
  });
  $$(".layer").forEach(l => l.addEventListener("click", e => {
    if (!sel) { fb.className = "feedback"; fb.textContent = "Pick a fish first."; return; }
    const c = CARPS.find(x => x.id === sel), zone = l.dataset.zone, chip = $(`.fishchip[data-id="${sel}"]`, tray);
    if (c.zone.includes(zone)) {
      chip.classList.remove("sel"); chip.classList.add("placed", "right");
      $(".slot", l).appendChild(chip); placed[sel] = 1;
      fb.className = "feedback ok"; fb.textContent = `✓ ${c.name}: ${c.feed}.`;
      Game.xp(8, null, "pond-" + sel, e);
    } else {
      fb.className = "feedback no"; fb.textContent = `✗ Not quite. ${c.name} isn't a ${zone} feeder. Hint: ${c.feed.split("—")[0].trim()}.`;
    }
    sel = null; $$(".layer").forEach(x => x.classList.remove("target"));
    if (Object.keys(placed).length === pool.length) {
      fb.textContent = "🎉 Perfect pond! Every layer is used, which is why polyculture gets more fish from the same water.";
      Game.badge("pond"); Game.xp(20, "Pond Architect complete", "pond-all"); Game.confetti();
    }
  }));
}

/* ---------- justification pillars ---------- */
function renderPillars() {
  const box = $("#pillars"), det = $("#pillarDetail");
  box.innerHTML = JUSTIFICATION.map(j => `<button class="pillar" data-id="${j.id}"><span class="seen"></span><div class="ic">${icon(j.icon)}</div><h4>${esc(j.title)}</h4><p>${esc(j.short)}</p></button>`).join("");
  box.addEventListener("click", e => {
    const b = e.target.closest(".pillar"); if (!b) return;
    const j = JUSTIFICATION.find(x => x.id === b.dataset.id);
    $$(".pillar", box).forEach(x => x.classList.toggle("on", x === b));
    $(".seen", b).textContent = "✓";
    det.innerHTML = `<div class="inner"><div><h3>${esc(j.title)}</h3><ul>${j.body.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
      <figure style="margin:0"><img src="${j.img}" alt="${esc(j.cap)}" loading="lazy"><figcaption>${esc(j.cap)}</figcaption></figure></div>`;
    Game.xp(10, null, "pillar-" + j.id, e);
  });
}

/* ---------- loss calculator ---------- */
function initCalc() {
  const f = [
    { k: "area", label: "Pond area (decimal)", min: 10, max: 300, step: 5, v: 66, fmt: v => v + " dec" },
    { k: "dens", label: "Stocking (fish / decimal)", min: 10, max: 80, step: 1, v: 35, fmt: v => v },
    { k: "mort", label: "Outbreak mortality", min: 0, max: 80, step: 1, v: 30, fmt: v => v + "%" },
    { k: "wt", label: "Expected harvest weight (kg/fish)", min: .3, max: 3, step: .1, v: 1.2, fmt: v => (+v).toFixed(1) + " kg" },
    { k: "price", label: "Farm-gate price (Tk/kg)", min: 120, max: 450, step: 10, v: 260, fmt: v => "৳" + v },
  ];
  const box = $("#calc");
  box.innerHTML = f.map(x => `<label>${x.label}<span id="cv-${x.k}"></span><input type="range" id="c-${x.k}" min="${x.min}" max="${x.max}" step="${x.step}" value="${x.v}"></label>`).join("") +
    `<div class="calc-out"><small>Estimated revenue lost</small><b id="cOut"></b><small id="cSub"></small></div>`;
  const upd = () => {
    const g = k => +$("#c-" + k).value;
    f.forEach(x => $("#cv-" + x.k).textContent = x.fmt(g(x.k)));
    const fish = g("area") * g("dens"), dead = Math.round(fish * g("mort") / 100), loss = dead * g("wt") * g("price");
    $("#cOut").textContent = "৳ " + Math.round(loss).toLocaleString("en-IN");
    $("#cSub").textContent = `${dead.toLocaleString("en-IN")} of ${fish.toLocaleString("en-IN")} fish lost. 1 decimal ≈ 40.5 m², and 66 decimals ≈ 1 acre.`;
  };
  let touched = false;
  box.addEventListener("input", () => { upd(); if (!touched) { touched = true; Game.badge("calc"); Game.xp(20, "Ran the loss calculator", "calc"); } });
  upd();
}

/* ---------- One Health loop ---------- */
function initOneHealth() {
  const nodes = [{ id: "fish", x: 150, y: 60, t: "Fish & ponds" }, { id: "env", x: 260, y: 240, t: "Environment" }, { id: "people", x: 40, y: 240, t: "People" }];
  const arcs = [
    { a: "fish", b: "env", d: "M188 82 Q260 130 252 200", txt: "Pond water with antibiotic residues and resistant bacteria drains into canals and rivers, where resistance genes persist in sediment." },
    { a: "env", b: "people", d: "M218 254 Q150 290 82 254", txt: "People pick up resistant bacteria through water, irrigation and contact with the environment. Resistance genes can jump between bacterial species." },
    { a: "people", b: "fish", d: "M48 200 Q50 120 112 82", txt: "Human choices close the loop: over-the-counter antibiotics given to fish without a diagnosis select for more resistance, and so do handling and eating contaminated fish." },
  ];
  const box = $("#oneHealth");
  box.className = "oh";
  box.innerHTML = `<svg viewBox="-20 0 340 300"><defs><marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker></defs>
    ${arcs.map((a, i) => `<path class="arc" data-i="${i}" d="${a.d}" marker-end="url(#ah)"/><path class="arc-hit" data-i="${i}" d="${a.d}"/>`).join("")}
    ${nodes.map(n => `<g class="node"><circle cx="${n.x}" cy="${n.y}" r="38"/><text x="${n.x}" y="${n.y + 4}">${n.t}</text></g>`).join("")}
    <text x="150" y="170" text-anchor="middle" style="font:800 15px var(--font-d);fill:var(--accent)">AMR</text></svg>
    <p class="oh-text" id="ohText">Tap an arrow to follow resistance around the loop.</p>`;
  const seen = new Set();
  $$(".arc-hit, .arc", box).forEach(p => p.addEventListener("click", e => {
    const i = +p.dataset.i; $$(".arc", box).forEach(a => a.classList.toggle("on", +a.dataset.i === i));
    $("#ohText").textContent = arcs[i].txt; seen.add(i);
    if (seen.size === 3) Game.xp(15, "Completed the One Health loop", "onehealth", e);
  }));
}

/* ---------- objectives trace ---------- */
function initTrace() {
  const methodLabels = Object.fromEntries(PIPELINE.map(p => [p.id, p.label]));
  methodLabels.survey = "Farmer survey (Activity 1)";
  const allMethods = [...new Set(OBJECTIVES.flatMap(o => o.methods))];
  $("#traceObj").innerHTML = OBJECTIVES.map(o => `<button class="tnode" data-o="${o.id}"><b>${o.code}</b>${esc(o.text)}<small>In plain words: ${esc(o.plain)}</small></button>`).join("");
  $("#traceMeth").innerHTML = allMethods.map(m => `<button class="tnode m" data-m="${m}">${esc(methodLabels[m] || m)}</button>`).join("");
  $("#traceOut").innerHTML = OUTPUTS.map(o => `<div class="tnode" data-e="${o.id}"><span style="color:var(--primary)">${icon(o.icon, 18)}</span> ${esc(o.text)}</div>`).join("");
  const tr = $("#trace"), seen = new Set();
  $("#traceObj").addEventListener("click", e => {
    const b = e.target.closest("[data-o]"); if (!b) return;
    const o = OBJECTIVES.find(x => x.id === b.dataset.o);
    const was = b.classList.contains("hl") && tr.classList.contains("active");
    $$(".tnode", tr).forEach(n => n.classList.remove("hl"));
    if (was) { tr.classList.remove("active"); return; }
    tr.classList.add("active"); b.classList.add("hl");
    o.methods.forEach(m => $(`[data-m="${m}"]`, tr)?.classList.add("hl"));
    o.outputs.forEach(x => $(`[data-e="${x}"]`, tr)?.classList.add("hl"));
    seen.add(o.id); Game.xp(8, null, "trace-" + o.id, e);
    if (seen.size === 4) Game.xp(20, "Traced every objective", "trace-all");
  });
  $("#traceMeth").addEventListener("click", e => {
    const b = e.target.closest("[data-m]"); if (!b) return;
    const id = b.dataset.m === "survey" ? null : b.dataset.m;
    if (id) { document.getElementById("lab").scrollIntoView(); setTimeout(() => Lab.openStep(id), 400); }
    else document.getElementById("survey").scrollIntoView();
  });
}

/* ---------- fish inspector ---------- */
function initInspector() {
  const stage = $("#fishStage"), panel = $("#inspectPanel");
  stage.innerHTML = carpSVG("#7a8e96", { sick: true });
  const svg = $("svg", stage);
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = HOTSPOTS.map(h => `<g class="hot" data-id="${h.id}" tabindex="0" role="button" aria-label="Inspect ${esc(h.part)}">
      ${h.id === "behav" ? `<text x="${h.x}" y="${h.y + 6}" text-anchor="middle" font-size="22">💭</text>` : ""}
      <circle class="ring" cx="${h.x}" cy="${h.y}" r="${h.r}"/></g>`).join("");
  svg.appendChild(g);
  const seen = new Set();
  const open = (id, ev) => {
    const h = HOTSPOTS.find(x => x.id === id);
    $$(".hot", svg).forEach(x => x.classList.toggle("on", x.dataset.id === id));
    $(`.hot[data-id="${id}"]`, svg).classList.add("seen");
    const dz = sid => DISEASES.filter(d => d.signs.includes(sid)).map(d => `<span class="tag">${esc(d.name.split(" (")[0])}</span>`).join("");
    panel.innerHTML = `<h3>${esc(h.part)}</h3><p>${esc(h.look)}</p>` +
      h.signs.map(s => `<div class="sign"><b>${esc(SIGNS[s].label)}</b>${esc(SIGNS[s].desc)}<div class="dz">${dz(s)}</div></div>`).join("") +
      `<p class="fine">${seen.size + (seen.has(id) ? 0 : 1)} / ${HOTSPOTS.length} regions inspected</p>`;
    if (!seen.has(id)) { seen.add(id); Game.xp(6, null, "hot-" + id, ev); }
    if (seen.size === HOTSPOTS.length) Game.badge("inspector");
  };
  $$(".hot", svg).forEach(h => {
    h.addEventListener("click", e => open(h.dataset.id, e));
    h.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(h.dataset.id); } });
  });
}

/* ---------- disease cards ---------- */
function initDiseases() {
  const types = ["All", "Bacterium", "Oomycete", "Parasite", "Virus"];
  const tcls = { Bacterium: "bac", Oomycete: "oom", Parasite: "par", Virus: "vir" };
  const fbox = $("#diseaseFilter");
  fbox.innerHTML = types.map((t, i) => `<button class="pill ${i ? "" : "on"}" data-t="${t}">${t}</button>`).join("");
  const draw = t => {
    $("#diseaseGrid").innerHTML = DISEASES.filter(d => t === "All" || d.type === t).map(d => `
      <article class="card dcard"><span class="tag ${tcls[d.type]}">${d.type}</span>
        <h4>${esc(d.name)}</h4><div class="agent">${esc(d.agent)}</div>
        <dl><dt>Also called</dt><dd>${esc(d.aka)}</dd><dt>Signs</dt><dd>${d.signs.map(s => SIGNS[s].label).join(" · ")}</dd>
        <dt>When</dt><dd>${esc(d.season)}</dd><dt>Hosts</dt><dd>${esc(d.hosts)}</dd><dt>Key insight</dt><dd>${esc(d.note)}</dd></dl>
        <p style="margin:10px 0 0"><a href="${d.link}" target="_blank" rel="noopener">Read more ↗</a></p></article>`).join("");
  };
  fbox.addEventListener("click", e => { const b = e.target.closest(".pill"); if (!b) return; $$(".pill", fbox).forEach(x => x.classList.toggle("on", x === b)); draw(b.dataset.t); });
  draw("All");
}

/* ---------- diagnosis case game ---------- */
function initCases() {
  const box = $("#caseBox");
  let i = 0; const res = [];
  const name = id => DISEASES.find(d => d.id === id).name;
  const draw = () => {
    if (i >= CASES.length) {
      const ok = res.filter(Boolean).length;
      box.innerHTML = `<div class="case result"><div class="score">${ok}/${CASES.length}</div><p>${ok >= 5 ? "Excellent diagnostic instincts, Doctor!" : "Good effort. Revisit the atlas above and try again."}</p><button class="btn primary" id="caseAgain">Play again</button></div>`;
      if (ok >= 5) Game.badge("doctor");
      $("#caseAgain").onclick = () => { i = 0; res.length = 0; draw(); };
      return;
    }
    const c = CASES[i];
    box.innerHTML = `<div class="progress-dots">${CASES.map((_, k) => `<i class="${k < i ? (res[k] ? "ok" : "no") : k === i ? "cur" : ""}"></i>`).join("")}</div>
      <div class="case"><p class="fine">Case ${i + 1} of ${CASES.length}</p><p class="story">📋 ${esc(c.story)}</p>
      <div class="opts">${c.options.map(o => `<button class="opt" data-o="${o}">${esc(name(o))}</button>`).join("")}</div><div id="caseEx"></div></div>`;
    $$(".opt", box).forEach(b => b.onclick = e => {
      const right = b.dataset.o === c.answer;
      $$(".opt", box).forEach(x => { x.disabled = true; if (x.dataset.o === c.answer) x.classList.add("right"); });
      if (!right) b.classList.add("wrong");
      res[i] = right;
      if (right) Game.xp(30, null, "case-" + i, e);
      $("#caseEx").innerHTML = `<div class="explain">${right ? "✅ Correct! " : "❌ Not this time. "}${esc(c.why)}</div><p style="margin-top:12px"><button class="btn primary small" id="caseNext">${i + 1 < CASES.length ? "Next case →" : "See score"}</button></p>`;
      $("#caseNext").onclick = () => { i++; draw(); };
    });
  };
  draw();
}

/* ---------- survey stepper ---------- */
function initStepper() {
  const box = $("#stepper");
  box.innerHTML = `<div class="steps">${SURVEY_STEPS.map(s => `<button class="step-btn" data-n="${s.n}"><span class="num">${s.n}</span>${esc(s.title)}</button>`).join("")}</div><div id="stepPanel"></div>`;
  const seen = new Set();
  const show = (n, ev) => {
    const s = SURVEY_STEPS[n - 1];
    $$(".step-btn", box).forEach(b => b.classList.toggle("on", +b.dataset.n === n));
    $(`.step-btn[data-n="${n}"]`, box).classList.add("seen");
    $("#stepPanel").innerHTML = `<div class="step-panel"><span class="big">0${n}</span><h3>${esc(s.title)}</h3><p>${esc(s.detail)}</p><div class="tip">💡 ${esc(s.tip)}</div>
      <p style="margin-top:14px">${n > 1 ? `<button class="btn small" data-go="${n - 1}">← Back</button> ` : ""}${n < 6 ? `<button class="btn primary small" data-go="${n + 1}">Next step →</button>` : ""}</p></div>`;
    if (!seen.has(n)) { seen.add(n); Game.xp(5, null, "step-" + n, ev); }
    if (seen.size === 6) Game.xp(15, "Walked the full survey method", "steps-all");
  };
  box.addEventListener("click", e => { const b = e.target.closest("[data-n],[data-go]"); if (b) show(+(b.dataset.n || b.dataset.go), e); });
  show(1);
  $("#praGrid").innerHTML = PRA_TOOLS.map(t => `<div class="card"><div class="ic">${icon(t.icon)}</div><div><h4 style="font-size:1rem">${esc(t.name)}</h4><p>${esc(t.what)}</p><p><b>Reveals:</b> ${esc(t.gives)}</p></div></div>`).join("");
}

/* ---------- questionnaire game ---------- */
function initQGame() {
  const box = $("#qGame"); let done = 0, right = 0;
  box.innerHTML = QUESTIONS_GAME.map((q, i) => `<div class="qrow" data-i="${i}"><span class="q">“${esc(q.q)}”</span>
    <span class="btns"><button class="btn small good" data-a="1">👍 Good</button><button class="btn small bad" data-a="0">🔧 Needs fixing</button></span></div>`).join("") + `<p class="feedback" id="qFb"></p>`;
  box.addEventListener("click", e => {
    const b = e.target.closest("[data-a]"); if (!b) return;
    const row = b.closest(".qrow"), q = QUESTIONS_GAME[+row.dataset.i];
    if (row.dataset.done) return; row.dataset.done = 1;
    const ok = (b.dataset.a === "1") === q.good; done++; if (ok) { right++; Game.xp(10, null, "qg-" + row.dataset.i, e); }
    $$("button", row).forEach(x => x.disabled = true);
    row.insertAdjacentHTML("beforeend", `<div class="why">${ok ? "✅" : "❌"} ${q.good ? "Good question. " : "Needs fixing. "}${esc(q.why)}</div>`);
    if (done === QUESTIONS_GAME.length) { $("#qFb").className = "feedback ok"; $("#qFb").textContent = `You judged ${right}/${done} correctly.`; Game.badge("surveyor"); }
  });
}

/* ---------- Gantt (slide 9) ---------- */
function initGantt() {
  const W = 900, rowH = 46, top = 46, left = 300, cw = (W - left - 10) / 12;
  const H = top + GANTT.length * rowH + 10;
  const color = s => `var(--s${s})`;
  $("#gantt").className = "gantt chart";
  $("#gantt").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gantt chart of project activities from July 2026 to June 2027">
    <text class="yr" x="${left}" y="14">2026</text><text class="yr" x="${left + cw * 6}" y="14">2027</text>
    <rect class="cursor" id="gCursor" x="${left}" y="22" width="${cw}" height="${H - 22}" rx="6"/>
    ${MONTHS.map((m, i) => `<text class="mlbl" data-m="${i}" x="${left + cw * i + cw / 2}" y="38">${m}</text>`).join("")}
    ${GANTT.map((g, r) => `<g data-r="${r}">
      <text class="rlbl" x="0" y="${top + r * rowH + 27}">${g.n}. ${esc(g.short)}</text>
      <rect class="bar" data-r="${r}" x="${left + cw * g.from + 2}" y="${top + r * rowH + 10}" width="${cw * (g.to - g.from + 1) - 4}" height="${rowH - 20}" fill="${color(g.slot)}"><title>${esc(g.label)}: ${MONTHS[g.from]}–${MONTHS[g.to]}</title></rect>
    </g>`).join("")}
  </svg>`;
  const range = $("#monthRange"), seen = new Set();
  const upd = (m, ev) => {
    $("#gCursor").setAttribute("x", left + cw * m);
    $$(".mlbl").forEach(t => t.classList.toggle("cur", +t.dataset.m === m));
    const active = GANTT.filter(g => m >= g.from && m <= g.to);
    $$(".gantt .bar").forEach(b => b.classList.toggle("dim", !active.includes(GANTT[+b.dataset.r])));
    $("#monthLabel").textContent = `${MONTHS[m]} ${m < 6 ? 2026 : 2027}`;
    $("#nowBox").innerHTML = active.length ? active.map(g => `<div class="act"><b><i class="sw" style="background:${color(g.slot)}"></i>${esc(g.label)}</b>${esc(g.detail)}</div>`).join("")
      : `<div class="act">No scheduled activity. Buffer month.</div>`;
    seen.add(m);
    if (seen.size === 12) { Game.badge("time"); Game.xp(25, "Scrubbed the whole year", "gantt-all", ev); }
  };
  range.addEventListener("input", e => upd(+range.value, e));
  upd(0);
}

/* ---------- videos ---------- */
function videoCard(key) {
  const v = VIDEOS[key]; if (!v) return "";
  const seen = Game.state.videos.includes(v.id);
  return `<button class="vcard ${seen ? "seen" : ""}" data-v="${key}"><div class="thumb" style="background-image:url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)"></div>
    <div class="meta"><b>${esc(v.title)}</b><small>${esc(v.channel)} · YouTube</small></div></button>`;
}
function openVideo(key) {
  const v = VIDEOS[key];
  $("#videoTitle").textContent = v.title;
  $("#videoFrame").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  $("#videoModal").classList.add("show");
  const S = Game.state;
  if (!S.videos.includes(v.id)) { S.videos.push(v.id); Game.save(); Game.xp(10, "Opened a video", "vid-" + v.id); }
  if (S.videos.length >= 3) Game.badge("watcher");
  $$(`.vcard[data-v="${key}"]`).forEach(c => c.classList.add("seen"));
}
function initVideoRows() {
  $$(".video-row").forEach(r => { r.innerHTML = r.dataset.videos.split(",").map(videoCard).join(""); });
  document.addEventListener("click", e => { const c = e.target.closest(".vcard"); if (c) openVideo(c.dataset.v); });
}
