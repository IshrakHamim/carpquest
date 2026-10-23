/* CarpQuest learning tools: knowledge graph, flashcards, quizzes, library, certificate. */
const Learn = (() => {

  /* ---------- knowledge graph ---------- */
  function initGraph() {
    const svgEl = $("#graphSvg"), info = $("#graphInfo");
    const nodes = GRAPH_NODES.map(([id, label, group, desc]) => ({ id, label, group, desc }));
    const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
    const links = GRAPH_LINKS.filter(([a, b]) => byId[a] && byId[b]).map(([source, target]) => ({ source, target }));
    const nbr = {}; links.forEach(l => { (nbr[l.source] ||= new Set()).add(l.target); (nbr[l.target] ||= new Set()).add(l.source); });
    nodes.forEach(n => n.deg = nbr[n.id] ? nbr[n.id].size : 0);
    const visited = new Set(Game.state.graph);
    const off = new Set();

    $("#graphLegend").innerHTML = Object.entries(GRAPH_GROUPS).map(([k, g]) => `<button data-g="${k}"><i style="background:${g.color}"></i>${g.label}</button>`).join("");

    const svg = d3.select(svgEl), root = svg.append("g");
    const zoom = d3.zoom().scaleExtent([.3, 3]).on("zoom", e => root.attr("transform", e.transform));
    svg.call(zoom);
    const link = root.append("g").selectAll("line").data(links).join("line").attr("class", "glink");
    const node = root.append("g").selectAll("g").data(nodes).join("g").attr("class", d => "gnode" + (visited.has(d.id) ? " visited" : ""));
    node.append("circle").attr("r", d => 6 + Math.min(12, d.deg * 1.1)).attr("fill", d => GRAPH_GROUPS[d.group].color);
    node.append("text").attr("dy", d => -(9 + Math.min(12, d.deg * 1.1))).attr("text-anchor", "middle").text(d => d.label);

    const size = () => { const r = svgEl.getBoundingClientRect(); return [r.width || 800, r.height || 600]; };
    let [W, H] = size();
    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(l => (l.source.group === l.target.group ? 50 : 80)).strength(.5))
      .force("charge", d3.forceManyBody().strength(-210))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius(d => 16 + Math.min(12, d.deg)))
      .force("x", d3.forceX(W / 2).strength(.04)).force("y", d3.forceY(H / 2).strength(.06))
      .on("tick", () => {
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
      });
    node.call(d3.drag()
      .on("start", (e, d) => { if (!e.active) sim.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    // fit once the layout has settled
    setTimeout(() => {
      const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
      const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
      [W, H] = size();
      const k = Math.min(1.4, .9 / Math.max((x1 - x0) / W, (y1 - y0) / H));
      svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(k).translate(-(x0 + x1) / 2, -(y0 + y1) / 2));
    }, 1800);

    const applyFilter = () => {
      node.style("display", d => off.has(d.group) ? "none" : null);
      link.style("display", d => off.has(d.source.group) || off.has(d.target.group) ? "none" : null);
    };
    $("#graphLegend").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      const g = b.dataset.g; off.has(g) ? off.delete(g) : off.add(g); b.classList.toggle("off", off.has(g)); applyFilter();
    });

    const select = (id, ev) => {
      const d = byId[id]; if (!d) return;
      const ns = nbr[id] || new Set();
      node.classed("dimmed", n => n.id !== id && !ns.has(n.id));
      link.classed("dimmed", l => l.source.id !== id && l.target.id !== id).classed("hl", l => l.source.id === id || l.target.id === id);
      const grp = GRAPH_GROUPS[d.group];
      info.innerHTML = `<span class="tag" style="background:${grp.color};color:#fff">${grp.label}</span><h3 style="margin-top:8px">${esc(d.label)}</h3><p>${esc(d.desc)}</p>
        <p class="fine">${ns.size} connections</p><div class="nbrs">${[...ns].map(n => `<button data-n="${n}">${esc(byId[n].label)}</button>`).join("")}</div>
        <p style="margin-top:12px"><button class="link-btn" id="graphClear">Clear highlight</button></p>`;
      if (!visited.has(id)) {
        visited.add(id); Game.state.graph = [...visited]; Game.save(); Game.xp(2, null, "g-" + id, ev);
        node.classed("visited", n => visited.has(n.id));
        $("#graphCount").textContent = Math.min(15, visited.size);
        if (visited.size >= 15) Game.badge("graph");
      }
    };
    node.on("click", (e, d) => { e.stopPropagation(); select(d.id, e); });
    info.addEventListener("click", e => {
      const b = e.target.closest("[data-n]"); if (b) { select(b.dataset.n, e); const d = byId[b.dataset.n]; focusOn(d); }
      if (e.target.id === "graphClear") clear();
    });
    const clear = () => { node.classed("dimmed", false); link.classed("dimmed", false).classed("hl", false); };
    svg.on("click", clear);
    const focusOn = d => { [W, H] = size(); svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(1.4).translate(-d.x, -d.y)); };
    $("#graphSearch").addEventListener("input", e => {
      const q = e.target.value.trim().toLowerCase(); if (!q) { clear(); return; }
      const hit = nodes.find(n => n.label.toLowerCase().includes(q)) || nodes.find(n => n.desc.toLowerCase().includes(q));
      if (hit) { select(hit.id); focusOn(hit); }
    });
    $("#graphCount").textContent = Math.min(15, visited.size);
    addEventListener("resize", () => { [W, H] = size(); sim.force("center", d3.forceCenter(W / 2, H / 2)); });
  }

  /* ---------- flashcards (Leitner boxes 0–3) ---------- */
  function initFlash() {
    const cards = FLASHCARDS.map(([topic, q, a], i) => ({ i, topic, q, a }));
    const st = Game.state.cards; // i -> box
    const topics = ["All", ...new Set(cards.map(c => c.topic))];
    let topic = "All", cur = null, queue = [];
    $("#deckFilter").innerHTML = topics.map((t, k) => `<button class="pill ${k ? "" : "on"}" data-t="${t}">${t}</button>`).join("");
    const build = () => {
      const pool = cards.filter(c => topic === "All" || c.topic === topic);
      // lower boxes first, shuffled within box
      queue = pool.map(c => ({ c, r: (st[c.i] || 0) * 10 + Math.random() * 10 })).sort((a, b) => a.r - b.r).map(x => x.c);
    };
    const mastered = () => Object.values(st).filter(b => b >= 2).length;
    const show = () => {
      const pool = cards.filter(c => topic === "All" || c.topic === topic);
      if (!queue.length) build();
      cur = queue.shift();
      $("#flash").classList.remove("flipped");
      setTimeout(() => {
        $("#flashFront").innerHTML = `<span class="topic">${esc(cur.topic)}</span>${esc(cur.q)}<span class="hint">tap to flip</span>`;
        $("#flashBack").innerHTML = `<span class="topic">Answer</span>${esc(cur.a)}`;
      }, 150);
      const counts = [0, 0, 0, 0]; pool.forEach(c => counts[Math.min(3, st[c.i] || 0)]++);
      $("#flashMeta").innerHTML = `Mastered (box 2+): <b>${mastered()}</b> / ${cards.length}<div class="boxes">${counts.map((n, k) => `<span>Box ${k}: ${n}</span>`).join("")}</div>`;
    };
    const flip = () => {
      $("#flash").classList.toggle("flipped");
      Game.xp(1, null, "flip-" + cur.i);
    };
    $("#flash").addEventListener("click", flip);
    $("#flash").addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
    $("#flashGot").onclick = e => {
      const before = st[cur.i] || 0; st[cur.i] = Math.min(3, before + 1); Game.save();
      if (st[cur.i] === 2 && before < 2) Game.xp(5, null, "card-m-" + cur.i, e);
      if (mastered() >= 20) Game.badge("cards");
      show();
    };
    $("#flashAgain").onclick = () => { st[cur.i] = 0; Game.save(); queue.splice(Math.min(2, queue.length), 0, cur); show(); };
    $("#deckFilter").addEventListener("click", e => { const b = e.target.closest(".pill"); if (!b) return; $$(".pill", $("#deckFilter")).forEach(x => x.classList.toggle("on", x === b)); topic = b.dataset.t; queue = []; show(); });
    show();
  }

  /* ---------- quiz ---------- */
  function initQuiz() {
    const topics = [...new Set(QUIZ.map(q => q.t))];
    $("#quizPick").innerHTML = topics.map(t => `<button class="pill" data-t="${t}">${t} (${QUIZ.filter(q => q.t === t).length})</button>`).join("") + `<button class="pill boss" data-t="__boss">⚔️ Boss Battle</button>`;
    const box = $("#quizBox");
    box.innerHTML = `<div class="result"><p style="font-size:3rem;margin:0">🎯</p><p>Pick a round above to begin.</p></div>`;
    const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
    let set = [], i = 0, score = 0, lives = 3, boss = false;
    const start = t => {
      boss = t === "__boss";
      set = boss ? shuffle(QUIZ).slice(0, 15) : shuffle(QUIZ.filter(q => q.t === t));
      i = 0; score = 0; lives = 3; draw();
      box.scrollIntoView({ block: "nearest" });
    };
    const draw = () => {
      if (i >= set.length || (boss && lives <= 0)) return end();
      const q = set[i], order = shuffle(q.a.map((a, k) => k));
      box.innerHTML = `<div class="qhead"><span>${boss ? "⚔️ Boss Battle" : esc(q.t)} · Question ${i + 1}/${set.length}</span><span>Score ${score}${boss ? ` · <span class="lives">${"❤️".repeat(lives)}${"🖤".repeat(3 - lives)}</span>` : ""}</span></div>
        <div class="qbar"><i style="width:${(i / set.length) * 100}%"></i></div>
        <div class="qtext">${esc(q.q)}</div><div class="opts">${order.map(k => `<button class="opt" data-k="${k}">${esc(q.a[k])}</button>`).join("")}</div><div id="qEx"></div>`;
      $$(".opt", box).forEach(b => b.onclick = e => {
        const ok = +b.dataset.k === q.c;
        $$(".opt", box).forEach(x => { x.disabled = true; if (+x.dataset.k === q.c) x.classList.add("right"); });
        if (ok) { score++; Game.xp(boss ? 15 : 10, null, null, e); } else { b.classList.add("wrong"); if (boss) lives--; }
        $("#qEx").innerHTML = `<div class="explain">${ok ? "✅" : "❌"} ${esc(q.e)}</div><p style="margin-top:12px"><button class="btn primary small" id="qNext">${i + 1 < set.length && !(boss && lives <= 0) ? "Next →" : "Finish"}</button></p>`;
        $("#qNext").onclick = () => { i++; draw(); };
        $("#qNext").focus();
      });
    };
    const end = () => {
      const pct = Math.round(score / set.length * 100), dead = boss && lives <= 0;
      let msg;
      if (boss) msg = dead ? "The boss got you this time. Review your flashcards and come back stronger!" : "🏆 You defeated the boss!";
      else msg = pct >= 80 ? "Ace! You clearly understand this part of the slides." : "Good start. Check the related section and try again.";
      box.innerHTML = `<div class="result"><div class="score">${score}/${set.length}</div><p>${msg}</p><p><button class="btn primary" id="qRetry">Play again</button></p></div>`;
      if (!boss && pct >= 80) Game.badge("quiz");
      if (boss && !dead) { Game.badge("boss"); Game.xp(60, "Boss defeated", "boss-win"); Game.confetti(200); }
      $("#qRetry").onclick = () => start(boss ? "__boss" : set[0].t);
    };
    $("#quizPick").addEventListener("click", e => { const b = e.target.closest(".pill"); if (b) start(b.dataset.t); });
  }

  /* ---------- library ---------- */
  function initLibrary() {
    const topics = ["All", ...new Set([...Object.values(VIDEOS).map(v => v.topic), ...ARTICLES.map(a => a.topic)])];
    $("#libFilter").innerHTML = topics.map((t, k) => `<button class="pill ${k ? "" : "on"}" data-t="${t}">${t}</button>`).join("");
    const draw = t => {
      $("#videoGrid").innerHTML = Object.keys(VIDEOS).filter(k => t === "All" || VIDEOS[k].topic === t).map(videoCard).join("");
      $("#refList").innerHTML = ARTICLES.filter(a => t === "All" || a.topic === t).map(a => `<li><a href="${a.u}" target="_blank" rel="noopener">↗ ${esc(a.t)}<small>${esc(a.src)}</small></a></li>`).join("");
    };
    $("#libFilter").addEventListener("click", e => { const b = e.target.closest(".pill"); if (!b) return; $$(".pill", $("#libFilter")).forEach(x => x.classList.toggle("on", x === b)); draw(b.dataset.t); });
    draw("All");
    $("#gloss").innerHTML = GLOSSARY.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("");
  }

  /* ---------- certificate ---------- */
  function renderCert() {
    const S = Game.state, need = 10, have = S.badges.length;
    const box = $("#cert");
    if (have < need) {
      box.innerHTML = `<div class="cert-card"><p style="font-size:2.4rem;margin:0">📜</p><h3>Certificate locked</h3><p>Unlock <b>${need}</b> badges to earn your <i>Carp Disease Detective</i> certificate. You have <b>${have}</b>.</p></div>`;
      return;
    }
    const lvl = LEVELS[Game.levelFor(S.xp)];
    box.innerHTML = `<div class="cert-card"><p style="font-size:2.4rem;margin:0">🏅</p><p class="eyebrow">Certificate of completion</p><h3>Carp Disease Detective</h3>
      <p>This certifies that</p><div class="cert-name" id="certName">${esc(S.name || "Your Name")}</div>
      <p>has explored <i>Investigation &amp; Molecular Characterization of Diseases Affecting Cultured Carps in Bangladesh</i>, earning <b>${S.xp} XP</b>, <b>${have} badges</b> and the rank of <b>${lvl.emoji} ${lvl.name}</b>.</p>
      <p><input id="certIn" placeholder="Type your name" value="${esc(S.name)}" aria-label="Your name"> <button class="btn primary small" onclick="window.print()">Print</button></p></div>`;
    $("#certIn").addEventListener("input", e => { S.name = e.target.value.slice(0, 60); Game.save(); $("#certName").textContent = S.name || "Your Name"; });
  }

  return { initGraph, initFlash, initQuiz, initLibrary, renderCert };
})();
