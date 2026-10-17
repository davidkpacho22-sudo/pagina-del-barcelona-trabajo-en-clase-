/* ====== DATOS EDITABLES ====== */
// Cambia la fecha y el rival del próximo partido aquí (hora local, formato ISO)
const PROXIMO_PARTIDO = {
  rival: "Real Madrid",
  siglas: "RMA",
  competicion: "LaLiga",
  fecha: "2026-10-26T21:00:00"
};

const JUGADORES = [
  { nombre: "Joan García",     num: 13, pos: "Portero" },
  { nombre: "Wojciech Szczęsny", num: 25, pos: "Portero" },
  { nombre: "Jules Koundé",    num: 23, pos: "Defensa" },
  { nombre: "Ronald Araújo",   num: 4,  pos: "Defensa" },
  { nombre: "Pau Cubarsí",     num: 5,  pos: "Defensa" },
  { nombre: "Alejandro Balde", num: 3,  pos: "Defensa" },
  { nombre: "Pedri",           num: 8,  pos: "Medio" },
  { nombre: "Frenkie de Jong", num: 21, pos: "Medio" },
  { nombre: "Gavi",            num: 6,  pos: "Medio" },
  { nombre: "Lamine Yamal",    num: 10, pos: "Delantero" },
  { nombre: "Raphinha",        num: 11, pos: "Delantero" },
  { nombre: "Robert Lewandowski", num: 9, pos: "Delantero" }
];

const NOTICIAS = [
  { titulo: "Crónica del último partido en el Camp Nou", fecha: "2026-10-12" },
  { titulo: "Entrenamiento abierto en la Ciutat Esportiva", fecha: "2026-10-10" },
  { titulo: "La Masia: nuevos talentos suben al filial", fecha: "2026-10-08" }
];

/* ====== MENÚ MÓVIL ====== */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const abierto = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", abierto);
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }
});

/* ====== CUENTA REGRESIVA ====== */
document.getElementById("rivalName").textContent = PROXIMO_PARTIDO.rival;
document.getElementById("rivalBadge").textContent = PROXIMO_PARTIDO.siglas;
const objetivo = new Date(PROXIMO_PARTIDO.fecha);
document.getElementById("matchInfo").textContent =
  `${PROXIMO_PARTIDO.competicion} · ` +
  objetivo.toLocaleString("es-CO", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

function tick() {
  let diff = Math.max(0, objetivo - new Date());
  const d = Math.floor(diff / 864e5); diff %= 864e5;
  const h = Math.floor(diff / 36e5);  diff %= 36e5;
  const m = Math.floor(diff / 6e4);   diff %= 6e4;
  const s = Math.floor(diff / 1e3);
  document.getElementById("d").textContent = d;
  document.getElementById("h").textContent = String(h).padStart(2, "0");
  document.getElementById("m").textContent = String(m).padStart(2, "0");
  document.getElementById("s").textContent = String(s).padStart(2, "0");
}
tick(); setInterval(tick, 1000);

/* ====== PLANTEL CON FILTRO ====== */
const lista = document.getElementById("players");
function pintar(pos) {
  const filtrados = pos === "Todos" ? JUGADORES : JUGADORES.filter(j => j.pos === pos);
  lista.innerHTML = filtrados.map(j =>
    `<li class="player"><span class="num">${j.num}</span><strong>${j.nombre}</strong><span>${j.pos}</span></li>`
  ).join("");
}
document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", false); });
  btn.classList.add("active"); btn.setAttribute("aria-selected", true);
  pintar(btn.dataset.pos);
}));
pintar("Todos");

/* ====== NOTICIAS ====== */
document.getElementById("newsGrid").innerHTML = NOTICIAS.map(n =>
  `<article class="card"><time datetime="${n.fecha}">${new Date(n.fecha + "T00:00").toLocaleDateString("es-CO", { day: "numeric", month: "long" })}</time><h3>${n.titulo}</h3></article>`
).join("");

/* ====== FORMULARIO ====== */
document.getElementById("subscribe").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email");
  const msg = document.getElementById("formMsg");
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  msg.className = "msg " + (valido ? "ok" : "error");
  msg.textContent = valido ? "¡Listo! Te suscribiste correctamente." : "Escribe un correo válido, por ejemplo tu@correo.com.";
  if (valido) email.value = "";
});
