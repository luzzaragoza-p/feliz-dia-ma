// feliz_dia_ma.exe — recorrido jugable

const HEART = '<path d="M12 21C12 21 3 14.5 3 8.5 3 5.4 5.4 3 8.3 3c1.6 0 3 .8 3.7 2 .7-1.2 2.1-2 3.7-2C18.6 3 21 5.4 21 8.5 21 14.5 12 21 12 21z"/>';

const STAGE = { 'ella': '#C7A6FF', 'mamá': '#FFB86B', 'súper mamá': '#8BE8C8' };

const PHOTOS = [
  { stage: 'ella', src: 'fotos/retro.jpg', msg: 'initial commit', caption: 'la versión original', alt: 'Foto antigua de mamá joven frente a la vidriera de una tienda' },
  { stage: 'mamá', src: 'fotos/beso.jpg', msg: 'feat: modo mamá', caption: 'con papá', alt: 'Mamá joven besando a su bebé en un jardín, con papá al lado' },
  { stage: 'mamá', src: 'fotos/paraguas.jpg', msg: 'commit: día de lluvia', caption: 'con papá', alt: 'Mamá con un paraguas junto a papá, que sostiene un bebé' },
  { stage: 'mamá', src: 'fotos/abrazo2003.jpg', msg: 'commit 13/06/2003', caption: 'abrazo de a tres', alt: 'Mamá abrazando a dos nenes en el auto, foto fechada en 2003' },
  { stage: 'mamá', src: 'fotos/iglesia.jpg', msg: 'commit: hola, cámara', caption: 'con papá', alt: 'Mamá saludando junto a papá y dos nenes en una iglesia' },
  { stage: 'mamá', src: 'fotos/banera.jpg', msg: 'feat: baño de espuma', caption: 'baño familiar', alt: 'Mamá, papá y tres nenes en una bañera llena de espuma' },
  { stage: 'súper mamá', src: 'fotos/abuela.jpg', msg: 'merge: tres generaciones', caption: 'con la abuela', alt: 'Mamá, la abuela y su nieta en el asiento de un auto' },
  { stage: 'súper mamá', src: 'fotos/espejo.jpg', msg: 'commit: selfie en el espejo', caption: 'las mujeres de la casa', alt: 'Selfie en un espejo de mamá abrazando a sus hijas, con Mia, la más chiquita' },
  { stage: 'súper mamá', src: 'fotos/mate.jpg', msg: 'commit: mate y charla', caption: 'mate y risas', alt: 'Selfie de mamá y su hija tomando mate apoyadas en un árbol' },
  { stage: 'súper mamá', src: 'fotos/barco.jpg', msg: 'commit: Brasil', caption: 'con Emi', text: 'Falta poco para verlo <3', alt: 'Mamá y Emi en un bote a pedal en un lago en Brasil' },
  { stage: 'súper mamá', src: 'fotos/familia.jpg', msg: 'release: el equipo completo', caption: 'Miami, todos juntos', alt: 'Mamá con sus cuatro hijos en un balcón entre edificios en Miami' },
  { stage: 'súper mamá', src: 'fotos/piscina.jpg', msg: 'main: la versión actual', caption: 'mi persona favorita', alt: 'Mamá sonriendo de noche junto a una pileta iluminada en Miami' }
];

// Paradas del camino (en % del tablero), en zigzag.
const POS = [[12, 18], [37, 18], [63, 18], [88, 18], [88, 50], [63, 50], [37, 50], [12, 50], [12, 82], [37, 82], [63, 82], [88, 82]];

const ANSWERS = [
  'Es la persona que aprende cosas nuevas con una curiosidad que contagia. Hoy, IA y programación; mañana, lo que se le ocurra.',
  'Tiene la paciencia de quien lee un error por décima vez y todavía dice: “dale, probemos de nuevo”.',
  'Tiene el corazón repartido en dos países y cuenta los días para enero.'
];

const CARDS = [
  { tag: 'Paciencia', text: 'Que las cosas lindas tardan en compilar, y está bien.' },
  { tag: 'Curiosidad', text: 'Que nunca es tarde para empezar algo nuevo. Mirá dónde estamos.' },
  { tag: 'Valentía', text: 'Que empezar de cero da miedo, y se hace igual.' },
  { tag: 'Optimización', text: 'Que siempre se puede sacar algo de donde no hay. Y reciclar, aunque sobre.' },
  { tag: 'Criterio', text: 'Que los hombres tienen que «servir». Si no sirve: next().' }
];

const state = { step: 0, lines: 0, busy: false, open: new Set(), photo: 0, view: 0 };

const $ = (id) => document.getElementById(id);
const screen = $('screen');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nextBtn = (label = 'Siguiente nivel', cls = '') => `<div><button class="btn btn-primary ${cls}" data-act="next">${label}</button></div>`;

/* ---------- Pantallas ---------- */

const SCREENS = [
  () => `
  <section>
    <div class="terminal mono">
      <div><span class="c-green">ma@corazon</span>:~$ <span class="typing">npm run feliz-dia-ma</span></div>
      <div class="c-muted">&gt; compilando recuerdos........ ok</div>
      <div class="c-muted">&gt; instalando abrazos.......... ok</div>
      <div class="c-muted">&gt; cargando 0 errores, ∞ amor.. ok</div>
      <div><span style="color: var(--pink)">listo.</span> Hay un regalo esperándote <span class="blink">▍</span></div>
    </div>
    <div class="stack" style="gap: 12px">
      <h1>Ma, armé algo<br>para vos.</h1>
      <p class="lead">Cinco niveles, un par de bugs y muchas cosas que te quiero decir. Lo programé con todo lo que venimos aprendiendo.</p>
    </div>
    <div><button class="btn btn-primary btn-big" data-act="next">Ejecutar programa</button></div>
  </section>`,

  () => `
  <section>
    <div class="tag mono">Nivel 1 · Verificación de identidad</div>
    <h2>Antes de seguir:<br>¿quién es la mejor mamá del mundo?</h2>
    <div class="options">
      ${['Yo', 'Obvio que yo', 'Sin dudas, yo'].map((o) => `<button class="btn btn-ghost option" data-act="login">${o}</button>`).join('')}
    </div>
    <div class="ok-box pop" id="login-ok" hidden>
      <div class="mono c-green" style="font-size: 16px">200 OK · acceso concedido</div>
      <p>Respuesta correcta. Todas las opciones eran correctas, igual. Bienvenida, Ma.</p>
      ${nextBtn()}
    </div>
  </section>`,

  () => `
  <section>
    <div class="tag mono">Nivel 2 · Debug</div>
    <h2>Encontré un bug en mi código.</h2>
    <div class="code mono">
      <div class="c-comment">// amor.js</div>
      <div id="code-state">
        <div><span class="c-kw">const</span> amorPorVos = <span class="bad">100</span>;</div>
        <div class="c-err">⚠ Error: el valor no alcanza ni para empezar</div>
      </div>
    </div>
    <div id="fix-btn"><button class="btn btn-orange btn-big" data-act="fix">Arreglar el bug</button></div>
    <div class="stack pop" id="fix-ok" hidden>
      <p class="note">Vos me enseñaste que todo bug tiene arreglo si lo mirás con calma.</p>
      ${nextBtn()}
    </div>
  </section>`,

  () => `
  <section>
    <div class="tag mono">Nivel 3 · Le pregunté a la IA</div>
    <div class="chat" id="chat">
      <div class="bubble me">Describí a mi mamá. Sin exagerar.</div>
    </div>
    <div class="thinking mono pulse" id="thinking" hidden>pensando…</div>
    <div id="line-btn"><button class="btn btn-ghost" data-act="line">Enviar prompt</button></div>
    <div class="stack pop" id="lines-done" hidden>
      <p class="ai-note mono">Nota de la IA: “Sin exagerar” no fue posible.</p>
      ${nextBtn()}
    </div>
  </section>`,

  () => `
  <section>
    <div class="tag mono">Nivel 4 · Componentes</div>
    <h2>Cosas que aprendí de vos.<span class="sub">Tocá cada componente para renderizarlo.</span></h2>
    <div class="cards">
      ${CARDS.map((c, i) => `<button class="card" data-act="card" data-i="${i}" aria-pressed="false">${cardInner(i, false)}</button>`).join('')}
    </div>
    <div class="pop" id="cards-done" hidden><button class="btn btn-primary btn-big" data-act="next">Siguiente nivel</button></div>
  </section>`,

  () => `
  <section>
    <div class="tag mono">Nivel 5 · El camino</div>
    <h2>El camino de Ma.</h2>
    <div class="path-grid">
      <div class="photo-slot" id="slot"></div>
      <div class="board-col">
        <div class="board">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="${points(POS.length)}" fill="none" stroke="#2E2340" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
            <polyline class="march" points="${points(POS.length)}" fill="none" stroke="#5A4870" stroke-width="2" stroke-dasharray="6 8" vector-effect="non-scaling-stroke"/>
            <polyline id="trail" points="" fill="none" stroke="#FF8AC2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
          </svg>
          ${POS.map((p, i) => `<div class="stop" id="stop-${i}" style="left: ${p[0]}%; top: ${p[1]}%"></div>`).join('')}
          <div class="token" id="token" aria-hidden="true">
            <svg class="bob" width="28" height="28" viewBox="0 0 24 24" fill="#FF8AC2" stroke="#1C1426" stroke-width="1.5">${HEART}</svg>
          </div>
        </div>
        <div class="legend mono">
          ${Object.entries(STAGE).map(([name, color]) => `<span><i style="background: ${color}"></i>${name}</span>`).join('')}
        </div>
      </div>
      <div class="controls">
        <div class="count mono" id="count"></div>
        <div id="path-btn"></div>
      </div>
    </div>
  </section>`,

  () => `
  <section class="final">
    <div class="final-head">
      <div class="deploy mono">✓ deploy exitoso · en producción para siempre</div>
      <svg class="pulse" width="64" height="64" viewBox="0 0 24 24" fill="#FF8AC2" aria-hidden="true">${HEART}</svg>
      <h1 class="big">Feliz día, Ma.</h1>
      <button class="btn btn-outline" data-act="restart">Volver a jugar</button>
    </div>
    <article class="letter">
      <div class="letter-head mono">README.md</div>
      <div class="letter-body">
        <p class="hi">Mami:</p>
        <p>No soy muy buena diciendo estas cosas en voz alta, así que las programé.</p>
        <p>Gracias por enseñarme que nunca es tarde para empezar algo nuevo. Verte aprender con esas ganas me inspira todos los días.</p>
        <p>Si mi vida fuera un programa, vos serías el commit inicial, la mejor documentación y el soporte técnico 24/7.</p>
        <p>Te amo infinito.</p>
        <p class="sign hand">Luz</p>
      </div>
    </article>
  </section>`
];

/* ---------- Helpers ---------- */

function cardInner(i, open) {
  const c = CARDS[i];
  return `<span class="ctag mono">&lt;${c.tag} /&gt;</span>` +
    (open ? `<span class="ctext pop">${esc(c.text)}</span>` : `<span class="render mono">render()</span>`);
}

function points(n) {
  return POS.slice(0, n).map((p) => p[0] + ',' + p[1]).join(' ');
}

function updateProgress() {
  document.querySelectorAll('.progress li').forEach((li, i) => li.classList.toggle('done', i <= state.step));
}

function showHearts(on) {
  const box = $('hearts');
  if (!on) { box.innerHTML = ''; return; }
  const colors = ['#FF8AC2', '#8BE8C8', '#C7A6FF', '#FFB86B'];
  box.innerHTML = Array.from({ length: 14 }, (_, i) => {
    const size = 18 + (i % 4) * 10;
    return `<svg class="float" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colors[i % 4]}" style="left: ${(i * 7 + 3) % 96}%; animation-delay: ${((i * 0.37) % 4).toFixed(2)}s">${HEART}</svg>`;
  }).join('');
}

function go(step) {
  state.step = step;
  updateProgress();
  screen.innerHTML = SCREENS[step]();
  screen.firstElementChild.classList.add('fadeup');
  showHearts(step === SCREENS.length - 1);
  if (step === 5) updateCamino(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Camino ---------- */

function updateCamino(first) {
  const last = PHOTOS.length - 1;
  $('trail').setAttribute('points', points(state.photo + 1));

  POS.forEach((_, i) => {
    const el = $('stop-' + i);
    const kind = i <= state.photo ? 'seen' : i === state.photo + 1 ? 'next' : 'locked';
    if (el.dataset.kind !== kind) {
      el.dataset.kind = kind;
      const p = PHOTOS[i];
      el.innerHTML = kind === 'seen'
        ? `<button class="thumb pop" data-act="view" data-i="${i}" aria-label="Ver foto ${i + 1}: ${esc(p.caption)}" style="border-color: ${STAGE[p.stage]}"><img src="${p.src}" alt=""></button>`
        : kind === 'next'
          ? `<button class="next-stop pulse" data-act="advance" aria-label="Avanzar a la próxima foto">?</button>`
          : `<span class="locked"></span>`;
    }
    const thumb = el.querySelector('.thumb');
    if (thumb) thumb.classList.toggle('viewing', i === state.view);
  });

  const token = $('token');
  token.style.left = POS[state.photo][0] + '%';
  token.style.top = POS[state.photo][1] + '%';

  const p = PHOTOS[state.view];
  const tilt = state.view % 2 === 0 ? -2 : 2;
  $('slot').innerHTML = `
    <div class="pop stack" style="align-items: center; gap: 18px">
      <figure class="polaroid" style="transform: rotate(${tilt}deg)">
        <img src="${p.src}" alt="${esc(p.alt)}">
        <figcaption class="hand">${esc(p.caption)}</figcaption>
      </figure>
      <div class="meta">
        <span class="branch mono" style="background: ${STAGE[p.stage]}">rama: ${p.stage}</span>
        <span class="msg mono">${esc(p.msg)}</span>
      </div>
      ${p.text ? `<p class="photo-text">${esc(p.text)}</p>` : ''}
    </div>`;

  $('count').textContent = 'foto ' + (state.view + 1) + ' de ' + PHOTOS.length;
  $('path-btn').innerHTML = state.photo < last
    ? `<button class="btn btn-light btn-big" data-act="advance">Avanzar</button>`
    : `<button class="btn btn-primary btn-big pop" data-act="next">Hacer deploy</button>`;
}

// El corazón salta hasta la próxima parada y el trazo lo sigue.
let walking = false;

function walk(from, to, done) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dur = reduce ? 0 : 700;
  const token = $('token');
  const heart = token.querySelector('svg');
  const trail = $('trail');
  const [x0, y0] = POS[from];
  const [x1, y1] = POS[to];
  const base = points(from + 1);
  const start = performance.now();
  heart.classList.remove('bob');

  function frame(now) {
    const t = dur ? Math.min((now - start) / dur, 1) : 1;
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const x = x0 + (x1 - x0) * e;
    const y = y0 + (y1 - y0) * e;
    token.style.left = x + '%';
    token.style.top = y + '%';
    heart.style.transform = `translateY(${-Math.sin(Math.PI * t) * 18}px) rotate(${Math.sin(Math.PI * 2 * t) * 12}deg)`;
    trail.setAttribute('points', base + ' ' + x + ',' + y);
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      heart.style.transform = '';
      heart.classList.add('bob');
      done();
    }
  }
  requestAnimationFrame(frame);
}

// Destellos al llegar a una parada.
function burst(i) {
  const board = document.querySelector('.board');
  const [x, y] = POS[i];
  const color = STAGE[PHOTOS[i].stage];
  for (let k = 0; k < 10; k++) {
    const angle = (k / 10) * Math.PI * 2;
    const dist = 34 + (k % 2) * 12;
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.left = x + '%';
    spark.style.top = y + '%';
    spark.style.background = k % 2 ? color : '#FFF3B8';
    spark.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    spark.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    board.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  }
}

/* ---------- Acciones ---------- */

const ACTIONS = {
  next: () => go(state.step + 1),

  restart: () => {
    Object.assign(state, { lines: 0, busy: false, open: new Set(), photo: 0, view: 0 });
    go(0);
  },

  login: () => { $('login-ok').hidden = false; },

  fix: () => {
    $('code-state').innerHTML = `
      <div class="pop"><span class="c-kw">const</span> amorPorVos = <span class="c-green">Infinity</span>;</div>
      <div class="pop c-green">✓ 1 de 1 tests pasados. Ningún número alcanzaba.</div>`;
    $('fix-btn').hidden = true;
    $('fix-ok').hidden = false;
  },

  line: () => {
    if (state.busy) return;
    state.busy = true;
    $('line-btn').hidden = true;
    $('thinking').hidden = false;
    setTimeout(() => {
      $('chat').insertAdjacentHTML('beforeend', `<div class="bubble ai pop">${esc(ANSWERS[state.lines])}</div>`);
      state.lines += 1;
      state.busy = false;
      $('thinking').hidden = true;
      if (state.lines < ANSWERS.length) {
        $('line-btn').hidden = false;
        $('line-btn').querySelector('button').textContent = 'Seguir generando';
      } else {
        $('lines-done').hidden = false;
      }
    }, 900);
  },

  card: (el) => {
    const i = Number(el.dataset.i);
    const open = !state.open.has(i);
    open ? state.open.add(i) : state.open.delete(i);
    el.innerHTML = cardInner(i, open);
    el.setAttribute('aria-pressed', String(open));
    $('cards-done').hidden = state.open.size < CARDS.length;
  },

  advance: () => {
    if (walking || state.photo >= PHOTOS.length - 1) return;
    walking = true;
    const from = state.photo;
    const to = from + 1;
    walk(from, to, () => {
      state.photo = to;
      state.view = to;
      updateCamino(false);
      burst(to);
      walking = false;
    });
  },

  view: (el) => {
    if (walking) return;
    state.view = Number(el.dataset.i);
    updateCamino(false);
  }
};

screen.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (el && ACTIONS[el.dataset.act]) ACTIONS[el.dataset.act](el);
});

// Precarga las fotos del camino para que aparezcan sin demora.
PHOTOS.forEach((p) => { const img = new Image(); img.src = p.src; });

go(0);
