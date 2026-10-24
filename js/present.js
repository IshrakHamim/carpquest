/* CarpQuest presentation: scaling, flowcharts, background and navigation (keys, mouse, wheel, touch). */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const W = 1600, H = 900;
  const stage = $("#stage"), viewport = $("#viewport");
  const slides = $$(".slide");

  /* fit the 1600×900 canvas into the window */
  const fit = () => stage.style.setProperty("--s", Math.min(innerWidth / W, innerHeight / H));
  addEventListener("resize", fit);
  fit();

  /* floating microbes: [symbol, x, y, width, rotation, colour] */
  const ASPECT = { rod: 120 / 60, cocci: 1, chain: 140 / 40, spiral: 140 / 40, phage: 60 / 110, virus: 1, dna: 60 / 200, petri: 1, cell: 120 / 100 };
  const MICROBES = [
    ["rod", 1330, 130, 150, -20, "#0f9488"], ["cocci", 40, 740, 120, 0, "#6d5bd0"], ["virus", 1440, 690, 130, 0, "#ee6c4d"],
    ["dna", 1520, 230, 64, 14, "#0f9488"], ["spiral", 700, 830, 170, -8, "#2f8fd6"], ["petri", 1180, 740, 150, 0, "#2fb38a"],
    ["phage", 30, 290, 70, -15, "#6d5bd0"], ["cell", 540, 730, 140, 10, "#2fb38a"], ["chain", 250, 860, 160, 5, "#e8930c"],
    ["cocci", 1010, 150, 80, 0, "#ee6c4d"], ["rod", 60, 520, 120, 70, "#2f8fd6"], ["virus", 770, 250, 70, 0, "#6d5bd0"],
    ["spiral", 1250, 430, 130, 30, "#0f9488"], ["petri", 400, 190, 100, 0, "#e8930c"], ["rod", 980, 850, 110, -30, "#6d5bd0"],
    ["cocci", 1540, 500, 70, 0, "#2fb38a"], ["phage", 1080, 560, 60, 20, "#2f8fd6"], ["dna", 640, 450, 40, -30, "#2fb38a"],
    ["cell", 1420, 30, 110, -12, "#e8930c"], ["chain", 860, 40, 120, -6, "#2f8fd6"],
  ];
  $("#microbes").innerHTML = MICROBES.map(([sym, x, y, w, r, c], i) => {
    const h = Math.round(w / ASPECT[sym]), box = $(`#m-${sym}`).getAttribute("viewBox");
    return `<div class="mb" style="left:${x}px;top:${y}px;--r:${r}deg;--d:${14 + (i * 7) % 12}s;--dl:-${((i * 3.7) % 10).toFixed(1)}s;color:${c}"><svg width="${w}" height="${h}" viewBox="${box}"><use href="#m-${sym}"/></svg></div>`;
  }).join("");

  /* ===== flowcharts ===== */
  // node: [id, x, y, kind, label, sub]; link: [from, to, busX?]
  const FLOWS = {
    survey: {
      w: 232, h: 100,
      nodes: [
        ["area", 56, 470, "field", "Selection of Study Area"],
        ["sec", 370, 290, "culture", "Secondary Data", "(report, booklet, internet materials)"],
        ["pri", 370, 600, "culture", "Primary Data", "(farmers)"],
        ["quest", 684, 520, "mol", "Questionnaire survey"],
        ["pra", 684, 690, "mol", "Participatory rural appraisal (PRA) tools"],
        ["dm", 998, 470, "field", "Data Management"],
        ["an", 1312, 470, "field", "Analysis"],
      ],
      links: [["area", "sec"], ["area", "pri"], ["pri", "quest"], ["pri", "pra"], ["sec", "dm", 957], ["quest", "dm", 957], ["pra", "dm", 957], ["dm", "an"]],
    },
    lab: {
      w: 176, h: 76,
      nodes: [
        ["sampling", 56, 413, "field", "Sample collection"],
        ["prep", 272, 413, "field", "Sample preparation"],
        ["qpcr", 488, 200, "mol", "Quantitative analysis", "(qPCR)"],
        ["pcr0", 488, 300, "mol", "Qualitative analysis", "(conventional PCR)"],
        ["media", 488, 413, "culture", "Inoculation on selective media"],
        ["subculture", 488, 545, "culture", "Single colony subculture"],
        ["identify", 488, 690, "culture", "Identification of bacterial isolates"],
        ["challenge", 704, 200, "culture", "Challenge test", "(pathogenicity confirmation)"],
        ["biochem", 704, 330, "culture", "Biochemical tests"],
        ["ast", 704, 460, "culture", "Antibiotic susceptibility test"],
        ["molid", 704, 690, "mol", "Molecular identification"],
        ["histo", 920, 200, "culture", "Histopathological analysis"],
        ["seq", 920, 625, "mol", "DNA sequencing", "(16S rRNA gene)"],
        ["pcr", 920, 750, "mol", "PCR", "(species-specific & virulence genes)"],
        ["phylo", 1136, 625, "mol", "Phylogenetic analysis", "(genetic relationship)"],
      ],
      links: [["sampling", "prep"], ["prep", "qpcr"], ["prep", "pcr0"], ["prep", "media"], ["media", "subculture"], ["subculture", "identify"],
        ["identify", "challenge"], ["identify", "biochem"], ["identify", "ast"], ["identify", "molid"], ["challenge", "histo"],
        ["molid", "seq"], ["molid", "pcr"], ["seq", "phylo"]],
    },
  };

  // elbow connector from a's right edge to b's left edge (or straight down when stacked), with rounded corners
  const connector = (a, b, w, h, bus) => {
    if (a.x === b.x) {
      const x = a.x + w / 2, y1 = a.y + h, y2 = b.y - 3;
      return { d: `M${x} ${y1} V${y2}`, tip: [x, y2, 90] };
    }
    const x1 = a.x + w, y1 = a.y + h / 2, x2 = b.x - 3, y2 = b.y + h / 2;
    if (Math.abs(y1 - y2) < 1) return { d: `M${x1} ${y1} H${x2}`, tip: [x2, y2, 0] };
    const xm = bus ?? (x1 + b.x) / 2, s = y2 > y1 ? 1 : -1;
    const r = Math.min(14, Math.abs(y2 - y1) / 2, xm - x1, x2 - xm);
    return { d: `M${x1} ${y1} H${xm - r} Q${xm} ${y1} ${xm} ${y1 + s * r} V${y2 - s * r} Q${xm} ${y2} ${xm + r} ${y2} H${x2}`, tip: [x2, y2, 0] };
  };

  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  $$("[data-flow]").forEach(box => {
    const f = FLOWS[box.dataset.flow];
    const byId = {};
    // nodes enter column by column, after the slide heading
    const cols = [...new Set(f.nodes.map(n => n[1]))].sort((p, q) => p - q);
    f.nodes.forEach(([id, x, y, kind, label, sub]) => { byId[id] = { x, y, i: 2 + cols.indexOf(x) * 1.6 + (y / H) }; });
    const linkSvg = f.links.map(([from, to, bus]) => {
      const a = byId[from], b = byId[to];
      const { d, tip: [tx, ty, rot] } = connector(a, b, f.w, f.h, bus);
      const delay = (a.i * 110 + 520) / 1000;
      return `<path class="link" pathLength="1" d="${d}" style="--d:${delay}s"/>` +
        `<path class="ah" d="M0 0 L-10 -6 L-10 6 Z" transform="translate(${tx + 3} ${ty}) rotate(${rot})" style="--d:${delay}s"/>`;
    }).join("");
    box.innerHTML = `<svg class="links" viewBox="0 0 ${W} ${H}" aria-hidden="true">${linkSvg}</svg>` +
      f.nodes.map(([id, x, y, kind, label, sub]) =>
        `<div class="node k-${kind} a zoom" style="left:${x}px;top:${y}px;width:${f.w}px;height:${f.h}px;--i:${byId[id].i.toFixed(2)}"><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</div>`
      ).join("");
  });

  /* cover: hide the researcher list until names are added in the HTML */
  const res = $("#researchers");
  if (res && !res.querySelector("li")) res.classList.add("empty");

  /* thank-you letters drop in one by one */
  const ty = $("#tyWord");
  ty.innerHTML = [...ty.textContent].map((ch, i) => ch === " " ? `<span class="sp"></span>` : `<span class="a drop" style="--i:${i + 1}" aria-hidden="true">${ch}</span>`).join("");

  /* ===== navigation ===== */
  const N = slides.length;
  const pad = n => String(n).padStart(2, "0");
  const dots = $("#dots");
  dots.innerHTML = slides.map((s, i) => `<button aria-label="Slide ${i + 1}: ${s.dataset.title}" title="${i + 1} · ${s.dataset.title}"></button>`).join("");
  const dotBtns = $$("button", dots);
  dotBtns.forEach((b, i) => b.onclick = () => go(i));

  let cur = -1;
  function go(n) {
    n = Math.max(0, Math.min(N - 1, n));
    if (n === cur) return;
    cur = n;
    slides.forEach((s, i) => {
      s.classList.toggle("on", i === n);
      s.classList.toggle("before", i < n);
      s.setAttribute("aria-hidden", i !== n);
    });
    stage.classList.toggle("on-cover", n === 0);
    stage.style.setProperty("--p", n);
    $("#pfNum").textContent = `${pad(n + 1)} / ${pad(N)}`;
    $("#pbar").style.width = ((n + 1) / N * 100) + "%";
    dotBtns.forEach((b, i) => b.classList.toggle("on", i === n));
    $("#prevBtn").disabled = n === 0;
    $("#nextBtn").disabled = n === N - 1;
    history.replaceState(null, "", "#" + (n + 1));
  }
  const next = () => go(cur + 1), prev = () => go(cur - 1);
  $("#nextBtn").onclick = next;
  $("#prevBtn").onclick = prev;

  const fullscreen = () => {
    const d = document, el = d.documentElement;
    if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };
  $("#fsBtn").onclick = fullscreen;

  document.addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) { if (k === "Enter" && e.target.closest("a,button")) return; e.preventDefault(); next(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); prev(); }
    else if (k === "Home") go(0);
    else if (k === "End") go(N - 1);
    else if (k === "f" || k === "F") fullscreen();
    else if (/^[0-9]$/.test(k)) go(k === "0" ? 9 : +k - 1);
    wake();
  });

  // mouse: left click → next, right click → previous
  viewport.addEventListener("click", e => { if (!e.target.closest("a,button")) (e.shiftKey ? prev : next)(); });
  viewport.addEventListener("contextmenu", e => { e.preventDefault(); prev(); });

  // wheel / trackpad: one slide per gesture
  let acc = 0, lastWheel = 0;
  viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheel < 650) return;
    acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(acc) > 40) { (acc > 0 ? next : prev)(); acc = 0; lastWheel = now; }
  }, { passive: false });

  // touch swipe
  let tx = 0, ty0 = 0;
  viewport.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty0 = e.touches[0].clientY; }, { passive: true });
  viewport.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { e.preventDefault(); (dx < 0 ? next : prev)(); }
  });

  // hide controls and cursor when idle
  let idleT;
  function wake() {
    document.body.classList.remove("idle");
    clearTimeout(idleT);
    idleT = setTimeout(() => document.body.classList.add("idle"), 2600);
  }
  addEventListener("mousemove", wake);
  addEventListener("touchstart", wake, { passive: true });
  setTimeout(() => $("#hint").classList.add("hide"), 4500);

  const start = parseInt(location.hash.slice(1), 10);
  go(Number.isFinite(start) ? start - 1 : 0);
  wake();
})();
