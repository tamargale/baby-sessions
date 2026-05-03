import { useState, useEffect } from "react";

// ── נתוני ברירת מחדל ──────────────────────────────────────────
const DEFAULT_SESSIONS = [
  // ── קבוצה 3–8 חודשים ──
  {
    id: "m1",
    group: "young",
    day: "חמישי", date: "7/5",
    fullDate: "2026-05-07",
    emoji: "🌸",
    title: "העברת משקל לצד ימין ושמאל – בסיס להתהפכות ולזחילה",
    forWhom: "תינוקות 3–8 חודשים",
    whatWeLearn: "העברת משקל להתהפכות, תנועה במרחב וארגון הגוף ולהתפתחות סימטרית.",
    practice: "תנועה לצדדים, עידוד הגה לצעצועים, שימוש באביזרים שתומכים בתהליך",
  },
  {
    id: "m2",
    group: "young",
    day: "שני", date: "18/5",
    fullDate: "2026-05-18",
    emoji: "🌸",
    title: "משחקי קוקו ויסות תחושתי – הקשר לוויסות רגשי",
    forWhom: "תינוקות 3–8 חודשים",
    whatWeLearn: "הקשר בין משחקי קוקו, חזרתיות ותחושת צפייה – לבין ויסות תחושתי ורגשי.",
    practice: "משחקי קוקו, מגע ומרקמים שונים ליצירת חוויה מווסתת ונעימה",
  },
  {
    id: "m3",
    group: "young",
    day: "חמישי", date: "28/5",
    fullDate: "2026-05-28",
    emoji: "🌸",
    title: "תקשורת ראשונית והתפתחות שפה",
    forWhom: "תינוקות 3–8 חודשים",
    whatWeLearn: "קשר עין, קשר עם השפה, חיקוי בבסיס להתפתחות תקשורת ושפה.",
    practice: "משחקי קול, חיקוי הדדי, שירים, שימוש במשחק, לצד פעילויות שמעודדות ליצירת תקשורת וביטחון חברתי",
  },

  // ── קבוצה 8–12 חודשים ──
  {
    id: "m4",
    group: "older",
    day: "שלישי", date: "5/5",
    fullDate: "2026-05-05",
    emoji: "🌿",
    title: "שימוש בכפות הרגליים – מזחילה לעמידה ולהליכה",
    forWhom: "תינוקות 8–12 חודשים",
    whatWeLearn: "תפקיד כפות הרגליים במעברים, יציבות והתקדמות לעמידה והליכה.",
    practice: "דרך כפות הרגליים ותרגול מעברים – מגע, דחיפה, והליכה",
  },
  {
    id: "m5",
    group: "older",
    day: "שלישי", date: "12/5",
    fullDate: "2026-05-12",
    emoji: "🌿",
    title: "מדרגות, סולם ושיפוע – עלייה וירידה",
    forWhom: "תינוקות 8–12 חודשים",
    whatWeLearn: "שימוש לסירוגין ברגל ימין ושמאל, ארגון הגוף במעברים בין גבהים והקשר לתנועה סימטרית.",
    practice: "התנסות בעלייה וירידה במשטחים שונים, עידוד תנועה לסירוגין, וכוונה עדינה דרך מגע ונוחות ההורה",
  },
  {
    id: "m6",
    group: "older",
    day: "רביעי", date: "14/5",
    fullDate: "2026-05-14",
    emoji: "🌿",
    title: "המעבר לישיבה צידית",
    forWhom: "תינוקות 8–12 חודשים",
    whatWeLearn: "היכרות עם תנוחת הישיבה הצידית ומשמעותה, תרגול המעבר אליה ועידוד התפתחות סימטרית.",
    practice: "כוונה עדינה לישיבה הצידית, מגע שמלמד את התנוחה, ושימוש בצעצועים לעידוד הגעה לישיבה",
  },
  {
    id: "m7",
    group: "older",
    day: "שלישי", date: "19/5",
    fullDate: "2026-05-19",
    emoji: "🌿",
    title: "שיווי משקל ונפילה בטוחה",
    forWhom: "תינוקות 8–12 חודשים",
    whatWeLearn: "התנסות במצבי שיווי משקל משתנים, עידוד תגובות ידיים ונפילה מבוקרת.",
    practice: "משחק מבוקרת דרך מגע, מע, ותמיכה של ההורה",
  },
  {
    id: "m8",
    group: "young",
    day: "שני", date: "25/5",
    fullDate: "2026-05-25",
    emoji: "🌸",
    title: "איזון, רוגע וחיזוק עם פרחי באך",
    forWhom: "אמהות עם תינוקות 2–9 חודשים",
    whatWeLearn: "היכרות עם פרחי באך וכיצד ניתן לעזור עם הם במצבים של חוסר שקט, עייפות ואופם בשגרת היום-יום.",
    practice: "היכרות עם השיטה ותמציות, שיח אישי ותמון",
  },
  {
    id: "m9",
    group: "older",
    day: "שלישי", date: "26/5",
    fullDate: "2026-05-26",
    emoji: "🌿",
    title: "חיזוק חגורת הכתפיים",
    forWhom: "תינוקות 8–12 חודשים",
    whatWeLearn: "חיזוק הכתפיים כבסיס לזחילה, טיפוס, מעבר לעמידה ושימוש מדויק ביידיים – כולל התחלה של מוטוריקה עדינה.",
    practice: "נשיאת משקל על הידיים, דחיפה והמשכה דרך פעילויות שמעודדות שימוש בכפות שמעודדות",
  },
];

const GROUPS = [
  { value: "all", label: "כל המפגשים" },
  { value: "young", label: "3–8 חודשים 🌸" },
  { value: "older", label: "8–12 חודשים 🌿" },
];

const DAYS = ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
const ADMIN_PASSWORD = "bach";

function sortByDate(arr) {
  return [...arr].sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
}

export default function App() {
  const [sessions, setSessions] = useState(DEFAULT_SESSIONS);
  const [regs, setRegs] = useState({});
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("sessions");
  const [target, setTarget] = useState(null);
  const [form, setForm] = useState({ parentName: "", babyName: "" });
  const [formMsg, setFormMsg] = useState(null);
  const [adminPass, setAdminPass] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  // editing registrants
  const [editMode, setEditMode] = useState(null);
  const [editVal, setEditVal] = useState({ parentName: "", babyName: "" });
  // editing session content
  const [editSessionId, setEditSessionId] = useState(null);
  const [editSession, setEditSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await window.storage.get("regs_may26");
        if (r) setRegs(JSON.parse(r.value));
        const s = await window.storage.get("sessions_may26");
        if (s) setSessions(JSON.parse(s.value));
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  async function saveRegs(newR) {
    setRegs(newR);
    try { await window.storage.set("regs_may26", JSON.stringify(newR)); } catch {}
  }

  async function saveSessions(newS) {
    setSessions(newS);
    try { await window.storage.set("sessions_may26", JSON.stringify(newS)); } catch {}
  }

  function startEditSession(s) {
    setEditSessionId(s.id);
    setEditSession({ ...s });
  }

  async function saveEditSession() {
    // derive emoji and forWhom from group if changed
    const grp = editSession.group;
    const emoji = grp === "young" ? "🌸" : "🌿";
    const updated = sessions.map(s => s.id === editSession.id ? { ...editSession, emoji } : s);
    await saveSessions(updated);
    setEditSessionId(null);
    setEditSession(null);
  }

  function getSessionRegs(sid) {
    return regs[sid] || { confirmed: [], waitlist: [] };
  }

  const filtered = sortByDate(
    filter === "all" ? sessions : sessions.filter(s => s.group === filter)
  );

  function openRegister(session) {
    setTarget(session);
    setForm({ parentName: "", babyName: "" });
    setFormMsg(null);
    setView("register");
  }

  async function handleRegister() {
    if (!form.parentName.trim() || !form.babyName.trim()) {
      setFormMsg({ type: "error", text: "נא למלא שם הורה ושם תינוק/ת" });
      return;
    }
    const sid = target.id;
    const r = getSessionRegs(sid);
    const entry = { parentName: form.parentName.trim(), babyName: form.babyName.trim(), ts: Date.now() };
    let updated, msg;
    if (r.confirmed.length < 6) {
      updated = { ...r, confirmed: [...r.confirmed, entry] };
      msg = { type: "success", text: `🎉 נרשמת בהצלחה למפגש ${target.day} ${target.date}!` };
    } else {
      updated = { ...r, waitlist: [...r.waitlist, entry] };
      msg = { type: "waitlist", text: `הצטרפת לרשימת ההמתנה ⏳ נודיע לך אם יפתח מקום.` };
    }
    await saveRegs({ ...regs, [sid]: updated });
    setFormMsg(msg);
  }

  async function handleDelete(sid, list, idx) {
    const r = getSessionRegs(sid);
    const updated = { ...r, [list]: r[list].filter((_, i) => i !== idx) };
    await saveRegs({ ...regs, [sid]: updated });
  }

  async function handleEdit(sid, list, idx) {
    const r = getSessionRegs(sid);
    const updated = { ...r, [list]: r[list].map((e, i) => i === idx ? { ...e, ...editVal } : e) };
    await saveRegs({ ...regs, [sid]: updated });
    setEditMode(null);
  }

  async function handleMoveToConfirmed(sid, idx) {
    const r = getSessionRegs(sid);
    if (r.confirmed.length >= 6) return;
    const entry = r.waitlist[idx];
    const updated = {
      confirmed: [...r.confirmed, entry],
      waitlist: r.waitlist.filter((_, i) => i !== idx),
    };
    await saveRegs({ ...regs, [sid]: updated });
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fdf8f3" }}>
      <p style={{ color: "#a07060", fontFamily: "serif", fontSize: "1.2rem" }}>טוענת...</p>
    </div>
  );

  const groupColor = { young: { accent: "#c9657d", light: "#fde8ee", badge: "#f9d0dc" }, older: { accent: "#4a8c6e", light: "#e4f3ec", badge: "#c5e8d8" } };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#fdf8f3", fontFamily: "'Noto Serif Hebrew', Georgia, serif", color: "#2d2018" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn { cursor: pointer; border: none; font-family: inherit; transition: all 0.18s ease; }
        .btn:hover { filter: brightness(0.93); transform: translateY(-1px); }
        .btn:active { transform: translateY(0); }
        input { font-family: inherit; }
        .card { background: #fff; border-radius: 18px; box-shadow: 0 3px 22px rgba(80,40,20,0.07); }
        .fade { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .pill { display:inline-block; border-radius:30px; padding:3px 13px; font-size:0.78rem; font-weight:700; letter-spacing:0.02em; }
        .entry-row { display:flex; align-items:center; gap:0.5rem; padding:0.42rem 0.7rem; border-radius:8px; font-size:0.87rem; }
        .entry-row:hover { background:#faf5f0; }
        input[type=text] { border:1.5px solid #e0d0c0; border-radius:9px; padding:0.55rem 0.85rem; font-size:0.95rem; width:100%; color:#2d2018; background:#fefcfa; outline:none; transition:border 0.15s; direction:rtl; }
        input[type=text]:focus { border-color:#c9657d; }
        .tab-btn { cursor:pointer; border:none; font-family:inherit; transition:all 0.18s; border-radius:24px; padding:0.48rem 1.2rem; font-size:0.9rem; font-weight:600; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ background: "linear-gradient(160deg, #2d2018 0%, #7a3f2a 100%)", padding: "2.2rem 1.2rem 1.8rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,220,180,0.06)" }} />
        <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>🌸🌿</div>
        <h1 style={{ color: "#fdf5ec", fontSize: "clamp(1.6rem,5vw,2.3rem)", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.2rem" }}>
          ליווי התפתחותי לתינוקות
        </h1>
        <p style={{ color: "#d4a882", fontSize: "0.92rem", fontWeight: 300, marginBottom: "0.15rem" }}>
          בטי כהן קובלסקי
        </p>
        <p style={{ color: "#c49060", fontSize: "1.05rem", fontWeight: 600, marginBottom: "1.2rem" }}>מאי 2026</p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          {[{ v: "sessions", l: "מפגשים" }, { v: "admin", l: "ניהול ⚙️" }].map(t => (
            <button key={t.v} className="tab-btn" onClick={() => setView(t.v)}
              style={{ background: view === t.v ? "#d4916a" : "rgba(255,255,255,0.13)", color: "#fdf5ec" }}>
              {t.l}
            </button>
          ))}
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "1.8rem 1rem 4rem" }}>

        {/* ══ SESSIONS ══ */}
        {(view === "sessions" || view === "register") && view !== "register" && (
          <div className="fade">
            {/* filter tabs */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.6rem" }}>
              {GROUPS.map(g => (
                <button key={g.value} className="tab-btn"
                  onClick={() => setFilter(g.value)}
                  style={{
                    background: filter === g.value ? "#2d2018" : "#fff",
                    color: filter === g.value ? "#fdf5ec" : "#7a3f2a",
                    border: "1.5px solid #e0d0c0",
                    fontSize: "0.88rem",
                  }}>
                  {g.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {filtered.map((s, i) => {
                const r = getSessionRegs(s.id);
                const full = r.confirmed.length >= 6;
                const gc = groupColor[s.group];
                return (
                  <div key={s.id} className="card fade" style={{ borderRight: `4px solid ${gc.accent}`, padding: "1.3rem 1.4rem", animationDelay: `${i * 0.05}s` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.7rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "1rem" }}>{s.emoji}</span>
                        <span className="pill" style={{ background: gc.badge, color: gc.accent }}>{s.forWhom}</span>
                        <span style={{ color: "#9a7060", fontSize: "0.85rem" }}>{s.day} {s.date}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.82rem", color: full ? "#c05030" : "#4a8c6e", fontWeight: 600 }}>
                          {r.confirmed.length}/6 רשומות
                        </span>
                        {r.waitlist.length > 0 && <span style={{ fontSize: "0.78rem", color: "#9a7060" }}>+{r.waitlist.length} המתנה</span>}
                      </div>
                    </div>

                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#2d2018", marginBottom: "0.45rem", lineHeight: 1.45 }}>{s.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#7a5a48", lineHeight: 1.55, marginBottom: "0.3rem" }}>
                      <strong>מה נעמיק:</strong> {s.whatWeLearn}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#7a5a48", lineHeight: 1.55, marginBottom: "1rem" }}>
                      <strong>תרגול:</strong> {s.practice}
                    </p>

                    {/* spots bar */}
                    <div style={{ display: "flex", gap: "4px", marginBottom: "0.85rem" }}>
                      {[0,1,2,3,4,5].map(i => (
                        <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < r.confirmed.length ? gc.accent : "#ede3da" }} />
                      ))}
                    </div>

                    <button className="btn" onClick={() => openRegister(s)}
                      style={{
                        background: full ? "#f0e8e0" : gc.accent,
                        color: full ? "#8a6050" : "#fff",
                        padding: "0.55rem 1.3rem", borderRadius: "11px", fontSize: "0.9rem", fontWeight: 600,
                      }}>
                      {full ? "⏳ הצטרפי לרשימת המתנה" : "הירשמי למפגש ←"}
                    </button>

                    {/* registered names */}
                    {(r.confirmed.length > 0 || r.waitlist.length > 0) && (
                      <div style={{ marginTop: "1rem", paddingTop: "0.8rem", borderTop: "1px solid #f0e4d8" }}>
                        {r.confirmed.length > 0 && (
                          <div style={{ marginBottom: r.waitlist.length > 0 ? "0.5rem" : 0 }}>
                            <p style={{ fontSize: "0.78rem", color: "#4a8c6e", fontWeight: 700, marginBottom: "0.3rem" }}>✅ רשומות:</p>
                            <p style={{ fontSize: "0.85rem", color: "#5a4035", lineHeight: 1.7 }}>
                              {r.confirmed.map((e, i) => (
                                <span key={i}>{e.parentName} &amp; {e.babyName}{i < r.confirmed.length - 1 ? " · " : ""}</span>
                              ))}
                            </p>
                          </div>
                        )}
                        {r.waitlist.length > 0 && (
                          <div>
                            <p style={{ fontSize: "0.78rem", color: "#c9657d", fontWeight: 700, marginBottom: "0.3rem" }}>⏳ המתנה:</p>
                            <p style={{ fontSize: "0.85rem", color: "#8a6058", lineHeight: 1.7 }}>
                              {r.waitlist.map((e, i) => (
                                <span key={i}>{e.parentName} &amp; {e.babyName}{i < r.waitlist.length - 1 ? " · " : ""}</span>
                              ))}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ REGISTER ══ */}
        {view === "register" && target && (
          <div className="fade">
            <button className="btn" onClick={() => setView("sessions")}
              style={{ background: "none", color: "#7a3f2a", fontSize: "0.92rem", marginBottom: "1.1rem", display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 600 }}>
              ← חזרה למפגשים
            </button>
            <div className="card" style={{ padding: "1.8rem" }}>
              <div style={{ marginBottom: "1.4rem", paddingBottom: "1rem", borderBottom: "1px solid #f0e4d8" }}>
                <span className="pill" style={{ background: groupColor[target.group].badge, color: groupColor[target.group].accent, marginBottom: "0.5rem", display: "inline-block" }}>
                  {target.forWhom}
                </span>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2d2018", margin: "0.4rem 0 0.2rem", lineHeight: 1.4 }}>{target.title}</h2>
                <p style={{ color: "#9a7060", fontSize: "0.88rem" }}>{target.day} {target.date}</p>
                {(() => {
                  const r = getSessionRegs(target.id);
                  return r.confirmed.length >= 6 && (
                    <div style={{ marginTop: "0.8rem", background: "#fff4ee", border: "1px solid #f0c4a0", borderRadius: "10px", padding: "0.65rem 1rem", color: "#a05020", fontSize: "0.88rem" }}>
                      ⚠️ המפגש מלא – ההרשמה תכניס אותך לרשימת המתנה
                    </div>
                  );
                })()}
              </div>

              {formMsg ? (
                <div style={{
                  padding: "1.5rem", borderRadius: "13px", textAlign: "center",
                  background: formMsg.type === "success" ? "#edf7f0" : formMsg.type === "waitlist" ? "#fff8ed" : "#fef0ee",
                  color: formMsg.type === "success" ? "#1a6b40" : formMsg.type === "waitlist" ? "#8a5800" : "#c0392b",
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    {formMsg.type === "success" ? "🎉" : formMsg.type === "waitlist" ? "⏳" : "⚠️"}
                  </div>
                  <p style={{ fontSize: "1rem", lineHeight: 1.6 }}>{formMsg.text}</p>
                  <button className="btn" onClick={() => setView("sessions")}
                    style={{ marginTop: "1.2rem", background: "#2d2018", color: "#fdf5ec", padding: "0.6rem 1.5rem", borderRadius: "10px", fontSize: "0.9rem" }}>
                    חזרה למפגשים
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { label: "שם ההורה", key: "parentName", placeholder: "שם פרטי" },
                    { label: "שם התינוק/ת", key: "babyName", placeholder: "שם פרטי" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "0.86rem", color: "#7a3f2a", fontWeight: 700, marginBottom: "0.35rem" }}>{f.label}</label>
                      <input type="text" placeholder={f.placeholder} value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                    </div>
                  ))}
                  {formMsg?.type === "error" && <p style={{ color: "#c0392b", fontSize: "0.87rem" }}>{formMsg.text}</p>}
                  <button className="btn" onClick={handleRegister}
                    style={{ background: "#2d2018", color: "#fdf5ec", padding: "0.72rem", borderRadius: "11px", fontSize: "1rem", fontWeight: 600, marginTop: "0.3rem" }}>
                    שלחי הרשמה 🌿
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ ADMIN ══ */}
        {view === "admin" && (
          <div className="fade">
            {!adminUnlocked ? (
              <div className="card" style={{ padding: "2rem", maxWidth: 360, margin: "0 auto", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.7rem" }}>🔒</div>
                <h2 style={{ color: "#2d2018", marginBottom: "1.2rem", fontSize: "1.2rem" }}>כניסה לניהול</h2>
                <input type="text" placeholder="סיסמה" value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && adminPass === ADMIN_PASSWORD) setAdminUnlocked(true); }}
                  style={{ textAlign: "center", marginBottom: "1rem" }} />
                <button className="btn" style={{ width: "100%", background: "#2d2018", color: "#fdf5ec", padding: "0.68rem", borderRadius: "10px", fontSize: "1rem" }}
                  onClick={() => { if (adminPass === ADMIN_PASSWORD) setAdminUnlocked(true); else alert("סיסמה שגויה"); }}>
                  כניסה
                </button>

              </div>
            ) : (
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2d2018", marginBottom: "1.3rem" }}>📋 רשימות משתתפות ועריכת מפגשים</h2>
                {sortByDate(sessions).map(s => {
                  const r = getSessionRegs(s.id);
                  const gc = groupColor[s.group];
                  const isEditingSession = editSessionId === s.id;
                  return (
                    <div key={s.id} className="card" style={{ marginBottom: "1.2rem", padding: "1.2rem 1.3rem", borderRight: `3px solid ${isEditingSession ? "#c9657d" : gc.accent}` }}>
                      
                      {/* session info / edit */}
                      {isEditingSession && editSession ? (
                        <div style={{ marginBottom: "1rem", padding: "1rem", background: "#fdf5f0", borderRadius: "12px" }}>
                          <p style={{ fontSize: "0.82rem", color: "#7a3f2a", fontWeight: 700, marginBottom: "0.7rem" }}>✏️ עריכת פרטי המפגש</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>יום</label>
                                <select value={editSession.day} onChange={e => setEditSession(p => ({ ...p, day: e.target.value }))}
                                  style={{ width: "100%", border: "1.5px solid #e0d0c0", borderRadius: "8px", padding: "0.45rem 0.6rem", fontSize: "0.9rem", fontFamily: "inherit", background: "#fff", direction: "rtl" }}>
                                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>תאריך (לדוגמה: 7/5)</label>
                                <input type="text" value={editSession.date} onChange={e => setEditSession(p => ({ ...p, date: e.target.value }))} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>תאריך מלא</label>
                                <input type="date" value={editSession.fullDate} onChange={e => setEditSession(p => ({ ...p, fullDate: e.target.value }))}
                                  style={{ width: "100%", border: "1.5px solid #e0d0c0", borderRadius: "8px", padding: "0.45rem 0.6rem", fontSize: "0.88rem", fontFamily: "inherit", direction: "rtl" }} />
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>קטגוריה</label>
                              <select value={editSession.group} onChange={e => setEditSession(p => ({ ...p, group: e.target.value }))}
                                style={{ width: "100%", border: "1.5px solid #e0d0c0", borderRadius: "8px", padding: "0.45rem 0.6rem", fontSize: "0.9rem", fontFamily: "inherit", background: "#fff", direction: "rtl" }}>
                                <option value="young">3–8 חודשים 🌸</option>
                                <option value="older">8–12 חודשים 🌿</option>
                              </select>
                            </div>
                            <div>
                              <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>למי מיועד (טקסט חופשי)</label>
                              <input type="text" value={editSession.forWhom} onChange={e => setEditSession(p => ({ ...p, forWhom: e.target.value }))} />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>כותרת</label>
                              <input type="text" value={editSession.title} onChange={e => setEditSession(p => ({ ...p, title: e.target.value }))} />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>מה נעמיק</label>
                              <textarea value={editSession.whatWeLearn} onChange={e => setEditSession(p => ({ ...p, whatWeLearn: e.target.value }))}
                                style={{ width: "100%", border: "1.5px solid #e0d0c0", borderRadius: "9px", padding: "0.55rem 0.85rem", fontSize: "0.9rem", fontFamily: "inherit", minHeight: 65, resize: "vertical", direction: "rtl", background: "#fefcfa" }} />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.78rem", color: "#7a3f2a", fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>תרגול</label>
                              <textarea value={editSession.practice} onChange={e => setEditSession(p => ({ ...p, practice: e.target.value }))}
                                style={{ width: "100%", border: "1.5px solid #e0d0c0", borderRadius: "9px", padding: "0.55rem 0.85rem", fontSize: "0.9rem", fontFamily: "inherit", minHeight: 65, resize: "vertical", direction: "rtl", background: "#fefcfa" }} />
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
                              <button className="btn" onClick={saveEditSession}
                                style={{ background: "#2d2018", color: "#fdf5ec", padding: "0.5rem 1.2rem", borderRadius: "9px", fontSize: "0.88rem", fontWeight: 600 }}>
                                שמור שינויים ✓
                              </button>
                              <button className="btn" onClick={() => { setEditSessionId(null); setEditSession(null); }}
                                style={{ background: "#f0e8e0", color: "#7a3f2a", padding: "0.5rem 1rem", borderRadius: "9px", fontSize: "0.88rem" }}>
                                ביטול
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.8rem" }}>
                          <div>
                            <span className="pill" style={{ background: gc.badge, color: gc.accent, marginLeft: "0.5rem" }}>{s.forWhom}</span>
                            <strong style={{ fontSize: "0.97rem" }}>{s.day} {s.date}</strong>
                            <span style={{ color: "#9a7060", fontSize: "0.85rem", marginRight: "0.5rem" }}>— {s.title}</span>
                          </div>
                          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: r.confirmed.length >= 6 ? "#c05030" : "#4a8c6e" }}>
                              {r.confirmed.length}/6
                            </span>
                            <button className="btn" onClick={() => startEditSession(s)}
                              style={{ background: "#f0eae0", color: "#7a3f2a", padding: "0.25rem 0.7rem", borderRadius: "7px", fontSize: "0.8rem" }}>
                              ✏️ ערכי מפגש
                            </button>
                          </div>
                        </div>
                      )}

                      {/* confirmed */}
                      {r.confirmed.length === 0 && r.waitlist.length === 0 && (
                        <p style={{ color: "#c0b0a0", fontSize: "0.85rem" }}>אין רשומות עדיין</p>
                      )}
                      {r.confirmed.length > 0 && (
                        <div style={{ marginBottom: "0.7rem" }}>
                          <p style={{ fontSize: "0.8rem", color: "#4a8c6e", fontWeight: 700, marginBottom: "0.35rem" }}>✅ רשומות</p>
                          {r.confirmed.map((e, idx) => {
                            const isEditing = editMode?.sessionId === s.id && editMode?.list === "confirmed" && editMode?.idx === idx;
                            return (
                              <div key={idx} className="entry-row">
                                {isEditing ? (
                                  <>
                                    <input type="text" value={editVal.parentName} onChange={ev => setEditVal(p => ({ ...p, parentName: ev.target.value }))} placeholder="הורה" style={{ flex: 1 }} />
                                    <input type="text" value={editVal.babyName} onChange={ev => setEditVal(p => ({ ...p, babyName: ev.target.value }))} placeholder="תינוק/ת" style={{ flex: 1 }} />
                                    <button className="btn" onClick={() => handleEdit(s.id, "confirmed", idx)}
                                      style={{ background: "#4a8c6e", color: "#fff", padding: "0.3rem 0.7rem", borderRadius: "7px", fontSize: "0.8rem" }}>שמור</button>
                                    <button className="btn" onClick={() => setEditMode(null)}
                                      style={{ background: "#eee", color: "#555", padding: "0.3rem 0.6rem", borderRadius: "7px", fontSize: "0.8rem" }}>ביטול</button>
                                  </>
                                ) : (
                                  <>
                                    <span style={{ flex: 1, color: "#3a2820" }}>{e.parentName}</span>
                                    <span style={{ flex: 1, color: "#6a4838" }}>{e.babyName}</span>
                                    <button className="btn" onClick={() => { setEditMode({ sessionId: s.id, list: "confirmed", idx }); setEditVal({ parentName: e.parentName, babyName: e.babyName }); }}
                                      style={{ background: "#f0eae0", color: "#7a3f2a", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.78rem" }}>עריכה</button>
                                    <button className="btn" onClick={() => handleDelete(s.id, "confirmed", idx)}
                                      style={{ background: "#fde8e8", color: "#c0392b", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.78rem" }}>הסר</button>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* waitlist */}
                      {r.waitlist.length > 0 && (
                        <div>
                          <p style={{ fontSize: "0.8rem", color: "#c9657d", fontWeight: 700, marginBottom: "0.35rem" }}>⏳ המתנה</p>
                          {r.waitlist.map((e, idx) => {
                            const isEditing = editMode?.sessionId === s.id && editMode?.list === "waitlist" && editMode?.idx === idx;
                            return (
                              <div key={idx} className="entry-row">
                                {isEditing ? (
                                  <>
                                    <input type="text" value={editVal.parentName} onChange={ev => setEditVal(p => ({ ...p, parentName: ev.target.value }))} placeholder="הורה" style={{ flex: 1 }} />
                                    <input type="text" value={editVal.babyName} onChange={ev => setEditVal(p => ({ ...p, babyName: ev.target.value }))} placeholder="תינוק/ת" style={{ flex: 1 }} />
                                    <button className="btn" onClick={() => handleEdit(s.id, "waitlist", idx)}
                                      style={{ background: "#4a8c6e", color: "#fff", padding: "0.3rem 0.7rem", borderRadius: "7px", fontSize: "0.8rem" }}>שמור</button>
                                    <button className="btn" onClick={() => setEditMode(null)}
                                      style={{ background: "#eee", color: "#555", padding: "0.3rem 0.6rem", borderRadius: "7px", fontSize: "0.8rem" }}>ביטול</button>
                                  </>
                                ) : (
                                  <>
                                    <span style={{ flex: 1, color: "#3a2820" }}>{e.parentName}</span>
                                    <span style={{ flex: 1, color: "#6a4838" }}>{e.babyName}</span>
                                    {r.confirmed.length < 6 && (
                                      <button className="btn" onClick={() => handleMoveToConfirmed(s.id, idx)}
                                        style={{ background: "#e4f3ec", color: "#4a8c6e", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.78rem" }}>העבר לרשומות</button>
                                    )}
                                    <button className="btn" onClick={() => { setEditMode({ sessionId: s.id, list: "waitlist", idx }); setEditVal({ parentName: e.parentName, babyName: e.babyName }); }}
                                      style={{ background: "#f0eae0", color: "#7a3f2a", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.78rem" }}>עריכה</button>
                                    <button className="btn" onClick={() => handleDelete(s.id, "waitlist", idx)}
                                      style={{ background: "#fde8e8", color: "#c0392b", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.78rem" }}>הסר</button>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "1.5rem", color: "#b09080", fontSize: "0.82rem" }}>
        בטי כהן קובלסקי | ליווי התפתחותי וטיפול הוליסטי | 054-4520125
      </footer>
    </div>
  );
}
