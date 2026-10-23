/* CarpQuest lab & molecular simulators (slide 8). */
const Lab = (() => {
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- pipeline flowchart ---------- */
  const NW = 150, NH = 58, CW = 172, RH = 74, PAD = 14;
  const wrap = (s, n = 19) => { const out = []; let line = ""; s.split(" ").forEach(w => { if ((line + " " + w).trim().length > n) { out.push(line.trim()); line = w; } else line += " " + w; }); out.push(line.trim()); return out; };
  const pos = p => ({ x: PAD + p.col * CW, y: PAD + p.row * RH });
  const seen = new Set();

  function drawPipeline() {
    const cols = Math.max(...PIPELINE.map(p => p.col)) + 1, rows = Math.max(...PIPELINE.map(p => p.row)) + 1;
    const W = PAD * 2 + (cols - 1) * CW + NW, H = PAD * 2 + (rows - 1) * RH + NH;
    const by = Object.fromEntries(PIPELINE.map(p => [p.id, p]));
    const links = PIPE_LINKS.map(([a, b]) => {
      const A = pos(by[a]), B = pos(by[b]);
      const x1 = A.x + NW, y1 = A.y + NH / 2, x2 = B.x, y2 = B.y + NH / 2, mx = (x1 + x2) / 2;
      return `<path class="plink" d="M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2 - 4} ${y2}" marker-end="url(#parr)"/>`;
    }).join("");
    const nodes = PIPELINE.map(p => {
      const { x, y } = pos(p), lines = wrap(p.label);
      const ty = y + NH / 2 - (lines.length - 1) * 8 + 4;
      return `<g class="pnode ${p.lane}" data-id="${p.id}" tabindex="0" role="button" aria-label="${esc(p.label)}">
        <rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="12"/>
        ${lines.map((l, i) => `<text x="${x + NW / 2}" y="${ty + i * 16}" text-anchor="middle">${esc(l)}</text>`).join("")}
        <text class="chk" x="${x + NW - 10}" y="${y + 15}" text-anchor="middle"></text></g>`;
    }).join("");
    $("#pipeline").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Activity 2 laboratory workflow">
      <defs><marker id="parr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>${links}${nodes}</svg>`;
    $$("#pipeline .pnode").forEach(n => {
      n.addEventListener("click", e => openStep(n.dataset.id, e));
      n.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openStep(n.dataset.id); } });
    });
  }

  function openStep(id, ev) {
    const p = PIPELINE.find(x => x.id === id); if (!p) return;
    $$("#pipeline .pnode").forEach(n => n.classList.toggle("on", n.dataset.id === id));
    const node = $(`#pipeline .pnode[data-id="${id}"] .chk`); if (node) node.textContent = "✓";
    $("#pipeDetail").innerHTML = `<div class="inner"><h3>${esc(p.label)}</h3>
      <div><h5>What</h5><p>${esc(p.what)}</p></div><div><h5>Why</h5><p>${esc(p.why)}</p></div><div><h5>How</h5><p>${esc(p.how)}</p></div>
      ${p.video ? `<div class="vid-slot video-row" style="margin:0">${videoCard(p.video)}</div>` : ""}</div>
      <p class="pipe-hint">${seen.size + (seen.has(id) ? 0 : 1)} / ${PIPELINE.length} steps explored</p>`;
    if (!seen.has(id)) { seen.add(id); Game.xp(5, null, "pipe-" + id, ev); }
    if (seen.size === PIPELINE.length) Game.badge("pipeline");
  }

  /* ---------- selective media ---------- */
  function plateSVG(m) {
    const col = [];
    let seed = m.id.length * 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < 34; i++) {
      const a = rnd() * Math.PI * 2, r = 20 + rnd() * 62, x = 110 + Math.cos(a) * r, y = 110 + Math.sin(a) * r, s = 3 + rnd() * 5;
      if (m.id === "shieh") col.push(`<path d="M${x} ${y} ${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const t = k * Math.PI / 4; return `L${x + Math.cos(t) * s * 1.8} ${y + Math.sin(t) * s * 1.8} L${x + Math.cos(t + .4) * s * .6} ${y + Math.sin(t + .4) * s * .6}`; }).join(" ")}Z" fill="${m.colony}" opacity=".9"/>`);
      else if (m.id === "ss") col.push(`<circle cx="${x}" cy="${y}" r="${s}" fill="#f5efe6"/><circle cx="${x}" cy="${y}" r="${s * .45}" fill="#1b1b1b"/>`);
      else if (m.id === "pse") col.push(`<circle cx="${x}" cy="${y}" r="${s}" fill="${m.colony}" filter="url(#uvglow)"/>`);
      else col.push(`<circle cx="${x}" cy="${y}" r="${s}" fill="${m.colony}" stroke="rgba(0,0,0,.15)"/>`);
    }
    return `<svg viewBox="0 0 220 220" role="img" aria-label="${esc(m.name)} plate">
      <defs><filter id="uvglow"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <circle cx="110" cy="110" r="104" fill="none" stroke="var(--line)" stroke-width="5"/>
      <circle cx="110" cy="110" r="98" fill="${m.bg}"/>${col.join("")}
      <ellipse cx="80" cy="60" rx="30" ry="10" fill="#fff" opacity=".18" transform="rotate(-30 80 60)"/></svg>`;
  }
  function initMedia() {
    const box = $("#mediaSim");
    box.innerHTML = `<div class="media-list">${MEDIA.map((m, i) => `<button class="media-btn ${i ? "" : "on"}" data-id="${m.id}"><b>${esc(m.name)}</b><small>Targets: ${esc(m.target)}</small></button>`).join("")}</div><div class="plate" id="plate"></div>`;
    const show = id => { const m = MEDIA.find(x => x.id === id); $("#plate").innerHTML = plateSVG(m) + `<p>${esc(m.look)}</p>`; };
    const seenM = new Set(["rs"]);
    box.addEventListener("click", e => { const b = e.target.closest(".media-btn"); if (!b) return; $$(".media-btn", box).forEach(x => x.classList.toggle("on", x === b)); show(b.dataset.id); seenM.add(b.dataset.id); if (seenM.size === MEDIA.length) Game.xp(15, "Explored every medium", "media-all", e); });
    show("rs");
  }

  /* ---------- mystery isolate ---------- */
  function initBio() {
    const box = $("#bioGame"); let org, used, solved = Game.flag("bioSolved") || 0;
    const round = () => {
      org = ORGANISMS[Math.floor(Math.random() * ORGANISMS.length)]; used = new Set();
      box.innerHTML = `<div class="bio"><div><p class="credits">Tests run: <b id="bioUsed">0</b> · Isolates identified: <b id="bioSolved">${solved}</b>/3</p>
        <div class="tests">${BIOTESTS.map(t => `<button class="test" data-t="${t.id}"><b>${esc(t.name)}</b><span class="res">tap to run</span></button>`).join("")}</div></div>
        <div><h4 style="font-family:var(--font-b);font-size:1rem">Your identification</h4><div class="opts" style="grid-template-columns:1fr">${ORGANISMS.map(o => `<button class="opt" data-o="${o.id}"><i>${esc(o.name)}</i></button>`).join("")}</div><div id="bioFb"></div></div></div>`;
      $$(".test", box).forEach(b => b.onclick = () => {
        if (b.classList.contains("done")) return;
        const t = BIOTESTS.find(x => x.id === b.dataset.t), v = org.p[t.id];
        b.classList.add("done", v ? "pos" : "neg"); $(".res", b).textContent = v ? t.pos : t.neg;
        used.add(t.id); $("#bioUsed").textContent = used.size;
      });
      $$(".opt", box).forEach(b => b.onclick = e => {
        if (!used.size) { $("#bioFb").innerHTML = `<div class="explain">Run at least one test first. Real microbiologists don't guess!</div>`; return; }
        const ok = b.dataset.o === org.id;
        $$(".opt", box).forEach(x => { x.disabled = true; if (x.dataset.o === org.id) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        const prof = BIOTESTS.map(t => `${t.name}: ${org.p[t.id] ? t.pos : t.neg}`).join(" · ");
        if (ok) { const gain = Math.max(10, 40 - 5 * Math.max(0, used.size - 2)); Game.xp(gain, `Identified <i>${org.name}</i> with ${used.size} tests`, null, e); solved++; Game.flag("bioSolved", solved); if (solved >= 3) Game.badge("hunter"); }
        $("#bioFb").innerHTML = `<div class="explain">${ok ? "✅ Correct!" : `❌ It was <i>${esc(org.name)}</i>.`}<br><span class="fine">Full profile: ${esc(prof)}</span></div><p style="margin-top:10px"><button class="btn primary small" id="bioNext">New isolate →</button></p>`;
        $("#bioNext").onclick = round;
      });
    };
    round();
  }

  /* ---------- AST plate ---------- */
  function initAST() {
    const box = $("#astGame"), R = 140, C = 160, scale = R / 45; // 90 mm plate
    const pts = AST_DISCS.map((d, i) => { const a = -Math.PI / 2 + i * (Math.PI * 2 / AST_DISCS.length), r = i === AST_DISCS.length ? 0 : 82; return { ...d, x: C + Math.cos(a) * r, y: C + Math.sin(a) * r }; });
    const truth = d => d.zone >= d.s ? "S" : d.zone <= d.r ? "R" : "I";
    box.innerHTML = `<div class="ast"><div><svg viewBox="0 0 320 320" role="img" aria-label="Antibiotic susceptibility plate">
      <circle cx="${C}" cy="${C}" r="${R + 6}" fill="none" stroke="var(--line)" stroke-width="5"/>
      <circle cx="${C}" cy="${C}" r="${R}" fill="#c9b46a"/>
      <circle cx="${C}" cy="${C}" r="${R}" fill="url(#lawn)"/>
      <defs><pattern id="lawn" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" stroke="#a8934c" stroke-width="1"/></pattern></defs>
      ${pts.map((d, i) => `<g class="dg" data-i="${i}"><circle cx="${d.x}" cy="${d.y}" r="${d.zone / 2 * scale}" fill="#2e2a1f" opacity=".85"/>
        <circle class="disc" cx="${d.x}" cy="${d.y}" r="${3 * scale}" fill="#f6f1df" stroke="#d8cfae"/>
        <text x="${d.x}" y="${d.y + 3}" text-anchor="middle" style="font:700 7px var(--font-m);fill:#5b4a1d">${d.code}</text></g>`).join("")}
      </svg><p class="ast-note">Simulated <i>Aeromonas</i> lawn on Mueller–Hinton agar (90 mm). Dark rings are zones of inhibition, drawn to scale.</p></div>
      <div><table><thead><tr><th>Disc</th><th>Zone</th><th>S ≥</th><th>R ≤</th><th>Your call</th></tr></thead><tbody>
      ${pts.map((d, i) => `<tr data-i="${i}"><td>${esc(d.name)}</td><td class="mm">${d.zone} mm</td><td class="mm">${d.s}</td><td class="mm">${d.r}</td>
        <td><div class="sir">${["S", "I", "R"].map(k => `<button data-k="${k}">${k}</button>`).join("")}</div></td></tr>`).join("")}
      </tbody></table>
      <p style="margin-top:12px"><button class="btn primary small" id="astCheck">Check my reading</button></p><div id="astFb"></div></div></div>`;
    const calls = {};
    $$("tbody tr", box).forEach(tr => {
      const i = +tr.dataset.i;
      $$(".sir button", tr).forEach(b => b.onclick = () => { if (box.dataset.locked) return; $$(".sir button", tr).forEach(x => x.classList.toggle("on", x === b)); calls[i] = b.dataset.k; });
      tr.addEventListener("mouseenter", () => $(`.dg[data-i="${i}"]`, box).classList.add("disc-hl"));
      tr.addEventListener("mouseleave", () => $(`.dg[data-i="${i}"]`, box).classList.remove("disc-hl"));
    });
    $("#astCheck").onclick = e => {
      if (Object.keys(calls).length < pts.length) { $("#astFb").innerHTML = `<div class="explain">Classify every disc first.</div>`; return; }
      box.dataset.locked = 1; let right = 0;
      $$("tbody tr", box).forEach(tr => { const i = +tr.dataset.i, t = truth(pts[i]);
        $$(".sir button", tr).forEach(b => { b.classList.remove("on"); if (b.dataset.k === t) b.classList.add("right"); else if (b.dataset.k === calls[i]) b.classList.add("wrong"); });
        if (calls[i] === t) right++; });
      const nR = pts.filter(d => truth(d) === "R").length;
      $("#astFb").innerHTML = `<div class="explain">${right}/${pts.length} correct. ${pts.map(d => `<br>• <b>${d.code}</b>: ${esc(d.note)}`).join("")}</div>
        <div class="mar"><b>Now calculate the MAR index</b> = resistant ÷ tested (count intermediate as not resistant).<br>
        <input id="marIn" inputmode="decimal" placeholder="0.00" aria-label="MAR index"> <button class="btn small primary" id="marBtn">Submit</button><div id="marFb" class="feedback"></div></div>`;
      if (right === pts.length) Game.xp(30, "Perfect plate reading", "ast-perfect", e);
      $("#marBtn").onclick = ev => {
        const v = parseFloat(($("#marIn").value || "").replace(",", ".")), ans = nR / pts.length;
        const fb = $("#marFb");
        if (Math.abs(v - ans) < 0.02) { fb.className = "feedback ok"; fb.textContent = `✓ MAR = ${nR}/${pts.length} = ${ans.toFixed(2)}. That's above 0.2, so this isolate likely comes from a farm with heavy antibiotic exposure.`; Game.badge("ast"); Game.xp(20, "MAR index nailed", "mar", ev); }
        else { fb.className = "feedback no"; fb.textContent = `Not quite. Count the R results (there are ${nR}) and divide by ${pts.length}.`; }
      };
    };
  }

  /* ---------- Koch + histology ---------- */
  function initKochHisto() {
    const K = [
      ["The microbe is found in every diseased fish", "In this project: the same bacterium is isolated from kidney or lesions of sick carps across farms."],
      ["It is isolated and grown in pure culture", "Selective media, then single-colony subculture: the pure isolate."],
      ["The pure culture causes the disease in healthy fish", "Challenge test: healthy, acclimatised carps get an intraperitoneal injection of a known CFU dose. Controls get sterile PBS. Signs and mortality are recorded for 7–14 days."],
      ["The same microbe is re-isolated from the experimentally infected fish", "Re-isolation plus biochemical and PCR confirmation closes the loop and proves causation. Experiments follow animal-ethics rules (humane endpoints, minimum numbers)."],
    ];
    $("#koch").innerHTML = K.map(k => `<li><b>${esc(k[0])}</b><small>${esc(k[1])}</small></li>`).join("");
    const opened = new Set();
    $$("#koch li").forEach((li, i) => li.onclick = e => { li.classList.toggle("open"); opened.add(i); if (opened.size === 4) Game.xp(15, "Mastered Koch's postulates", "koch", e); });

    const H = [
      ["Fixation", "Tissues (gill, liver, kidney, spleen, skin and muscle at the lesion edge) go into 10% neutral buffered formalin straight away, at about 10× the tissue volume. This stops decay."],
      ["Dehydration", "Graded alcohols (70 → 100% ethanol) remove the water."],
      ["Clearing", "Xylene replaces the alcohol so that paraffin wax can soak in."],
      ["Embedding", "Tissue is set in a block of molten paraffin wax."],
      ["Sectioning", "A microtome cuts ribbons about 5 µm thick, which are floated onto glass slides."],
      ["H&E staining", "Haematoxylin stains nuclei blue-purple and eosin stains cytoplasm pink. Special stains such as Grocott show the fungal-like hyphae in EUS."],
      ["Microscopy", "The pathologist scores the lesions and links them to the pathogen found in culture."],
    ];
    $("#histo").innerHTML = `<div class="histo-steps">${H.map((h, i) => `<button class="hstep ${i ? "" : "on"}" data-i="${i}">${i + 1}. ${h[0]}</button>`).join("")}</div>
      <div class="histo-desc" id="histoDesc"></div>
      <div class="lesions"><b>What lesions look like:</b> gills show lamellar fusion and hyperplasia; liver shows vacuolation and necrosis; kidney shows tubular degeneration and more melanomacrophage centres; muscle in EUS shows granulomas around hyphae.</div>`;
    const seenH = new Set();
    const show = (i, e) => { $$(".hstep").forEach(b => b.classList.toggle("on", +b.dataset.i === i)); $("#histoDesc").innerHTML = `<b>${H[i][0]}</b><br>${esc(H[i][1])}`; seenH.add(i); if (seenH.size === H.length) Game.xp(15, "Built a histology slide", "histo", e); };
    $("#histo").addEventListener("click", e => { const b = e.target.closest(".hstep"); if (b) show(+b.dataset.i, e); });
    show(0);
  }

  /* ---------- qPCR simulator ---------- */
  function initQPCR() {
    const box = $("#qpcrSim");
    const W = 580, H = 320, m = { l: 46, r: 96, t: 14, b: 38 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    const THR = 0.1, S = 1.6, cyc = 40;
    const ctOf = n0 => 38 - 3.32 * Math.log10(n0);
    const F = (c, ct) => 1 / (1 + Math.exp(-(c - (ct + S * Math.log(9))) / S));
    const x = c => m.l + (c / cyc) * iw, y = f => m.t + ih - (f / 1.05) * ih;
    const path = ct => { let d = ""; for (let c = 0; c <= cyc; c += .25) d += (c ? "L" : "M") + x(c).toFixed(1) + " " + y(F(c, ct)).toFixed(1); return d; };
    const unknownN = Math.round(Math.pow(10, 2.5 + Math.random() * 3)), unknownCt = ctOf(unknownN);
    const stds = [1e6, 1e4, 1e2];
    box.innerHTML = `<div class="qpcr"><div class="chart" id="qChart"><div class="tooltip" id="qTip"></div></div>
      <div class="ctrl"><label>Starting copies of target DNA <output id="n0Out"></output><input type="range" id="n0" min="1" max="8" step=".1" value="5"></label>
      <p style="font-size:.9rem">Your sample's Ct: <b id="ctOut" style="font-family:var(--font-m);color:var(--violet)"></b>. Fewer starting copies means a later Ct.</p>
      <div class="copies">After <b id="cycOut" style="display:inline;font-size:1rem">20</b> cycles you'd have<b id="copyOut"></b><input type="range" id="cyc" min="0" max="40" value="20" aria-label="Cycles"></div>
      <div class="ct-q"><b>Challenge:</b> read the Ct of the dashed <span style="color:var(--s2);font-weight:700">Unknown</span> curve (the cycle where it crosses the red threshold).<br>
      <input id="ctIn" inputmode="decimal" placeholder="Ct" aria-label="Your Ct reading"> <button class="btn small primary" id="ctBtn">Check</button><div class="feedback" id="ctFb"></div></div></div></div>`;
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", "qPCR amplification curves");
    $("#qChart").prepend(svg);
    const draw = () => {
      const n0 = Math.pow(10, +$("#n0").value), ct = ctOf(n0);
      $("#ctOut").textContent = ct.toFixed(1);
      $("#n0Out").textContent = n0 >= 1e4 ? n0.toExponential(1).replace(/e\+(\d+)/, (_, n) => "×10" + [...n].map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("")) : Math.round(n0).toLocaleString();
      let g = "";
      for (let c = 0; c <= cyc; c += 5) g += `<line x1="${x(c)}" x2="${x(c)}" y1="${m.t}" y2="${m.t + ih}"/>`;
      let ax = `<line x1="${m.l}" x2="${m.l + iw}" y1="${m.t + ih}" y2="${m.t + ih}"/>` +
        [0, 5, 10, 15, 20, 25, 30, 35, 40].map(c => `<text x="${x(c)}" y="${m.t + ih + 16}" text-anchor="middle">${c}</text>`).join("") +
        `<text x="${m.l + iw / 2}" y="${H - 4}" text-anchor="middle">Cycle number</text>` +
        [0, .25, .5, .75, 1].map(f => `<text x="${m.l - 8}" y="${y(f) + 4}" text-anchor="end">${f.toFixed(2)}</text>`).join("") +
        `<text transform="translate(12 ${m.t + ih / 2}) rotate(-90)" text-anchor="middle">Fluorescence (ΔRn)</text>`;
      const key = (i, col, txt, dash) => `<line x1="${x(cyc) + 6}" x2="${x(cyc) + 20}" y1="${y(1) + i * 15}" y2="${y(1) + i * 15}" stroke="${col}" stroke-width="3" ${dash ? 'stroke-dasharray="4 3"' : ""}/><text class="lbl" x="${x(cyc) + 24}" y="${y(1) + 4 + i * 15}">${txt}</text>`;
      const std = stds.map((s, i) => `<path class="curve" d="${path(ctOf(s))}" stroke="var(--s${[1, 3, 4][i]})" opacity=".55"/>` + key(i, `var(--s${[1, 3, 4][i]})`, ["10⁶ std", "10⁴ std", "10² std"][i])).join("");
      svg.innerHTML = `<g class="grid">${g}</g><g class="axis">${ax}</g>
        <line class="thr" x1="${m.l}" x2="${m.l + iw}" y1="${y(THR)}" y2="${y(THR)}"/><text class="lbl" x="${m.l + 4}" y="${y(THR) - 6}" fill="var(--accent)">threshold</text>
        ${std}
        <path class="curve" d="${path(unknownCt)}" stroke="var(--s2)" stroke-dasharray="6 4"/>${key(3, "var(--s2)", "Unknown", true)}${key(4, "var(--s5)", "Your sample")}
        <path class="curve" d="${path(ct)}" stroke="var(--s5)" stroke-width="3.5"/>
        <line class="ctline" x1="${x(ct)}" x2="${x(ct)}" y1="${y(THR)}" y2="${m.t + ih}"/>
        <line class="hover-line" id="qHover" y1="${m.t}" y2="${m.t + ih}" style="opacity:0"/>
        <rect x="${m.l}" y="${m.t}" width="${iw}" height="${ih}" fill="transparent" id="qHit"/>`;
      const tip = $("#qTip");
      $("#qHit").addEventListener("mousemove", ev => {
        const r = svg.getBoundingClientRect(), px = (ev.clientX - r.left) * (W / r.width), c = Math.max(0, Math.min(cyc, ((px - m.l) / iw) * cyc));
        const hl = $("#qHover"); hl.setAttribute("x1", x(c)); hl.setAttribute("x2", x(c)); hl.style.opacity = 1;
        tip.style.opacity = 1; tip.style.left = (ev.clientX - r.left + 12) + "px"; tip.style.top = (ev.clientY - r.top - 30) + "px";
        tip.innerHTML = `Cycle ${c.toFixed(1)} · your sample ΔRn ${F(c, ct).toFixed(2)} · unknown ${F(c, unknownCt).toFixed(2)}`;
      });
      $("#qHit").addEventListener("mouseleave", () => { tip.style.opacity = 0; $("#qHover").style.opacity = 0; });
      drawCopies();
    };
    const drawCopies = () => {
      const n0 = Math.pow(10, +$("#n0").value), c = +$("#cyc").value, raw = n0 * Math.pow(2, c), cap = 1e12;
      $("#cycOut").textContent = c;
      $("#copyOut").textContent = (raw > cap ? "≈1×10^12 (plateau: reagents used up)" : raw >= 1e4 ? raw.toExponential(2).replace(/e\+(\d+)/, (_, n) => "×10" + [...n].map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("")) : Math.round(raw).toLocaleString()) + " copies";
    };
    let moved = false;
    $("#n0").addEventListener("input", e => { draw(); if (!moved) { moved = true; Game.xp(10, null, "qpcr-move", e); } });
    $("#cyc").addEventListener("input", drawCopies);
    $("#ctBtn").onclick = e => {
      const v = parseFloat(($("#ctIn").value || "").replace(",", ".")), fb = $("#ctFb");
      if (Math.abs(v - unknownCt) <= 1) {
        fb.className = "feedback ok"; fb.innerHTML = `✓ Ct ≈ ${unknownCt.toFixed(1)}. Using the standard curve, that's about ${unknownN.toLocaleString()} starting copies. Each 3.3-cycle step is a 10-fold difference.`;
        Game.badge("pcr"); Game.xp(30, "Read a Ct like a pro", "ct-read", e);
      } else { fb.className = "feedback no"; fb.textContent = "Not quite. Find where the dashed line crosses the red threshold (±1 cycle allowed). Hover the chart to help."; }
    };
    draw();
  }

  /* ---------- virulence gel ---------- */
  function initGel() {
    const iso = ["BD-01", "BD-02", "BD-03", "BD-04", "BD-05", "BD-06"];
    const carry = { aerA: [1, 1, 0, 1, 0, 1], hlyA: [1, 0, 1, 1, 0, 0], act: [1, 1, 0, 0, 0, 1], ser: [1, 1, 1, 0, 1, 1], fla: [1, 1, 1, 1, 0, 1] };
    const decoys = { aerA: { 4: 900 }, hlyA: { 1: "dimer" }, act: { 3: "dimer", 4: "dimer" }, ser: {}, fla: { 4: 1200 } };
    const genes = Object.keys(carry).map(id => GENES.find(g => g.id === id));
    const lanes = ["Ladder", ...iso, "+C", "NTC"], LW = 46, W = 40 + lanes.length * LW, H = 330, top = 40;
    const ladder = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500];
    const yb = bp => top + 20 + (Math.log10(3000) - Math.log10(bp)) / (Math.log10(3000) - Math.log10(50)) * (H - top - 40);
    const box = $("#gelGame"); const scored = Game.flag("gelScored") || {};
    box.innerHTML = `<div class="gel"><div><div class="gene-pick" id="genePick">${genes.map((g, i) => `<button class="pill ${i ? "" : "on"}" data-g="${g.id}"><i>${g.name}</i>${scored[g.id] ? " ✓" : ""}</button>`).join("")}</div><div id="gelSvg"></div></div>
      <div><div id="gelInfo"></div><p><button class="btn primary small" id="gelCheck">Check my calls</button></p><div id="gelFb"></div><div id="gelProfile"></div></div></div>`;
    let gene = genes[0].id, picks = new Set();
    const draw = () => {
      const g = GENES.find(x => x.id === gene); picks = new Set();
      const band = (lx, bp, w = 30) => `<rect class="band" x="${lx - w / 2}" y="${yb(bp) - 3}" width="${w}" height="6" rx="2"/>`;
      let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Agarose gel for ${g.name}"><defs><filter id="glow"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
      lanes.forEach((l, i) => {
        const cx = 40 + i * LW + LW / 2;
        s += `<rect x="${cx - 16}" y="${top}" width="32" height="7" fill="#2a3242" rx="1"/><text class="lane-lbl" x="${cx}" y="${top - 10}">${l}</text>`;
        if (i === 0) { ladder.forEach(bp => s += `<rect class="ladder" x="${cx - 15}" y="${yb(bp) - 1.5}" width="30" height="3"/><text class="bp" x="${cx - 19}" y="${yb(bp) + 3}">${bp}</text>`); return; }
        const k = i - 1;
        if (l === "+C") s += band(cx, g.bp);
        else if (l !== "NTC") {
          if (carry[gene][k]) s += band(cx, g.bp);
          const d = decoys[gene][k];
          if (d === "dimer") s += `<rect class="band" x="${cx - 14}" y="${yb(55) - 4}" width="28" height="8" rx="4" opacity=".45"/>`;
          else if (d) s += band(cx, d, 26);
          s += `<rect class="lane-hit" data-k="${k}" x="${cx - LW / 2 + 2}" y="${top - 26}" width="${LW - 4}" height="${H - top + 20}" rx="8"/>`;
        }
      });
      s += `<line x1="40" x2="${W - 6}" y1="${yb(g.bp)}" y2="${yb(g.bp)}" stroke="#ffc233" stroke-dasharray="3 5" opacity=".45"/><text class="bp" x="${W - 6}" y="${yb(g.bp) - 5}" style="fill:#ffc233">${g.bp} bp target</text></svg>`;
      $("#gelSvg").innerHTML = s;
      $("#gelInfo").innerHTML = `<h4 style="font-family:var(--font-b);font-size:1rem"><i>${g.name}</i>: ${esc(g.product)}</h4><p style="font-size:.9rem">${esc(g.fn)}</p><p class="fine">Expected amplicon: <b>${g.bp} bp</b>. Watch out for primer-dimers (fuzzy blobs below 100 bp) and non-specific bands at the wrong size. Neither counts as positive.</p>`;
      $("#gelFb").innerHTML = "";
      $$(".lane-hit", box).forEach(h => h.onclick = () => {
        const k = +h.dataset.k; if (picks.has(k)) { picks.delete(k); h.classList.remove("lane-sel"); } else { picks.add(k); h.classList.add("lane-sel"); }
      });
    };
    $("#genePick").addEventListener("click", e => { const b = e.target.closest(".pill"); if (!b) return; $$(".pill", $("#genePick")).forEach(x => x.classList.toggle("on", x === b)); gene = b.dataset.g; draw(); });
    $("#gelCheck").onclick = e => {
      const truth = carry[gene].map((v, k) => v ? k : -1).filter(k => k >= 0);
      const ok = truth.length === picks.size && truth.every(k => picks.has(k));
      $("#gelFb").innerHTML = ok ? `<div class="explain">✅ Spot on! Positive: ${truth.map(k => iso[k]).join(", ")}.</div>`
        : `<div class="explain">❌ Not quite. True positives: ${truth.map(k => iso[k]).join(", ") || "none"}. Check the band height against the yellow target line.</div>`;
      if (ok && !scored[gene]) { scored[gene] = 1; Game.flag("gelScored", scored); Game.xp(15, `Scored the <i>${gene}</i> gel`, "gel-" + gene, e); $(`#genePick [data-g="${gene}"]`).innerHTML = `<i>${gene}</i> ✓`; Game.badge("gel"); }
      if (Object.keys(scored).length === genes.length) profile();
    };
    const profile = () => {
      $("#gelProfile").innerHTML = `<h4 style="font-family:var(--font-b);font-size:1rem;margin-top:14px">Virulence gene profile (Objective iv output)</h4>
        <table class="profile"><thead><tr><th>Isolate</th>${genes.map(g => `<th><i>${g.name}</i></th>`).join("")}<th>Total</th></tr></thead><tbody>
        ${iso.map((n, k) => { const row = genes.map(g => carry[g.id][k]); return `<tr><td>${n}</td>${row.map(v => `<td>${v ? "●" : "○"}</td>`).join("")}<td><b>${row.reduce((a, b) => a + b, 0)}</b></td></tr>`; }).join("")}</tbody></table>
        <p class="fine">BD-01 carries all five genes, so it's a candidate for the challenge test. Remember that a gene being present doesn't prove it's expressed.</p>`;
    };
    if (Object.keys(scored).length === genes.length) profile();
    draw();
  }

  /* ---------- BLAST identity ---------- */
  function initBlast() {
    const box = $("#blast");
    const ref = "AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGAGCGG";
    box.innerHTML = `<p style="font-size:.92rem">After sequencing, BLAST compares your 16S read with GenBank. Slide the <b>% identity</b> of the best hit:</p>
      <input type="range" id="idR" min="90" max="100" step=".1" value="99.4" aria-label="Percent identity">
      <div class="blast-meter"><i id="idMark"></i></div><div class="blast-scale"><span>90%</span><span>94.5% genus</span><span>98.7% species</span><span>100%</span></div>
      <div class="seqbox" id="seqBox"></div><div class="blast-out" id="blastOut"></div>`;
    let moved = false;
    const upd = e => {
      const v = +$("#idR").value, n = ref.length, mism = Math.round((100 - v) / 100 * n);
      $("#idMark").style.left = ((v - 90) / 10 * 100) + "%";
      const idx = new Set(); for (let k = 0; k < mism; k++) idx.add((k * 17 + 5) % n);
      const swap = { A: "G", G: "A", C: "T", T: "C" };
      const q = [...ref].map((c, i) => idx.has(i) ? `<span class="mm">${swap[c]}</span>` : c).join("");
      $("#seqBox").innerHTML = `Ref   ${ref}\nQuery ${q}\n      ${mism} mismatch${mism === 1 ? "" : "es"} in ${n} bp shown`;
      let msg, bg;
      if (v >= 98.7) { msg = `<b>≥98.7%: same species likely.</b> For <i>Aeromonas</i>, though, several species share near-identical 16S, so confirm with <i>gyrB</i> or <i>rpoD</i> sequencing.`; bg = "var(--good-soft)"; }
      else if (v >= 94.5) { msg = `<b>94.5–98.7%: same genus, species uncertain.</b> It could be a different species, or a poor-quality read. Check the chromatogram.`; bg = "var(--gold-soft)"; }
      else { msg = `<b>Below 94.5%: probably a different genus,</b> or even a novel organism. Re-check for contamination before getting excited.`; bg = "var(--bad-soft)"; }
      $("#blastOut").innerHTML = msg; $("#blastOut").style.background = bg;
      if (e && !moved) { moved = true; Game.xp(10, null, "blast", e); }
    };
    $("#idR").addEventListener("input", upd); upd();
  }

  /* ---------- virulence arsenal ---------- */
  function initArsenal() {
    const box = $("#arsenal");
    box.innerHTML = `<div class="arsenal">${GENES.map(g => `<button class="gene" data-g="${g.id}">${g.name}</button>`).join("")}</div><div class="gene-info" id="geneInfo"><span class="muted">Tap a gene.</span></div>`;
    const seenG = new Set();
    box.addEventListener("click", e => {
      const b = e.target.closest(".gene"); if (!b) return;
      const g = GENES.find(x => x.id === b.dataset.g);
      $$(".gene", box).forEach(x => x.classList.toggle("on", x === b));
      $("#geneInfo").innerHTML = `<span class="tag">${esc(g.cls)}</span><h4 style="font-family:var(--font-b);font-size:1rem;margin:6px 0"><i>${esc(g.name)}</i>: ${esc(g.product)}</h4>${esc(g.fn)}`;
      seenG.add(g.id); if (seenG.size === GENES.length) Game.xp(20, "Catalogued the whole arsenal", "arsenal", e);
    });
  }

  /* ---------- phylogenetic tree ---------- */
  function initTree() {
    const box = $("#tree");
    const W = 560, H = 360, m = { l: 20, r: 190, t: 16, b: 16 };
    const root = d3.hierarchy(TREE);
    d3.cluster().size([H - m.t - m.b, W - m.l - m.r]).separation(() => 1)(root);
    const elbow = d => `M${d.source.y + m.l},${d.source.x + m.t} V${d.target.x + m.t} H${d.target.y + m.l}`;
    const Q = [
      { q: "Which local isolate is most closely related to the type strain A. hydrophila ATCC 7966?", a: ["Isolate BD-01", "Isolate BD-02", "Isolate BD-03", "Isolate BD-05"], c: 2 },
      { q: "Which pair of isolates clusters with A. veronii?", a: ["BD-01 & BD-03", "BD-02 & BD-05", "BD-03 & BD-05", "BD-01 & BD-02"], c: 1 },
      { q: "Why is Vibrio cholerae included?", a: ["It causes carp disease", "It's the outgroup that roots the tree", "It's a local isolate", "To add colour"], c: 1 },
    ];
    box.innerHTML = `<div class="treebox"><div id="treeSvg"></div><div id="treeQ"></div></div>`;
    const svg = d3.select("#treeSvg").append("svg").attr("viewBox", `0 0 ${W} ${H}`).attr("role", "img").attr("aria-label", "Phylogenetic tree");
    svg.selectAll("path").data(root.links()).join("path").attr("class", "tree-link").attr("d", elbow);
    svg.selectAll("text.bs").data(root.descendants().filter(d => d.children && d.data.bs)).join("text").attr("class", "bs")
      .attr("x", d => d.y + m.l - 4).attr("y", d => d.x + m.t - 5).attr("text-anchor", "end").text(d => d.data.bs);
    const leaves = root.leaves();
    svg.selectAll("text.tip-lbl").data(leaves).join("text").attr("class", d => "tip-lbl" + (d.data.iso ? " iso" : ""))
      .attr("x", d => d.y + m.l + 6).attr("y", d => d.x + m.t + 4).text(d => d.data.name)
      .style("font-style", d => d.data.iso ? "normal" : "italic")
      .on("click", (ev, d) => {
        const anc = new Set(d.ancestors());
        svg.selectAll(".tree-link").classed("hl", l => anc.has(l.target));
        svg.selectAll(".tip-lbl").classed("hl", x => x === d);
      });
    svg.selectAll("circle").data(leaves).join("circle").attr("cx", d => d.y + m.l).attr("cy", d => d.x + m.t).attr("r", 3.5).attr("fill", d => d.data.iso ? "var(--violet)" : "var(--muted)");
    let qi = 0, got = 0;
    const drawQ = () => {
      if (qi >= Q.length) { $("#treeQ").innerHTML = `<div class="explain"><b>${got}/${Q.length} correct.</b> Tip: isolates that share a recent node are close relatives. The bootstrap number tells you how much to trust that node (70 or more is solid).</div>`; if (got === Q.length) Game.badge("tree"); return; }
      const q = Q[qi];
      $("#treeQ").innerHTML = `<p class="fine">Question ${qi + 1}/${Q.length}</p><p><b>${esc(q.q)}</b></p><div class="opts" style="grid-template-columns:1fr">${q.a.map((a, i) => `<button class="opt" data-i="${i}">${esc(a)}</button>`).join("")}</div><div id="treeEx"></div>`;
      $$("#treeQ .opt").forEach(b => b.onclick = e => {
        const ok = +b.dataset.i === q.c; $$("#treeQ .opt").forEach(x => { x.disabled = true; if (+x.dataset.i === q.c) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong"); else { got++; Game.xp(15, null, "tree-" + qi, e); }
        $("#treeEx").innerHTML = `<p style="margin-top:10px"><button class="btn primary small" id="treeNext">Next →</button></p>`;
        $("#treeNext").onclick = () => { qi++; drawQ(); };
      });
    };
    drawQ();
  }

  function init() { drawPipeline(); initMedia(); initBio(); initAST(); initKochHisto(); initQPCR(); initGel(); initBlast(); initArsenal(); initTree(); }
  return { init, openStep };
})();
