/* ─── design tokens ─── */
const C = {
  teal:   "#24C4B5",
  navy:   "#14263D",
  body:   "#58708A",
  bg:     "#EDF9F8",
  white:  "#FFFFFF",
};

/* ─── tiny SVG icons ─── */
function ShieldIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
      <path d="M14 2L26 7v11c0 7-6 11-12 13C2 29 2 18 2 18V7z"
        stroke={C.teal} strokeWidth="2" fill="none"/>
      <path d="M8 16l4 4 8-8" stroke={C.teal} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CarBadgeIcon() {
  return (
    <svg width="36" height="22" viewBox="0 0 36 22" fill="none">
      <path d="M4 13Q6 4 18 4Q30 4 32 13" stroke={C.teal} strokeWidth="1.8"
        fill="none" strokeLinecap="round"/>
      <rect x="2" y="13" width="32" height="2" rx="1" fill={C.teal}/>
      <path d="M4 15l-2 4h32l-2-4" stroke={C.teal} strokeWidth="1.8"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9"  cy="19.5" r="2.5" stroke={C.teal} strokeWidth="1.8" fill="none"/>
      <circle cx="27" cy="19.5" r="2.5" stroke={C.teal} strokeWidth="1.8" fill="none"/>
    </svg>
  );
}

function ClockBadgeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke={C.teal} strokeWidth="1.8" fill="none"/>
      <path d="M16 9v7l5 0" stroke={C.teal} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"/>
      <text x="16" y="26" textAnchor="middle" fontSize="5" fontWeight="700"
        fill={C.teal} fontFamily="Poppins,sans-serif" letterSpacing="0.4">24-7</text>
    </svg>
  );
}


export default function App() {
  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif",
      overflow: "hidden",
    }}>

      {/* ══════════════ NAVBAR ══════════════ */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 60px",
      }}>

        {/* Logo — real image with multiply to drop white bg */}
        <img
          src="/src/imports/image-4.png"
          alt="Razzaq Travels"
          style={{
            height: 72,
            width: "auto",
            mixBlendMode: "multiply",
            display: "block",
          }}
        />

        {/* Nav */}
        <nav style={{ display: "flex", gap: 48 }}>
          {["Home","About Us","Our Services","Gallery","Contact Us"].map(l => (
            <a key={l} href="#" style={{
              fontSize: 15,
              fontWeight: 500,
              color: "#4a5568",
              textDecoration: "none",
              transition: "color 180ms",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = C.teal)}
            onMouseLeave={e => (e.currentTarget.style.color = "#4a5568")}
            >{l}</a>
          ))}
        </nav>

        {/* Book Now */}
        <a href="#" style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: C.teal,
          color: "#fff",
          padding: "14px 30px",
          borderRadius: 999,
          fontWeight: 600,
          fontSize: 15,
          textDecoration: "none",
          boxShadow: `0 4px 18px ${C.teal}55`,
          transition: "transform 200ms, box-shadow 200ms",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${C.teal}77`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 18px ${C.teal}55`;
        }}
        >
          Book Now
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9H15M10 4l5 5-5 5"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </header>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        height: "clamp(460px, 55vw, 560px)",
      }}>

        {/* Reference image — right-side: car + teal waves + mountains + mosque */}
        <img
          src="/src/imports/image-2.png"
          aria-hidden="true"
          alt=""
          style={{
            position: "absolute",
            top: "-130px",       /* shift up to crop navbar from reference */
            left: 0,
            width: "100%",
            height: "auto",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Left gradient mask — solid through 46% (covers full text column), fades to clear by 62% */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right,
            ${C.bg} 0%,
            ${C.bg} 46%,
            ${C.bg}CC 52%,
            ${C.bg}55 57%,
            transparent 63%
          )`,
          zIndex: 5,
          pointerEvents: "none",
        }}/>

        {/* Top gradient — hides navbar row from reference image at very top */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: `linear-gradient(to bottom, ${C.bg} 0%, transparent 100%)`,
          zIndex: 5,
          pointerEvents: "none",
        }}/>

        {/* Hero content */}
        <div style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          height: "100%",
          padding: "0 60px",
        }}>
          <div style={{ width: "44%", maxWidth: 600 }}>

            {/* Headline */}
            <h1 style={{
              fontSize: "clamp(52px, 5.8vw, 84px)",
              fontWeight: 900,
              color: C.teal,
              lineHeight: 1.0,
              margin: "0 0 18px 0",
              letterSpacing: "-0.01em",
            }}>
              Comfortable<br/>Journeys
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: 16,
              fontWeight: 400,
              color: "#6b7f96",
              lineHeight: 1.6,
              margin: "0 0 40px 0",
            }}>
              Safe, reliable and premium travel services<br/>across Pakistan
            </p>

            {/* Feature badges */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, paddingRight: 28 }}>
                <ShieldIcon />
                <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7f96" }}>Safe Travel</span>
              </div>
              <div style={{ width: 1, height: 50, background: "#c8d8e4" }}/>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "0 28px" }}>
                <CarBadgeIcon />
                <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7f96" }}>Premium Fleet</span>
              </div>
              <div style={{ width: 1, height: 50, background: "#c8d8e4" }}/>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, paddingLeft: 28 }}>
                <ClockBadgeIcon />
                <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7f96" }}>24/7 Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
