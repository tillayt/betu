/* ============================================================
   script.js — Secret Gateway 💕
   ============================================================

   ╔══════════════════════════════════════════════════════════╗
   ║  HOW TO CUSTOMIZE                                        ║
   ║                                                          ║
   ║  1. PASSWORD  →  Change SECRET_PASSWORD below            ║
   ║  2. LETTER    →  Change text in the LETTER array below   ║
   ║  (Voice & Photos are uploaded live in the browser)       ║
   ╚══════════════════════════════════════════════════════════╝
*/


/* ============================================================
   ▼▼▼  CHANGE PASSWORD  ▼▼▼
   Replace '143' with whatever code you want your love to enter.
   Example: '0624' for June 24th, or '2810' for October 28th
   ============================================================ */
const SECRET_PASSWORD = '02082007';
/* ▲▲▲  END PASSWORD  ▲▲▲ */


/* ============================================================
   ▼▼▼  CHANGE LETTER  ▼▼▼
   Edit the text: '...' on each line.
   Use \n inside the text to start a new line.
   speed = how fast each character types (lower number = faster)
   ============================================================ */
const LETTER = [
  {
    id: 'lSal',
    text: 'Meri pyaari medam ji 🥺,',
    speed: 70
  },
  {
    id: 'lP1',
    text: 'Ham jaante hai ki hamne aapko bahut hurt kiya hai hamne aapko bahut dukh diya hai hamse galti ho gayi hai hame maaf kar dijiye.',
    speed: 32
  },
  {
    id: 'lP2',
    text: 'me maan raha hu me poora ka poor buddhu hu 😐,\n pagal hu 😊\n kutta hu 🥹 \n gadha hu 😥.',
    speed: 32
  },
  {
    id: 'lP3',
    text: 'Par yaar jaisa bhi hi aapka hi to hu yaar betu 🥹.\n Aapse hi pyaar karta 😘 hu ladai bhi karta hu to aapse hi karta hu 🥹, roothta hu to aapse hi roothta hu 🥺,maanna chata hu to bas aapke manane pe 😁\n sab kuch aapse hi karta hu pyaar bhi gussa bhi 🥺\n maan raha hu ki naadan hu par yaar apne bubu ko maaf nahi kar sakte ho kya yaar betu 😢😥🥺🥹\n me maan raha hu ki meri galti hai ki mene suna na samjha or sab kuch tumhare upar daal diya ki tumhari hi galti hai par yaar betu soory yaar mujhe maaf kar do yaar 😭😭😭😭😭',
    speed: 35
  },
  {
    id: 'lP4',
    text: 'Me tumhara hi rahuga hamesa 🥺🥹\n ab chahe tum tadpa lo ya pyaar kar lo \n me kuch nahi kahuga ab tumse 😔😔',
    speed: 55
  },
  {
    id: 'lSign',
    text: 'Ye meri taraf se ek maafi patra 😔\nTumhara pyaar  💕 \n chattar mattar 🥹',
    speed: 60
  },
];
/* ▲▲▲  END LETTER  ▲▲▲ */


/* ============================================================
   STARFIELD
   ============================================================ */
const cvs = document.getElementById('stars');
const ctx = cvs.getContext('2d');
let stars = [];

function resizeCanvas() {
  cvs.width  = window.innerWidth;
  cvs.height = window.innerHeight;
  stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * cvs.width,
    y: Math.random() * cvs.height,
    r: Math.random() * 1.4 + .2,
    a: Math.random(),
    s: Math.random() * .007 + .003,
    d: Math.random() > .5 ? 1 : -1
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  stars.forEach(s => {
    s.a += s.s * s.d;
    if (s.a >= 1 || s.a <= .08) s.d *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 220, 240, ${s.a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();


/* ============================================================
   SCREEN TRANSITIONS
   ============================================================ */
let currentScreen = 1;

function showScreen(from, to) {
  const el = document.getElementById('screen' + from);
  el.style.opacity       = '0';
  el.style.pointerEvents = 'none';
  setTimeout(() => {
    el.classList.remove('active');
    document.getElementById('screen' + to).classList.add('active');
    currentScreen = to;
  }, 700);
}


/* ============================================================
   SCREEN 1 — PASSWORD CHECK
   ============================================================ */
document.getElementById('codeInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') tryCode();
});

function tryCode() {
  const val = document.getElementById('codeInput').value.trim();

  if (val === SECRET_PASSWORD) {
    runHeartAnimation();
  } else {
    const inp = document.getElementById('codeInput');
    inp.classList.add('inp-err', 'shake');
    setTimeout(() => inp.classList.remove('shake'),   500);
    setTimeout(() => inp.classList.remove('inp-err'), 1500);
    inp.value       = '';
    inp.placeholder = '❌ Try again...';
    setTimeout(() => inp.placeholder = '♥ ♥ ♥', 1500);
  }
}


/* ============================================================
   HEART OPENING ANIMATION
   ============================================================ */
function runHeartAnimation() {
  // Fade out Screen 1
  const s1 = document.getElementById('screen1');
  s1.style.transition    = 'opacity .6s ease';
  s1.style.opacity       = '0';
  s1.style.pointerEvents = 'none';

  setTimeout(() => {
    s1.classList.remove('active');

    // Show the heart
    const ha = document.getElementById('heartAnim');
    ha.classList.add('show');

    // Pulse for 2 seconds then split
    setTimeout(() => splitHeart(), 2000);
  }, 600);
}

function splitHeart() {
  const L   = document.getElementById('heartLeft');
  const R   = document.getElementById('heartRight');
  const box = document.getElementById('sparkBox');

  L.classList.add('opening');
  R.classList.add('opening');
  burstSparkles(box);

  // After split finishes → go to Screen 2
  setTimeout(() => {
    const ha = document.getElementById('heartAnim');
    ha.style.opacity = '0';
    setTimeout(() => {
      ha.classList.remove('show');
      ha.style.opacity = '';
      L.classList.remove('opening');
      R.classList.remove('opening');
      box.innerHTML = '';
      document.getElementById('screen2').classList.add('active');
      currentScreen = 2;
    }, 700);
  }, 1800);
}

function burstSparkles(box) {
  box.innerHTML = '';
  const symbols = ['✦','✧','✨','💫','⭐','✦','💗','✧','✦','⭐','💫','✦','✧','💗','✦','✧','✦','💫'];
  const cx = 110, cy = 100;

  symbols.forEach((sym, i) => {
    const el    = document.createElement('div');
    el.className = 'sp';
    el.textContent = sym;

    const angle = (i / symbols.length) * Math.PI * 2;
    const dist  = 70 + Math.random() * 100;

    el.style.setProperty('--tx',  Math.cos(angle) * dist + 'px');
    el.style.setProperty('--ty',  Math.sin(angle) * dist + 'px');
    el.style.setProperty('--dur', (.7 + Math.random() * .8) + 's');
    el.style.setProperty('--del', (Math.random() * .25) + 's');
    el.style.left     = cx + 'px';
    el.style.top      = cy + 'px';
    el.style.fontSize = (11 + Math.random() * 11) + 'px';
    el.style.zIndex   = '999';
    box.appendChild(el);
  });
}


/* ============================================================
   SCREEN 2 → SCREEN 3  (Show Me button)
   ============================================================ */
function startLetter() {
  const s2 = document.getElementById('screen2');
  s2.style.opacity       = '0';
  s2.style.pointerEvents = 'none';
  setTimeout(() => {
    s2.classList.remove('active');
    document.getElementById('screen3').classList.add('active');
    currentScreen = 3;
    runTypewriter();
  }, 700);
}


/* ============================================================
   SCREEN 3 — TYPEWRITER
   ============================================================ */
let typeTimer = null;

function runTypewriter() {
  // Clear all letter sections
  LETTER.forEach(chunk => {
    document.getElementById(chunk.id).innerHTML = '';
  });
  document.getElementById('lBtn').classList.remove('show');

  let chunkIndex = 0;
  let charIndex  = 0;
  let cursor     = null;

  function typeNext() {
    // All chunks done
    if (chunkIndex >= LETTER.length) {
      if (cursor) cursor.remove();
      document.getElementById('lBtn').classList.add('show');
      return;
    }

    const chunk  = LETTER[chunkIndex];
    const el     = document.getElementById(chunk.id);
    const text   = chunk.text;

    // Move cursor to this section at the start
    if (charIndex === 0) {
      if (cursor) cursor.remove();
      cursor = document.createElement('span');
      cursor.className = 'cur';
      el.appendChild(cursor);
    }

    if (charIndex < text.length) {
      const ch = text[charIndex];
      if (ch === '\n') {
        el.insertBefore(document.createElement('br'), cursor);
      } else {
        el.insertBefore(document.createTextNode(ch), cursor);
      }
      charIndex++;
      typeTimer = setTimeout(typeNext, chunk.speed);
    } else {
      // Finished this chunk — pause before next
      charIndex   = 0;
      chunkIndex++;
      const pause = chunkIndex <= 1 ? 500 : 350;
      typeTimer   = setTimeout(typeNext, pause);
    }
  }

  typeTimer = setTimeout(typeNext, 700);
}


/* ============================================================
   SCREEN 4 — VOICE PLAYER
   ============================================================ */
let isPlaying = false;
let audioCtx  = null;
let voiceAudio = null;

// Load user's uploaded voice file
function loadVoice(input) {
  const file = input.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  voiceAudio = document.getElementById('voiceAudio');
  voiceAudio.src = url;
  voiceAudio.load();

  document.querySelector('.upload-voice-btn').textContent = '✅ Voice loaded! Tap play ▶';
}

function togglePlay() {
  isPlaying = !isPlaying;
  const bars = document.getElementById('audioBars');
  const lbl  = document.getElementById('audioLbl');
  const ico  = document.getElementById('playIco');
  const btn  = document.getElementById('playBtn');

  if (isPlaying) {
    bars.classList.add('on');
    bars.classList.remove('paused');
    lbl.textContent  = '♪ Playing... my heart speaks to you';
    ico.innerHTML    = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    btn.style.background = 'linear-gradient(135deg, #c065f7, #ff6b9d)';

    if (voiceAudio && voiceAudio.src) {
      voiceAudio.play();
    } else {
      // fallback gentle melody if no file uploaded
      playFallbackMelody();
    }
  } else {
    bars.classList.remove('on');
    bars.classList.add('paused');
    lbl.textContent  = '✨ Tap to hear my voice';
    ico.innerHTML    = '<path d="M8 5v14l11-7z"/>';
    btn.style.background = '';

    if (voiceAudio) voiceAudio.pause();
    if (audioCtx)  { audioCtx.close(); audioCtx = null; }
  }
}

// Fallback gentle melody (plays only if no voice file uploaded)
function playFallbackMelody() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 329.63, 392, 349.23, 329.63, 293.66, 261.63, 440, 392, 349.23, 261.63];
    notes.forEach((freq, i) => {
      const osc  = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type          = 'sine';
      osc.frequency.value = freq;
      const t = audioCtx.currentTime + i * .55;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(.07, t + .12);
      gain.gain.linearRampToValueAtTime(0,   t + .50);
      osc.start(t);
      osc.stop(t + .56);
    });
  } catch (e) {}
}

// Auto-reset when voice finishes
document.getElementById('voiceAudio').addEventListener('ended', () => {
  isPlaying = false;
  document.getElementById('audioBars').classList.remove('on');
  document.getElementById('audioBars').classList.add('paused');
  document.getElementById('audioLbl').textContent = '✨ Tap to hear my voice';
  document.getElementById('playIco').innerHTML    = '<path d="M8 5v14l11-7z"/>';
  document.getElementById('playBtn').style.background = '';
});


/* ============================================================
   SCREEN 5 — PHOTO GALLERY
   ============================================================ */
let currentSlide = 0;
const TOTAL_SLIDES = 5;

function slide(direction) {
  goSlide((currentSlide + direction + TOTAL_SLIDES) % TOTAL_SLIDES);
}

function goSlide(n) {
  document.querySelectorAll('.slide')[currentSlide].classList.remove('active');
  document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
  currentSlide = n;
  document.querySelectorAll('.slide')[currentSlide].classList.add('active');
  document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

// Auto-advance every 3.5 seconds
setInterval(() => {
  if (currentScreen === 5) slide(1);
}, 3500);

// Arrow key support
document.addEventListener('keydown', e => {
  if (currentScreen === 5) {
    if (e.key === 'ArrowLeft')  slide(-1);
    if (e.key === 'ArrowRight') slide(1);
  }
});

// Load a photo into a slide
function loadPhoto(index, input) {
  const file = input.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const bg  = document.getElementById('bg' + index);
  const em  = document.getElementById('em' + index);

  bg.style.backgroundImage    = `url(${url})`;
  bg.style.backgroundSize     = 'cover';
  bg.style.backgroundPosition = 'center';
  em.style.display = 'none'; // hide emoji once photo is added
}
