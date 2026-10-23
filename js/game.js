/* CarpQuest game engine: XP, levels, badges, persistence, feedback FX. */
const Game = (() => {
  const KEY = "carpquest-v1";
  const blank = () => ({ xp: 0, badges: [], visited: [], flags: {}, once: [], cards: {}, graph: [], videos: [], name: "" });
  let S = blank();

  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  function levelFor(xp) {
    let i = 0;
    LEVELS.forEach((l, k) => { if (xp >= l.xp) i = k; });
    return i;
  }

  function renderHUD() {
    const i = levelFor(S.xp), L = LEVELS[i], next = LEVELS[i + 1];
    document.getElementById("lvlEmoji").textContent = L.emoji;
    document.getElementById("lvlName").textContent = next ? `Lv ${i + 1} · ${L.name}` : `Max · ${L.name}`;
    document.getElementById("xpNum").textContent = S.xp;
    const pct = next ? ((S.xp - L.xp) / (next.xp - L.xp)) * 100 : 100;
    document.getElementById("xpFill").style.width = Math.min(100, pct) + "%";
    document.getElementById("badgeCount").textContent = S.badges.length;
  }

  function toast(html, cls = "") {
    const t = document.createElement("div");
    t.className = "toast " + cls;
    t.innerHTML = html;
    const box = document.getElementById("toasts");
    box.appendChild(t);
    while (box.children.length > 4) box.firstElementChild.remove();
    setTimeout(() => { t.style.transition = "opacity .4s"; t.style.opacity = "0"; setTimeout(() => t.remove(), 400); }, 2600);
  }

  function floatXP(n, ev) {
    if (!ev || !ev.clientX) return;
    const f = document.createElement("div");
    f.className = "xp-float"; f.textContent = `+${n} XP`;
    f.style.left = ev.clientX + "px"; f.style.top = (ev.clientY - 10) + "px";
    document.body.appendChild(f); setTimeout(() => f.remove(), 1000);
  }

  /* award XP; `key` makes the award one-time */
  function xp(n, reason, key, ev) {
    if (key) { if (S.once.includes(key)) return false; S.once.push(key); }
    const before = levelFor(S.xp);
    S.xp += n; save(); renderHUD();
    floatXP(n, ev);
    const hud = document.getElementById("hud"); hud.classList.add("pulse"); setTimeout(() => hud.classList.remove("pulse"), 600);
    if (reason) toast(`<span class="x">+${n} XP</span><span>${reason}</span>`);
    const after = levelFor(S.xp);
    if (after > before) {
      const L = LEVELS[after];
      setTimeout(() => { toast(`<span>${L.emoji} Level up! You are now a <b>${L.name}</b></span>`, "badge-t"); confetti(); }, 500);
    }
    return true;
  }

  function badge(id) {
    if (S.badges.includes(id)) return;
    const b = BADGES.find(x => x.id === id); if (!b) return;
    S.badges.push(id); save(); renderHUD();
    setTimeout(() => { toast(`<span>${b.icon} Badge unlocked: <b>${b.name}</b></span>`, "badge-t"); confetti(80); }, 300);
    renderBadges();
    document.dispatchEvent(new CustomEvent("cq:badge"));
  }

  function renderBadges() {
    const g = document.getElementById("badgeGrid"); if (!g) return;
    g.innerHTML = BADGES.map(b => `<div class="badge ${S.badges.includes(b.id) ? "got" : ""}"><div class="i">${b.icon}</div><b>${b.name}</b><small>${b.desc}</small></div>`).join("");
  }

  /* ---- confetti (tiny canvas implementation) ---- */
  let parts = [], raf = null;
  function confetti(count = 140) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.getElementById("confetti"), ctx = c.getContext("2d");
    c.width = innerWidth * devicePixelRatio; c.height = innerHeight * devicePixelRatio;
    const cols = ["#0f766e", "#2dd4bf", "#e09b00", "#d9472b", "#6250d6", "#ffc233"];
    for (let i = 0; i < count; i++) parts.push({
      x: c.width / 2 + (Math.random() - .5) * c.width * .3, y: c.height * .35,
      vx: (Math.random() - .5) * 18 * devicePixelRatio, vy: (Math.random() * -16 - 4) * devicePixelRatio,
      s: (Math.random() * 6 + 4) * devicePixelRatio, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: cols[i % cols.length], life: 0,
    });
    if (!raf) tick();
    function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach(p => { p.vy += .5 * devicePixelRatio; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
      parts = parts.filter(p => p.y < c.height + 40 && p.life < 240);
      raf = parts.length ? requestAnimationFrame(tick) : (ctx.clearRect(0, 0, c.width, c.height), null);
    }
  }

  function visit(id) {
    if (S.visited.includes(id)) return;
    S.visited.push(id); save();
    const sec = SECTIONS.find(s => s.id === id);
    if (id !== "home") xp(15, `Discovered <b>${sec ? sec.label : id}</b>`);
    if (S.visited.length >= 3) badge("first");
    if (SECTIONS.every(s => S.visited.includes(s.id))) badge("explorer");
    document.dispatchEvent(new CustomEvent("cq:visit"));
  }

  function flag(k, v) { if (v === undefined) return S.flags[k]; S.flags[k] = v; save(); }

  function reset() { S = blank(); save(); location.reload(); }

  load();
  return { get state() { return S; }, save, xp, badge, visit, flag, toast, confetti, renderHUD, renderBadges, reset, levelFor };
})();
