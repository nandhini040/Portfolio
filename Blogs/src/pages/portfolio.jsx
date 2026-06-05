import { useState, useEffect, useRef } from "react";

const roles = ["Software Engineer", "Full Stack Python Developer", "Python Engineer", "Problem Solver", "Web Developer"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg1: #0a0a0f;
    --bg2: #111118;
    --bg3: #16161f;
    --bg4: #1c1c28;
    --border: rgba(167,139,250,0.12);
    --accent: #a78bfa;
    --accent2: #7c3aed;
    --text: #f0eeff;
    --muted: #8b8ba0;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body, #root { background:var(--bg1); color:var(--text); font-family:var(--font-body); min-height:100vh; overflow-x:hidden; }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

  nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    display:flex; align-items:center; justify-content:space-between;
    padding:0 clamp(16px,5vw,64px); height:64px;
    background:rgba(10,10,15,0.88); backdrop-filter:blur(20px);
    border-bottom:1px solid var(--border);
  }
  .nav-logo {
    font-family:var(--font-display); font-size:24px; font-weight:800;
    background:linear-gradient(135deg,#a78bfa,#60a5fa);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    cursor:pointer;
  }
  .nav-links { display:flex; gap:4px; }
  .nav-links a {
    color:var(--muted); font-size:13px; font-weight:500;
    padding:6px 14px; border-radius:8px; cursor:pointer;
    transition:all .2s; text-decoration:none; border:1px solid transparent;
  }
  .nav-links a:hover, .nav-links a.active {
    color:var(--accent); background:rgba(167,139,250,.08); border-color:rgba(167,139,250,.2);
  }
  .menu-btn { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:8px; }
  .menu-btn span { display:block; width:22px; height:2px; background:var(--muted); border-radius:2px; transition:all .3s; }

  @media(max-width:680px) {
    .nav-links { display:none; }
    .menu-btn { display:flex; }
    .nav-links.open {
      display:flex; flex-direction:column; position:fixed;
      top:64px; left:0; right:0;
      background:rgba(10,10,15,.98); backdrop-filter:blur(20px);
      padding:16px; border-bottom:1px solid var(--border);
      animation:fadeIn .2s ease;
    }
    .nav-links.open a { padding:12px 16px; font-size:15px; }
  }

  section { padding:80px clamp(16px,5vw,64px); }
  .hero-section { padding-top:80px; min-height:100vh; display:flex; align-items:center; }
  .container { max-width:1100px; margin:0 auto; }

  .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
  @media(max-width:768px) {
    .hero-grid { grid-template-columns:1fr; text-align:center; }
    .hero-grid>.hero-right { order:-1; }
    .hero-btns, .hero-socials { justify-content:center !important; }
  }

  .pill {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(167,139,250,.08); border:1px solid rgba(167,139,250,.25);
    border-radius:100px; padding:6px 14px; font-size:12px; color:var(--accent); font-weight:500;
  }
  .highlight {
    background:linear-gradient(135deg,#a78bfa,#60a5fa);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  }
  .btn {
    display:inline-flex; align-items:center; gap:8px; padding:11px 24px;
    border-radius:12px; font-size:14px; font-weight:600; cursor:pointer;
    transition:all .2s; text-decoration:none; border:none; font-family:var(--font-body);
  }
  .btn-primary { background:linear-gradient(135deg,#7c3aed,#a78bfa); color:#fff; }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(124,58,237,.4); }
  .btn-outline { background:transparent; color:var(--text); border:1px solid var(--border); }
  .btn-outline:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }

  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
  @media(max-width:400px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }

  .section-label { font-size:11px; letter-spacing:.18em; color:var(--accent); font-weight:600; text-transform:uppercase; margin-bottom:8px; }
  .section-title { font-family:var(--font-display); font-size:clamp(28px,5vw,48px); font-weight:800; line-height:1.1; margin-bottom:14px; letter-spacing:-.02em; }
  .divider { width:48px; height:3px; background:linear-gradient(90deg,#7c3aed,#a78bfa); border-radius:2px; margin-bottom:40px; }

  .card { background:var(--bg3); border:1px solid var(--border); border-radius:16px; transition:all .25s; }
  .card:hover { border-color:rgba(167,139,250,.3); transform:translateY(-3px); }

  .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:14px; margin-bottom:40px; }

  .about-bio-grid { display:grid; grid-template-columns:1fr 320px; gap:48px; margin-bottom:60px; }
  @media(max-width:900px) { .about-bio-grid { grid-template-columns:1fr; } }

  .projects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:22px; }

  .resume-grid { display:grid; grid-template-columns:1fr 300px; gap:40px; }
  @media(max-width:900px) { .resume-grid { grid-template-columns:1fr; } }

  .contact-grid { display:grid; grid-template-columns:1fr 340px; gap:28px; }
  @media(max-width:900px) { .contact-grid { grid-template-columns:1fr; } }

  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
  @media(max-width:500px) { .form-row { grid-template-columns:1fr; } }

  .bg-dots { position:fixed; inset:0; pointer-events:none; z-index:0; background-image:radial-gradient(circle,rgba(167,139,250,.04) 1px,transparent 1px); background-size:32px 32px; }
  .glow-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; filter:blur(90px); opacity:.1; }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:var(--bg1); }
  ::-webkit-scrollbar-thumb { background:rgba(167,139,250,.3); border-radius:4px; }
`;

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const target = roles[idx];
    if (typing) {
      if (text.length < target.length) { const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 60); return () => clearTimeout(t); }
      else { const t = setTimeout(() => setTyping(false), 1800); return () => clearTimeout(t); }
    } else {
      if (text.length > 0) { const t = setTimeout(() => setText(s => s.slice(0, -1)), 30); return () => clearTimeout(t); }
      else { setIdx(i => (i + 1) % roles.length); setTyping(true); }
    }
  }, [text, typing, idx]);
  return (
    <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(15px,2.5vw,23px)", fontWeight:700, color:"var(--muted)", marginBottom:"24px", minHeight:"30px" }}>
      {text}<span style={{ borderRight:"2px solid var(--accent)", marginLeft:"2px", animation:"blink 1s step-end infinite" }}>&nbsp;</span>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:`opacity .6s ease ${delay}ms,transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function SkillCard({ name, icon, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:"relative", overflow:"hidden",
        background: hov ? `linear-gradient(135deg,${color}22,${color}0a)` : "var(--bg3)",
        border:`1px solid ${hov ? color+"66" : "var(--border)"}`,
        borderRadius:"18px", padding:"24px 20px",
        cursor:"default", transition:"all .35s ease",
        transform: hov ? "translateY(-6px) scale(1.03)" : "none",
        boxShadow: hov ? `0 16px 40px ${color}30` : "none",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"14px",
      }}>
      {/* Glow blob */}
      <div style={{
        position:"absolute", top:"-30px", right:"-30px",
        width:"80px", height:"80px", borderRadius:"50%",
        background: color+"33", filter:"blur(24px)",
        opacity: hov ? 1 : 0, transition:"opacity .35s ease",
        pointerEvents:"none",
      }} />
      {/* Animated ring on hover */}
      <div style={{
        width: hov ? "62px" : "52px", height: hov ? "62px" : "52px",
        borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
        background: hov ? `radial-gradient(circle,${color}33,${color}11)` : "var(--bg4)",
        border:`2px solid ${hov ? color+"88" : "var(--border)"}`,
        fontSize:"24px", transition:"all .35s ease",
        boxShadow: hov ? `0 0 20px ${color}44` : "none",
      }}>
        {icon}
      </div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontWeight:700, fontSize:"14px", color: hov ? "var(--text)" : "var(--muted)", transition:"color .3s", letterSpacing:".01em" }}>{name}</div>
      </div>
      {/* Shimmer line at bottom */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:"2px",
        background:`linear-gradient(90deg,transparent,${color},transparent)`,
        opacity: hov ? 1 : 0, transition:"opacity .35s ease",
      }} />
    </div>
  );
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:"var(--bg3)", border:`1px solid ${hov?p.color+"55":"var(--border)"}`, borderRadius:"20px", padding:"26px", transition:"all .3s", transform:hov?"translateY(-6px)":"none", boxShadow:hov?`0 20px 40px ${p.color}20`:"none", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"110px", height:"110px", borderRadius:"50%", background:p.color+"18", transition:"all .3s", transform:hov?"scale(1.6)":"scale(1)" }} />
      <div style={{ position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px" }}>
          <div style={{ width:"50px", height:"50px", borderRadius:"14px", background:p.color+"22", border:`1px solid ${p.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>{p.icon}</div>
          <div style={{ display:"flex", gap:"8px" }}>
            <a href={p.github} target="_blank" rel="noreferrer" style={{ width:"32px", height:"32px", borderRadius:"8px", background:"var(--bg4)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px", textDecoration:"none", transition:"border-color .2s" }} title="GitHub"
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(167,139,250,.5)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}>🐙</a>
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ width:"32px", height:"32px", borderRadius:"8px", background:"var(--bg4)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", textDecoration:"none", transition:"border-color .2s" }} title="Live"
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(167,139,250,.5)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}>↗</a>}
          </div>
        </div>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:"17px", fontWeight:700, marginBottom:"8px" }}>{p.title}</h3>
        <p style={{ color:"var(--muted)", fontSize:"13px", lineHeight:1.7, marginBottom:"16px" }}>{p.desc}</p>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {p.tags.map(t => <span key={t} style={{ fontSize:"11px", fontWeight:600, padding:"3px 8px", borderRadius:"6px", background:p.color+"18", color:p.color, border:`1px solid ${p.color}33` }}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item }) {
  return (
    <div style={{ display:"flex", gap:"16px", padding:"20px", background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"16px", marginBottom:"12px" }}>
      <div style={{ width:"44px", height:"44px", borderRadius:"12px", flexShrink:0, background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px" }}>{item.icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"8px", marginBottom:"4px" }}>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"15px", fontWeight:700 }}>{item.title}</div>
            <div style={{ fontSize:"12px", color:"var(--accent)", marginTop:"2px" }}>{item.org}</div>
          </div>
          <span style={{ fontSize:"11px", padding:"3px 10px", borderRadius:"20px", background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.2)", color:"var(--accent)", whiteSpace:"nowrap" }}>{item.period}</span>
        </div>
        <ul style={{ marginTop:"10px", paddingLeft:"16px" }}>
          {item.points.map((pt,i) => <li key={i} style={{ fontSize:"13px", color:"var(--muted)", lineHeight:1.8, marginBottom:"3px" }}>{pt}</li>)}
        </ul>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState(null);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ access_key:"edceb988-26de-4d01-8a3d-ce83865792f5", ...form }) });
      const data = await res.json();
      if (data.success) { setStatus("sent"); setForm({ name:"", email:"", subject:"", message:"" }); setTimeout(() => setStatus(null), 5000); }
      else { setStatus("error"); setTimeout(() => setStatus(null), 4000); }
    } catch { setStatus("error"); setTimeout(() => setStatus(null), 4000); }
  };
  const inp = { width:"100%", background:"var(--bg4)", border:"1px solid var(--border)", borderRadius:"10px", color:"var(--text)", padding:"11px 14px", fontSize:"14px", outline:"none", fontFamily:"var(--font-body)", transition:"border-color .2s" };
  return (
    <div style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"20px", padding:"32px" }}>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:"20px", fontWeight:800, marginBottom:"20px" }}>Send a Message</h3>
      {status==="sent" && <div style={{ background:"rgba(74,222,128,.1)", border:"1px solid rgba(74,222,128,.3)", borderRadius:"10px", padding:"12px 16px", marginBottom:"16px", color:"#4ade80", fontSize:"14px" }}>✅ Message sent! I'll get back to you soon.</div>}
      {status==="error" && <div style={{ background:"rgba(248,113,113,.1)", border:"1px solid rgba(248,113,113,.3)", borderRadius:"10px", padding:"12px 16px", marginBottom:"16px", color:"#f87171", fontSize:"14px" }}>❌ Something went wrong. Please try again.</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {[["name","Your Name","Nandhini"],["email","Email","you@example.com"]].map(([n,l,ph]) => (
            <div key={n}>
              <label style={{ fontSize:"12px", color:"var(--muted)", display:"block", marginBottom:"5px" }}>{l}</label>
              <input name={n} value={form[n]} onChange={handleChange} placeholder={ph} required type={n==="email"?"email":"text"} style={inp}
                onFocus={e=>e.target.style.borderColor="rgba(167,139,250,.6)"} onBlur={e=>e.target.style.borderColor="var(--border)"} />
            </div>
          ))}
        </div>
        <div style={{ marginBottom:"12px" }}>
          <label style={{ fontSize:"12px", color:"var(--muted)", display:"block", marginBottom:"5px" }}>Subject</label>
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project collaboration" required style={inp}
            onFocus={e=>e.target.style.borderColor="rgba(167,139,250,.6)"} onBlur={e=>e.target.style.borderColor="var(--border)"} />
        </div>
        <div style={{ marginBottom:"20px" }}>
          <label style={{ fontSize:"12px", color:"var(--muted)", display:"block", marginBottom:"5px" }}>Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Hi Nandhini, I'd love to work with you..." required rows={5}
            style={{ ...inp, resize:"vertical", minHeight:"120px" }}
            onFocus={e=>e.target.style.borderColor="rgba(167,139,250,.6)"} onBlur={e=>e.target.style.borderColor="var(--border)"} />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width:"100%", justifyContent:"center" }} disabled={status==="sending"}>
          {status==="sending" ? "⏳ Sending..." : "✉️ Send Message"}
        </button>
      </form>
    </div>
  );
}

const skillsData = [
  { name:"Python",     icon:"🐍", color:"#3b82f6" },
  { name:"JavaScript", icon:"⚡", color:"#eab308" },
  { name:"HTML5",      icon:"🌐", color:"#f97316" },
  { name:"CSS3",       icon:"🎨", color:"#06b6d4" },
  { name:"Bootstrap",  icon:"📦", color:"#a78bfa" },
  { name:"Git",        icon:"🔀", color:"#f43f5e" },
  { name:"React",      icon:"⚛️", color:"#22d3ee" },
  { name:"SQL",        icon:"🗄️", color:"#34d399" },
  { name:"Django",     icon:"🌿", color:"#901f68" },
 
];

const projects = [
  { title:"Online Shopping Platform", desc:"Fully responsive e-commerce UI with product listing, cart UI, and clean navigation.", tags:["HTML","CSS","Bootstrap"], icon:"🛒", color:"#7c3aed", live:"https://nandhinib.neocities.org", github:"https://github.com/nandhini040" },
  { title:"Dribbble Portfolio", desc:"A personal portfolio inspired by Dribbble's design aesthetic for a modern online presence.", tags:["HTML","CSS","JavaScript"], icon:"🎨", color:"#db2777", live:"https://nandhinib.neocities.org/Portfolio", github:"https://github.com/nandhini040" },
];

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef({});
  const navItems = ["home","about","projects","resume","contact"];

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 130;
      for (const id of navItems) {
        const el = sectionRefs.current[id];
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = id => { sectionRefs.current[id]?.scrollIntoView({ behavior:"smooth", block:"start" }); setMenuOpen(false); };
  const setRef = id => el => { sectionRefs.current[id] = el; };

  return (
    <>
      <style>{CSS}</style>
      <div className="bg-dots" />
      <div className="glow-orb" style={{ width:"600px", height:"600px", top:"-200px", left:"-200px", background:"#7c3aed" }} />
      <div className="glow-orb" style={{ width:"400px", height:"400px", bottom:"20%", right:"-100px", background:"#60a5fa" }} />

      <nav>
        <div className="nav-logo" onClick={() => scrollTo("home")}>NN</div>
        <div className={`nav-links ${menuOpen?"open":""}`}>
          {navItems.map(id => (
            <a key={id} className={active===id?"active":""} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase()+id.slice(1)}
            </a>
          ))}
        </div>
        <button className="menu-btn" onClick={() => setMenuOpen(o=>!o)} aria-label="Menu">
          <span style={{ transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }} />
          <span style={{ opacity:menuOpen?0:1 }} />
          <span style={{ transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }} />
        </button>
      </nav>

      {/* HOME */}
      <section ref={setRef("home")} className="hero-section" style={{ position:"relative", zIndex:1 }}>
        <div className="container">
          <div className="hero-grid">
            <div style={{ animation:"fadeUp .7s ease both" }}>
              <div className="pill" style={{ marginBottom:"24px" }}>
                <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"pulse 2s infinite" }} />
                Available for opportunities
              </div>
              <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(40px,6vw,72px)", lineHeight:1.05, marginBottom:"14px", letterSpacing:"-.03em" }}>
                Hi, I'm<br /><span className="highlight">Nandhini</span>
              </h1>
              <Typewriter />
              <p style={{ color:"var(--muted)", fontSize:"15px", lineHeight:1.8, maxWidth:"460px", marginBottom:"32px" }}>
                A passionate software engineer who loves transforming ideas into reliable, scalable products. Proficient in Python, JavaScript, and modern web technologies.
              </p>
              <div className="hero-btns" style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"28px" }}>
                <button onClick={() => scrollTo("projects")} className="btn btn-primary">🚀 View Projects</button>
                <button onClick={() => scrollTo("contact")} className="btn btn-outline">✉️ Get in Touch</button>
              </div>
              <div className="hero-socials" style={{ display:"flex", gap:"10px" }}>
                {[["GitHub","🐙","https://github.com/nandhini040"],["LinkedIn","💼","https://www.linkedin.com/in/nandhini-b-7b556a398/"],["Twitter","🐦","#"],["Instagram","📸","#"]].map(([label,icon,href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    style={{ width:"42px", height:"42px", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg3)", border:"1px solid var(--border)", fontSize:"18px", transition:"all .2s", textDecoration:"none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(167,139,250,.5)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="none"; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-right" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"28px", animation:"fadeUp .7s .2s ease both" }}>
              <div style={{ position:"relative" }}>
                <div style={{ width:"clamp(200px,28vw,260px)", height:"clamp(200px,28vw,260px)", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#a78bfa,#60a5fa)", padding:"3px", animation:"float 5s ease-in-out infinite" }}>
                  <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"var(--bg3)", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <img src="Nandhu.jpeg" alt="Nandhini" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }}
                      onError={e => { e.target.style.display="none"; e.target.parentNode.innerHTML=`<div style="font-size:80px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">👩‍💻</div>`; }} />
                  </div>
                </div>
                <div style={{ position:"absolute", bottom:"8px", right:"-10px", background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"12px", padding:"8px 12px", fontSize:"12px", fontWeight:500, whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"6px" }}>
                  🐍 FullStack Python Dev
                </div>
              </div>
              <div className="stats-grid">
                {[["2026","Batch"],["2+","Projects"],["6+","Tech"],["B.E","Degree"]].map(([v,l]) => (
                  <div key={l} style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"14px", padding:"16px", textAlign:"center" }}>
                    <div style={{ fontFamily:"var(--font-display)", fontSize:"22px", fontWeight:800, color:"var(--accent)" }}>{v}</div>
                    <div style={{ fontSize:"11px", color:"var(--muted)", marginTop:"3px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={setRef("about")} style={{ position:"relative", zIndex:1 }}>
        <div className="container">
          <Reveal>
            <div className="section-label">About me</div>
            <h2 className="section-title">Know Who <span className="highlight">I Am</span></h2>
            <div className="divider" />
          </Reveal>
          <div className="about-bio-grid">
            <Reveal delay={100}>
              <p style={{ color:"var(--muted)", fontSize:"15px", lineHeight:1.9, marginBottom:"16px" }}>Hi everyone! I'm <span style={{ color:"var(--accent)", fontWeight:500 }}>Nandhini</span>, from Chennai, Tamil Nadu. I graduated with a B.E in Computer Science & Engineering from Sri Ramakrishna College of Engineering, Perambalur — 2026 batch.</p>
              <p style={{ color:"var(--muted)", fontSize:"15px", lineHeight:1.9, marginBottom:"16px" }}>I'm proficient in <span style={{ color:"var(--accent)" }}>HTML, CSS, JavaScript, Bootstrap, Python and SQL</span> — enjoying both backend and frontend stacks.</p>
              <p style={{ color:"var(--muted)", fontSize:"15px", lineHeight:1.9, marginBottom:"26px" }}>Key interest: <span style={{ color:"var(--accent)" }}>Web Applications</span>, building with <span style={{ color:"var(--accent)" }}>React.js and Node.js</span> whenever possible.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {[{ year:"2022 – 2026", title:"B.E Computer Science & Engineering", sub:"Sri Ramakrishna College of Engineering, Perambalur", icon:"🎓" }, { year:"2026", title:"Full Stack Python Developer", sub:"Building web applications with Python & React", icon:"💻" }].map(({ year, title, sub, icon }) => (
                  <div key={title} style={{ display:"flex", gap:"14px", padding:"16px 18px", background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"14px" }}>
                    <div style={{ fontSize:"22px", flexShrink:0, marginTop:"2px" }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:"11px", color:"var(--accent)", letterSpacing:".1em", fontWeight:500, marginBottom:"3px" }}>{year}</div>
                      <div style={{ fontFamily:"var(--font-display)", fontSize:"14px", fontWeight:700, marginBottom:"2px" }}>{title}</div>
                      <div style={{ fontSize:"12px", color:"var(--muted)" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"20px", padding:"28px", textAlign:"center" }}>
                <div style={{ width:"110px", height:"110px", borderRadius:"50%", margin:"0 auto 14px", background:"linear-gradient(135deg,#7c3aed,#a78bfa)", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <img src="Nandhu.jpeg" alt="Nandhini" style={{ width:"110px", height:"110px", objectFit:"cover", borderRadius:"50%" }} onError={e => { e.target.style.display="none"; e.target.parentNode.innerHTML=`<div style="font-size:48px">👩‍💻</div>`; }} />
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"20px", fontWeight:800, marginBottom:"3px" }}>Nandhini B</div>
                <div style={{ fontSize:"13px", color:"var(--accent)", marginBottom:"18px" }}>Full Stack Python Developer</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", textAlign:"left" }}>
                  {[["📍","Chennai, Tamil Nadu"],["✉️","nandhinib040@gmail.com"],["📞","+91 8428223032"],["🎓","B.E CSE, 2026 Batch"]].map(([icon,text]) => (
                    <div key={text} style={{ display:"flex", alignItems:"center", gap:"10px", fontSize:"13px", color:"var(--muted)" }}><span>{icon}</span>{text}</div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="section-label">Skillset</div>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,4vw,34px)", fontWeight:800, marginBottom:"8px" }}>Professional <span className="highlight">Skills</span></h3>
            <div className="divider" />
          </Reveal>
          <div className="skills-grid">
            {skillsData.map((s,i) => <Reveal key={s.name} delay={i*60}><SkillCard {...s} /></Reveal>)}
          </div>

          <Reveal>
            <div className="section-label">Tools</div>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,4vw,34px)", fontWeight:800, marginBottom:"8px" }}>Tools <span className="highlight">I Use</span></h3>
            <div className="divider" />
          </Reveal>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            {[["🖥️","VS Code"],["📊","Power BI"],["🌐","Google Chrome"],["🐙","GitHub"]].map(([icon,name],i) => (
              <Reveal key={name} delay={i*80}>
                <div className="card" style={{ padding:"12px 20px", display:"flex", alignItems:"center", gap:"8px" }}>
                  <span>{icon}</span><span style={{ fontSize:"14px", fontWeight:500 }}>{name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={setRef("projects")} style={{ position:"relative", zIndex:1 }}>
        <div className="container">
          <Reveal>
            <div className="section-label">My work</div>
            <h2 className="section-title">Recent <span className="highlight">Projects</span></h2>
            <div className="divider" />
          </Reveal>
          <div className="projects-grid">
            {projects.map((p,i) => <Reveal key={i} delay={i*80}><ProjectCard p={p} /></Reveal>)}
          </div>
          <Reveal delay={100}>
            <div style={{ textAlign:"center", marginTop:"48px", padding:"40px", background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"20px" }}>
              <div style={{ fontSize:"32px", marginBottom:"10px" }}>🚀</div>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"22px", fontWeight:800, marginBottom:"6px" }}>More on GitHub</h3>
              <p style={{ color:"var(--muted)", fontSize:"14px", marginBottom:"20px" }}>All my projects and experiments live on GitHub</p>
              <a href="https://github.com/nandhini040" target="_blank" rel="noreferrer" className="btn btn-primary">🐙 View GitHub Profile</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESUME */}
      <section ref={setRef("resume")} style={{ position:"relative", zIndex:1 }}>
        <div className="container">
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"16px", marginBottom:"44px" }}>
              <div>
                <div className="section-label">Resume</div>
                <h2 className="section-title">My <span className="highlight">Resume</span></h2>
                <div className="divider" style={{ marginBottom:0 }} />
              </div>
              <a href="./Resume.pdf" download className="btn btn-primary">⬇️ Download CV</a>
            </div>
          </Reveal>
          <div className="resume-grid">
            <div>
              <Reveal delay={100}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}><span>💼</span><span style={{ fontFamily:"var(--font-display)", fontSize:"17px", fontWeight:700 }}>Experience</span></div>
                <TimelineItem item={{ title:"Full Stack Python Developer", org:"Self-Employed / Projects", period:"2024 – Present", icon:"💻", points:["Built responsive web applications using Python, HTML, CSS, Bootstrap, and JavaScript","Developed data-driven dashboards using Power BI and SQL","Explored blockchain solutions and Web3 integrations"] }} />
              </Reveal>
              <Reveal delay={150}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", margin:"28px 0 16px" }}><span>🎓</span><span style={{ fontFamily:"var(--font-display)", fontSize:"17px", fontWeight:700 }}>Education</span></div>
                <TimelineItem item={{ title:"B.E Computer Science & Engineering", org:"Sri Ramakrishna College of Engineering, Perambalur", period:"2022 – 2026", icon:"🎓", points:["Graduated in the 2026 batch","Focused on web development, databases, and software engineering","Built multiple full-stack projects during coursework"] }} />
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"17px", fontWeight:700, display:"flex", alignItems:"center", gap:"8px" }}><span>🧩</span>Skills</div>
                {[{ cat:"Frontend", items:["HTML5","CSS3","JavaScript","Bootstrap","React.js"] }, { cat:"Backend", items:["Python","Django","Node.js","SQL"] }, { cat:"Tools", items:["Git","VS Code","Power BI","GitHub"] }, { cat:"Concepts", items:["REST APIs","Responsive Design","OOP","Blockchain Basics"] }].map(({ cat, items }) => (
                  <div key={cat} style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"14px", padding:"16px" }}>
                    <div style={{ fontSize:"11px", fontWeight:600, letterSpacing:".12em", color:"var(--accent)", textTransform:"uppercase", marginBottom:"10px" }}>{cat}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                      {items.map(item => <span key={item} style={{ fontSize:"12px", fontWeight:500, padding:"3px 10px", borderRadius:"6px", background:"var(--bg4)", border:"1px solid var(--border)", color:"var(--muted)" }}>{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={setRef("contact")} style={{ position:"relative", zIndex:1 }}>
        <div className="container">
          <Reveal>
            <div className="section-label">Get in touch</div>
            <h2 className="section-title">Contact <span className="highlight">Me</span></h2>
            <div className="divider" />
            <p style={{ color:"var(--muted)", fontSize:"15px", maxWidth:"460px", marginBottom:"40px" }}>I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!</p>
          </Reveal>
          <div className="contact-grid">
            <Reveal delay={100}><ContactForm /></Reveal>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {[["✉️","Email","nandhinib040@gmail.com","mailto:nandhinib040@gmail.com"],["📞","Phone","+91 8428223032","tel:+918428223032"],["📍","Location","Chennai, India","#"]].map(([icon,label,val,href],i) => (
                <Reveal key={label} delay={i*80}>
                  <a href={href} style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"14px", padding:"18px", display:"flex", alignItems:"center", gap:"14px", transition:"all .2s", textDecoration:"none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(167,139,250,.4)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="none"; }}>
                    <div style={{ width:"42px", height:"42px", borderRadius:"12px", flexShrink:0, background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:"10px", color:"var(--muted)", letterSpacing:".08em", textTransform:"uppercase", marginBottom:"2px" }}>{label}</div>
                      <div style={{ fontSize:"14px", fontWeight:500, color:"var(--text)" }}>{val}</div>
                    </div>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={250}>
                <div style={{ background:"linear-gradient(135deg,rgba(124,58,237,.15),rgba(167,139,250,.08))", border:"1px solid rgba(167,139,250,.25)", borderRadius:"14px", padding:"20px" }}>
                  <div style={{ fontSize:"20px", marginBottom:"8px" }}>❝</div>
                  <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.7, fontStyle:"italic" }}>"I'm always excited about new challenges and opportunities to build something meaningful."</p>
                  <div style={{ fontSize:"13px", fontWeight:600, color:"var(--accent)", marginTop:"10px" }}>— Nandhini</div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign:"center", padding:"28px 20px", borderTop:"1px solid var(--border)", color:"var(--muted)", fontSize:"13px", position:"relative", zIndex:1 }}>
        Designed & built by <span style={{ color:"var(--accent)", fontWeight:600 }}>Nandhini B</span> · 2026
      </footer>
    </>
  );
}