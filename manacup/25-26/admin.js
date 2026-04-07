// ═══════════════════════════════════════════════════════════════
//  ManaCup — Admin logic
//  Requires: supabase (global client), SUPABASE_URL, SUPABASE_ANON_KEY
//  Uses: admin-ops Edge Function with x-admin-key header
// ═══════════════════════════════════════════════════════════════

const ADMIN_OPS_URL = `${SUPABASE_URL}/functions/v1/admin-ops`;

// ── State ──────────────────────────────────────────────────────
let jugadors = [];
let rondes   = [];
let trobades = [];

// ── Admin key persistence ──────────────────────────────────────
function getAdminKey() {
  return document.getElementById("adminKey").value ||
    sessionStorage.getItem("adminKey") || "";
}
function saveAdminKey() {
  sessionStorage.setItem("adminKey", document.getElementById("adminKey").value);
  toast("Clau desada a la sessió", "success");
}

// ── Toast helper ───────────────────────────────────────────────
function toast(msg, type = "info") {
  const container = document.getElementById("toast-container");
  const id = "t" + Date.now();
  const colors = { success: "bg-success", danger: "bg-danger", info: "bg-primary", warning: "bg-warning" };
  container.insertAdjacentHTML("beforeend", `
    <div id="${id}" class="toast text-white ${colors[type] ?? "bg-primary"} show mb-1" role="alert">
      <div class="d-flex p-2 gap-2 align-items-center">
        <div class="toast-body p-0">${msg}</div>
        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`);
  setTimeout(() => document.getElementById(id)?.remove(), 4000);
}

// ── Admin API call ─────────────────────────────────────────────
async function adminOp(op, params = {}) {
  const res = await fetch(ADMIN_OPS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": getAdminKey(),
    },
    body: JSON.stringify({ op, ...params }),
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error ?? res.statusText);
  return json.data;
}

// ── Initial load ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  // Restore saved key
  const saved = sessionStorage.getItem("adminKey");
  if (saved) document.getElementById("adminKey").value = saved;

  // Load data in parallel
  await Promise.all([carregaJugadors(), carregaRondes(), carregaTrobades()]);
  carregaAparellaments();

  // Activate tab data on click
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener("shown.bs.tab", (e) => {
      const target = e.target.getAttribute("href");
      if (target === "#tab-aparellaments") carregaAparellaments();
    });
  });
});

// ══════════════════════════════════════════════════════════════
//  JUGADORS
// ══════════════════════════════════════════════════════════════

async function carregaJugadors() {
  const { data, error } = await supabase
    .from("jugadors")
    .select("*")
    .order("nom");
  if (error) { toast("Error carregant jugadors: " + error.message, "danger"); return; }
  jugadors = data;
  renderJugadors();
  renderSubstitucioSelects();
  renderJugadorSelects();
}

function renderJugadors() {
  const tbody = document.getElementById("bodyJugadors");
  tbody.innerHTML = jugadors.map(j => `
    <tr class="${j.baixa ? "table-secondary text-muted" : ""}">
      <td>${j.id}</td>
      <td>${esc(j.nom)}${j.baixa ? ' <span class="badge bg-secondary">Baixa</span>' : ""}</td>
      <td>${esc(j.email ?? "")}</td>
      <td>${esc(j.tel ?? "")}</td>
      <td>${j.baixa ? "Sí" : "No"}</td>
      <td class="badge-col">
        ${j.iron_mark    ? '<span class="badge bg-secondary me-1">Iron</span>'    : ""}
        ${j.golden_mark  ? '<span class="badge bg-warning text-dark me-1">Gold</span>'  : ""}
        ${j.diamond_mark ? '<span class="badge bg-info me-1">Diamond</span>'     : ""}
      </td>
      <td>
        <button class="btn btn-xs btn-sm btn-outline-primary py-0 px-1" onclick="openEditJugadorModal(${j.id})">
          <i class="bi bi-pencil"></i>
        </button>
        ${!j.baixa ? `<button class="btn btn-xs btn-sm btn-outline-danger py-0 px-1 ms-1" onclick="baixaJugador(${j.id})">
          <i class="bi bi-person-dash"></i>
        </button>` : ""}
      </td>
    </tr>`).join("");
}

function renderSubstitucioSelects() {
  const actius = jugadors.filter(j => !j.baixa);
  const tots   = jugadors;
  ["subOldPlayer", "subNewPlayer"].forEach((id, i) => {
    const sel = document.getElementById(id);
    const list = i === 0 ? actius : tots;
    sel.innerHTML = list.map(j => `<option value="${j.id}">${esc(j.nom)}${j.baixa ? " (baixa)" : ""}</option>`).join("");
  });
}

function renderJugadorSelects() {
  const opts = jugadors
    .filter(j => !j.baixa)
    .map(j => `<option value="${j.id}" data-nom="${esc(j.nom)}">${esc(j.nom)}</option>`)
    .join("");
  ["apJug1", "apJug2"].forEach(id => {
    document.getElementById(id).innerHTML = opts;
  });
}

function openAddJugadorModal() {
  document.getElementById("modalJugadorTitle").textContent = "Nou jugador";
  document.getElementById("jugadorId").value = "";
  ["jugadorNom","jugadorEmail","jugadorTel"].forEach(id => document.getElementById(id).value = "");
  ["jugadorIron","jugadorGolden","jugadorDiamond","jugadorBaixa"].forEach(id =>
    document.getElementById(id).checked = false);
  new bootstrap.Modal(document.getElementById("modalJugador")).show();
}

function openEditJugadorModal(id) {
  const j = jugadors.find(x => x.id === id);
  if (!j) return;
  document.getElementById("modalJugadorTitle").textContent = "Editar jugador";
  document.getElementById("jugadorId").value = j.id;
  document.getElementById("jugadorNom").value = j.nom ?? "";
  document.getElementById("jugadorEmail").value = j.email ?? "";
  document.getElementById("jugadorTel").value = j.tel ?? "";
  document.getElementById("jugadorIron").checked = !!j.iron_mark;
  document.getElementById("jugadorGolden").checked = !!j.golden_mark;
  document.getElementById("jugadorDiamond").checked = !!j.diamond_mark;
  document.getElementById("jugadorBaixa").checked = !!j.baixa;
  new bootstrap.Modal(document.getElementById("modalJugador")).show();
}

async function saveJugador() {
  const id = document.getElementById("jugadorId").value;
  const payload = {
    nom:          document.getElementById("jugadorNom").value.trim(),
    email:        document.getElementById("jugadorEmail").value.trim() || null,
    tel:          document.getElementById("jugadorTel").value.trim() || null,
    iron_mark:    document.getElementById("jugadorIron").checked,
    golden_mark:  document.getElementById("jugadorGolden").checked,
    diamond_mark: document.getElementById("jugadorDiamond").checked,
    baixa:        document.getElementById("jugadorBaixa").checked,
  };
  try {
    if (id) {
      await adminOp("update-jugador", { id: parseInt(id), ...payload });
      toast("Jugador actualitzat", "success");
    } else {
      await adminOp("add-jugador", payload);
      toast("Jugador afegit", "success");
    }
    bootstrap.Modal.getInstance(document.getElementById("modalJugador")).hide();
    await carregaJugadors();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

async function baixaJugador(id) {
  const j = jugadors.find(x => x.id === id);
  if (!confirm(`Marcar ${j?.nom} com a baixa?`)) return;
  try {
    await adminOp("baixa-jugador", { id });
    toast("Jugador marcat com a baixa", "success");
    await carregaJugadors();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

async function substituirJugador() {
  const old_id = parseInt(document.getElementById("subOldPlayer").value);
  const new_id = parseInt(document.getElementById("subNewPlayer").value);
  if (old_id === new_id) { toast("Selecciona jugadors diferents", "warning"); return; }
  const oldNom = jugadors.find(j => j.id === old_id)?.nom;
  const newNom = jugadors.find(j => j.id === new_id)?.nom;
  if (!confirm(`Substituir ${oldNom} per ${newNom} a totes les partides pendents?\nEl jugador ${oldNom} quedarà marcat com a baixa.`)) return;
  try {
    const res = await adminOp("substituir-jugador", { old_id, new_id });
    toast(`${res.substituted.from} → ${res.substituted.to} ✓`, "success");
    await carregaJugadors();
    carregaAparellaments();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

// ══════════════════════════════════════════════════════════════
//  RONDES
// ══════════════════════════════════════════════════════════════

async function carregaRondes() {
  const { data, error } = await supabase
    .from("rondes")
    .select("*")
    .order("id");
  if (error) { toast("Error carregant rondes: " + error.message, "danger"); return; }
  rondes = data;
  renderRondes();
  renderRondaSelects();
}

function renderRondes() {
  document.getElementById("bodyRondes").innerHTML = rondes.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${esc(r.nom ?? "")}</td>
      <td>${r.data_inici ? r.data_inici.slice(0,10) : "—"}</td>
      <td>${r.data_fi   ? r.data_fi.slice(0,10)   : "—"}</td>
      <td>${esc(r.estat ?? "")}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary py-0 px-1" onclick="openEditRondaModal(${r.id})">
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    </tr>`).join("");
}

function renderRondaSelects() {
  const opts = rondes.map(r => `<option value="${r.id}">${esc(r.nom ?? "Ronda " + r.id)}</option>`).join("");
  document.getElementById("apRonda").innerHTML = opts;
  document.getElementById("filtreRondaAp").innerHTML =
    '<option value="">Totes</option>' + opts;
}

function openEditRondaModal(id) {
  const r = rondes.find(x => x.id === id);
  if (!r) return;
  document.getElementById("rondaId").value = r.id;
  document.getElementById("rondaNom").value = r.nom ?? "";
  document.getElementById("rondaDataInici").value = r.data_inici ? r.data_inici.slice(0,10) : "";
  document.getElementById("rondaDataFi").value   = r.data_fi   ? r.data_fi.slice(0,10)   : "";
  document.getElementById("rondaEstat").value    = r.estat ?? "pendent";
  new bootstrap.Modal(document.getElementById("modalRonda")).show();
}

async function saveRonda() {
  const id = parseInt(document.getElementById("rondaId").value);
  const data = {
    nom:        document.getElementById("rondaNom").value.trim(),
    data_inici: document.getElementById("rondaDataInici").value || null,
    data_fi:    document.getElementById("rondaDataFi").value   || null,
    estat:      document.getElementById("rondaEstat").value,
  };
  try {
    await adminOp("update-ronda", { id, data });
    toast("Ronda actualitzada", "success");
    bootstrap.Modal.getInstance(document.getElementById("modalRonda")).hide();
    await carregaRondes();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

// ══════════════════════════════════════════════════════════════
//  TROBADES
// ══════════════════════════════════════════════════════════════

async function carregaTrobades() {
  const { data, error } = await supabase
    .from("trobades")
    .select("*")
    .order("data_hora");
  if (error) { toast("Error carregant trobades: " + error.message, "danger"); return; }
  trobades = data;
  renderTrobades();
}

function renderTrobades() {
  document.getElementById("bodyTrobades").innerHTML = trobades.map(t => `
    <tr>
      <td>${t.id}</td>
      <td>${esc(t.trobada ?? "")}</td>
      <td>${t.data_hora ? t.data_hora.replace("T"," ").slice(0,16) : "—"}</td>
      <td>${esc(t.lloc ?? "")}</td>
      <td>${t.sopar ? "Sí" : "No"}</td>
      <td>${t.confirmat ? "Sí" : "No"}</td>
      <td>${t.rondes_a_jugar ?? ""}</td>
      <td>${t.max_ronda ?? ""}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary py-0 px-1" onclick="openEditTrobadaModal(${t.id})">
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    </tr>`).join("");
}

function openAddTrobadaModal() {
  document.getElementById("modalTrobadaTitle").textContent = "Nova trobada";
  document.getElementById("trobadaId").value = "";
  ["trobadaNom","trobadaDataHora","trobadaLloc"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("trobadaRondes").value = 1;
  document.getElementById("trobadaMaxRonda").value = 0;
  document.getElementById("trobadaSopar").checked = false;
  document.getElementById("trobadaConf").checked  = false;
  document.getElementById("btnEliminaTrobada").style.display = "none";
  new bootstrap.Modal(document.getElementById("modalTrobada")).show();
}

function openEditTrobadaModal(id) {
  const t = trobades.find(x => x.id === id);
  if (!t) return;
  document.getElementById("modalTrobadaTitle").textContent = "Editar trobada";
  document.getElementById("trobadaId").value = t.id;
  document.getElementById("trobadaNom").value = t.trobada ?? "";
  document.getElementById("trobadaDataHora").value = t.data_hora ? t.data_hora.slice(0,16) : "";
  document.getElementById("trobadaLloc").value = t.lloc ?? "";
  document.getElementById("trobadaRondes").value  = t.rondes_a_jugar ?? 1;
  document.getElementById("trobadaMaxRonda").value = t.max_ronda ?? 0;
  document.getElementById("trobadaSopar").checked = !!t.sopar;
  document.getElementById("trobadaConf").checked  = !!t.confirmat;
  document.getElementById("btnEliminaTrobada").style.display = "";
  new bootstrap.Modal(document.getElementById("modalTrobada")).show();
}

async function saveTrobada() {
  const id = document.getElementById("trobadaId").value;
  const data = {
    trobada:        document.getElementById("trobadaNom").value.trim(),
    data_hora:      document.getElementById("trobadaDataHora").value || null,
    lloc:           document.getElementById("trobadaLloc").value.trim() || null,
    rondes_a_jugar: parseInt(document.getElementById("trobadaRondes").value) || 1,
    max_ronda:      parseInt(document.getElementById("trobadaMaxRonda").value) || 0,
    sopar:          document.getElementById("trobadaSopar").checked,
    confirmat:      document.getElementById("trobadaConf").checked,
  };
  try {
    if (id) {
      await adminOp("update-trobada", { id: parseInt(id), data });
      toast("Trobada actualitzada", "success");
    } else {
      await adminOp("add-trobada", { data });
      toast("Trobada afegida", "success");
    }
    bootstrap.Modal.getInstance(document.getElementById("modalTrobada")).hide();
    await carregaTrobades();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

async function deleteTrobada() {
  const id = parseInt(document.getElementById("trobadaId").value);
  const t = trobades.find(x => x.id === id);
  if (!confirm(`Eliminar la trobada "${t?.trobada}"? Això també eliminarà les assistències.`)) return;
  try {
    await adminOp("delete-trobada", { id });
    toast("Trobada eliminada", "success");
    bootstrap.Modal.getInstance(document.getElementById("modalTrobada")).hide();
    await carregaTrobades();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

// ══════════════════════════════════════════════════════════════
//  APARELLAMENTS
// ══════════════════════════════════════════════════════════════

async function carregaAparellaments() {
  const rondaFil = document.getElementById("filtreRondaAp")?.value;
  let q = supabase.from("partides").select("*").order("id_ronda").order("id");
  if (rondaFil) q = q.eq("id_ronda", rondaFil);
  const { data, error } = await q;
  if (error) { toast("Error carregant aparellaments: " + error.message, "danger"); return; }
  renderAparellaments(data);
}

function renderAparellaments(partides) {
  document.getElementById("bodyAparellaments").innerHTML = partides.map(p => {
    const ronda = rondes.find(r => r.id === p.id_ronda);
    const pendent = (p.puntuacio_1 ?? 0) === 0 && (p.puntuacio_2 ?? 0) === 0;
    return `
    <tr>
      <td>${p.id}</td>
      <td>${esc(ronda?.nom ?? p.id_ronda ?? "")}</td>
      <td>${esc(p.jugador_1 ?? "")}</td>
      <td>${pendent ? "—" : p.puntuacio_1}</td>
      <td>${esc(p.jugador_2 ?? "")}</td>
      <td>${pendent ? "—" : p.puntuacio_2}</td>
      <td>${esc(p.estat ?? (pendent ? "pendent" : ""))}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary py-0 px-1" onclick="openEditAparellamentModal(${p.id})">
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    </tr>`;
  }).join("");
}

let currentPartida = null;

function openAddAparellamentModal() {
  currentPartida = null;
  document.getElementById("modalApTitle").textContent = "Nou aparellament";
  document.getElementById("apId").value = "";
  document.getElementById("apPunts1").value = 0;
  document.getElementById("apPunts2").value = 0;
  document.getElementById("apEstat").value = "pendent";
  document.getElementById("btnEliminaAp").style.display = "none";
  new bootstrap.Modal(document.getElementById("modalAparellament")).show();
}

async function openEditAparellamentModal(id) {
  const rondaFil = document.getElementById("filtreRondaAp")?.value;
  let q = supabase.from("partides").select("*").eq("id", id).single();
  const { data: p, error } = await q;
  if (error) { toast("Error: " + error.message, "danger"); return; }
  currentPartida = p;

  document.getElementById("modalApTitle").textContent = "Editar aparellament #" + p.id;
  document.getElementById("apId").value = p.id;

  // Ronda select
  document.getElementById("apRonda").value = p.id_ronda ?? "";

  // Jugadors
  const sel1 = document.getElementById("apJug1");
  const sel2 = document.getElementById("apJug2");
  if ([...sel1.options].some(o => o.value == p.id_jugador_1))
    sel1.value = p.id_jugador_1;
  if ([...sel2.options].some(o => o.value == p.id_jugador_2))
    sel2.value = p.id_jugador_2;

  document.getElementById("apPunts1").value = p.puntuacio_1 ?? 0;
  document.getElementById("apPunts2").value = p.puntuacio_2 ?? 0;
  document.getElementById("apEstat").value = p.estat ?? "pendent";
  document.getElementById("btnEliminaAp").style.display = "";
  new bootstrap.Modal(document.getElementById("modalAparellament")).show();
}

function syncApNom(n) {
  const sel = document.getElementById(`apJug${n}`);
  const opt = sel.options[sel.selectedIndex];
  // nom is in data-nom attribute; used when saving
}

async function saveAparellament() {
  const id = document.getElementById("apId").value;
  const jug1sel = document.getElementById("apJug1");
  const jug2sel = document.getElementById("apJug2");
  const data = {
    id_ronda:     parseInt(document.getElementById("apRonda").value),
    id_jugador_1: parseInt(jug1sel.value),
    jugador_1:    jug1sel.options[jug1sel.selectedIndex]?.getAttribute("data-nom") ?? "",
    id_jugador_2: parseInt(jug2sel.value),
    jugador_2:    jug2sel.options[jug2sel.selectedIndex]?.getAttribute("data-nom") ?? "",
    puntuacio_1:  parseFloat(document.getElementById("apPunts1").value) || 0,
    puntuacio_2:  parseFloat(document.getElementById("apPunts2").value) || 0,
    estat:        document.getElementById("apEstat").value,
  };
  try {
    if (id) {
      await adminOp("update-aparellament", { id: parseInt(id), data });
      toast("Aparellament actualitzat", "success");
    } else {
      await adminOp("add-aparellament", { data });
      toast("Aparellament afegit", "success");
    }
    bootstrap.Modal.getInstance(document.getElementById("modalAparellament")).hide();
    carregaAparellaments();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

async function deleteAparellament() {
  const id = parseInt(document.getElementById("apId").value);
  if (!confirm(`Eliminar aparellament #${id}?`)) return;
  try {
    await adminOp("delete-aparellament", { id });
    toast("Aparellament eliminat", "success");
    bootstrap.Modal.getInstance(document.getElementById("modalAparellament")).hide();
    carregaAparellaments();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

function openImportModal() {
  document.getElementById("importData").value = "";
  new bootstrap.Modal(document.getElementById("modalImport")).show();
}

async function importAparellaments() {
  const raw = document.getElementById("importData").value.trim();
  let rows;
  try {
    // Try JSON first
    rows = JSON.parse(raw);
  } catch {
    // Try CSV
    rows = csvToJson(raw);
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    toast("Format invàlid. Necessita un array JSON o un CSV.", "warning");
    return;
  }
  try {
    const res = await adminOp("import-aparellaments", { rows });
    toast(`Importats ${res.upserted} aparellaments`, "success");
    bootstrap.Modal.getInstance(document.getElementById("modalImport")).hide();
    carregaAparellaments();
  } catch (e) {
    toast("Error: " + e.message, "danger");
  }
}

function csvToJson(csv) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(",").map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      const v = vals[i] ?? "";
      obj[h] = isNaN(v) || v === "" ? v : Number(v);
    });
    return obj;
  });
}

// ── Utils ──────────────────────────────────────────────────────
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
