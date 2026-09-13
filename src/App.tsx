import { useState, useEffect } from "react"
import logoImg from "./imports/image-4.png"
import heroImg from "./imports/image-2.png"
import corollaGliImg from "./imports/corolla_gli.png"
import hondaCivicImg from "./imports/honda_civic.png"
import toyotaVigoImg from "./imports/toyota_vigo.png"

const C = {
  teal: "#24C4B5",
  navy: "#14263D",
  body: "#58708A",
  bg: "#EDF9F8",
  white: "#FFFFFF",
}

const PHONE_NUMBER = "0325 0111015"
const WA_PHONE = "923250111015"

function formatDateDisplay(dStr: string) {
  if (!dStr) return "Add date"
  if (!dStr.includes("-")) return dStr
  const [y, m, d] = dStr.split("-")
  return `${d} / ${m} / ${y}`
}

function buildWhatsAppLink(
  pickupLocation?: string,
  dropoffLocation?: string,
  pickupDate?: string,
  pickupTime?: string,
  carModel?: string
) {
  const details = [
    pickupLocation && `Pick-up Location: ${pickupLocation}`,
    dropoffLocation && `Drop-off Location: ${dropoffLocation}`,
    pickupDate && `Pick-up Date: ${formatDateDisplay(pickupDate)}`,
    pickupTime && `Pick-up Time: ${pickupTime}`,
    carModel && `Car Model: ${carModel}`,
  ]
    .filter(Boolean)
    .join("\n• ")

  const msg = details
    ? `Hi Razzaq Travels! I would like to book a ride with details:\n\n• ${details}\n\nPlease confirm availability & rate.`
    : `Hi Razzaq Travels! I'd like to book a ride.`

  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`
}

/* ─── SVG Icons ─── */
function ShieldIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
      <path
        d="M14 2L26 7v11c0 7-6 11-12 13C2 29 2 18 2 18V7z"
        stroke={C.teal}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 16l4 4 8-8"
        stroke={C.teal}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CarBadgeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H7c-.7 0-1.3.3-1.7.8L3.2 10.5C2.5 10.9 2 11.7 2 12.5V16c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M5 11l2.5-3.5h5.5l2.5 3.5" />
    </svg>
  )
}

function ClockBadgeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke={C.teal} strokeWidth="1.8" fill="none" />
      <path
        d="M16 9v7l5 0"
        stroke={C.teal}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="16"
        y="26"
        textAnchor="middle"
        fontSize="5"
        fontWeight="700"
        fill={C.teal}
        fontFamily="Poppins,sans-serif"
        letterSpacing="0.4"
      >
        24-7
      </text>
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={C.teal} stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

/* ─── Custom Theme Calendar Popup ─── */
function CustomDatePicker({
  value,
  onChange,
  onClose,
  position = "down",
}: {
  value: string
  onChange: (val: string) => void
  onClose: () => void
  position?: "down" | "up"
}) {
  const initialDate = value && value.includes("-") ? new Date(value) : new Date()
  const [viewDate, setViewDate] = useState(initialDate)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1))
  }

  function handleSelectDay(day: number) {
    const mStr = String(month + 1).padStart(2, "0")
    const dStr = String(day).padStart(2, "0")
    onChange(`${year}-${mStr}-${dStr}`)
    onClose()
  }

  const todayStr = new Date().toISOString().split("T")[0]

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${position === "up" ? "bottom-full mb-3 left-0" : "top-full mt-3 left-0"} z-50 bg-white rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-100 w-72 font-sans select-none`}
    >
      {/* Month / Year Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-full bg-[#EDF9F8] text-[#24C4B5] hover:bg-[#24C4B5] hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
        >
          ‹
        </button>
        <span className="font-extrabold text-[#14263D] text-sm">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-full bg-[#EDF9F8] text-[#24C4B5] hover:bg-[#24C4B5] hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
        >
          ›
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {[...Array(firstDay)].map((_, i) => (
          <span key={`empty-${i}`} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1
          const mStr = String(month + 1).padStart(2, "0")
          const dStr = String(day).padStart(2, "0")
          const dateStr = `${year}-${mStr}-${dStr}`
          const isSelected = value === dateStr
          const isToday = todayStr === dateStr

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleSelectDay(day)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                isSelected
                  ? "bg-[#24C4B5] text-white font-bold shadow-md shadow-[#24C4B5]/40 scale-105"
                  : isToday
                  ? "bg-[#EDF9F8] text-[#24C4B5] font-bold border border-[#24C4B5]/40"
                  : "text-slate-700 hover:bg-[#EDF9F8] hover:text-[#24C4B5]"
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
        <button
          type="button"
          onClick={() => {
            onChange("")
            onClose()
          }}
          className="text-slate-400 hover:text-slate-600 font-semibold"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            onChange(todayStr)
            onClose()
          }}
          className="text-[#24C4B5] font-bold hover:underline"
        >
          Today
        </button>
      </div>
    </div>
  )
}

/* ─── Simple Theme Time Picker Popup (24-Hour Coverage) ─── */
function CustomTimePicker({
  value,
  onChange,
  onClose,
  position = "down",
}: {
  value: string
  onChange: (val: string) => void
  onClose: () => void
  position?: "down" | "up"
}) {
  const times: string[] = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = h % 12 === 0 ? 12 : h % 12
      const ampm = h < 12 ? "am" : "pm"
      const mm = String(m).padStart(2, "0")
      times.push(`${String(hh).padStart(2, "0")}:${mm} ${ampm}`)
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${position === "up" ? "bottom-full mb-3 right-0" : "top-full mt-3 left-0"} z-50 bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-100 w-72 font-sans select-none`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-extrabold text-[#14263D]">Select Pick-up Time</span>
        <span className="text-[10px] font-bold uppercase text-[#24C4B5] bg-[#EDF9F8] px-2.5 py-0.5 rounded-full">
          24/7 Available
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 max-h-60 overflow-y-auto p-1">
        {times.map((t) => {
          const isSelected = value?.toLowerCase() === t.toLowerCase()
          return (
            <button
              key={t}
              type="button"
              onClick={() => {
                onChange(t)
                onClose()
              }}
              className={`py-2 px-1 rounded-xl text-[11px] font-semibold text-center transition-all ${
                isSelected
                  ? "bg-[#24C4B5] text-white font-bold shadow-md shadow-[#24C4B5]/40 scale-105"
                  : "bg-[#F8FCFC] text-slate-700 hover:bg-[#EDF9F8] hover:text-[#24C4B5]"
              }`}
            >
              {t}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const todayStr = new Date().toISOString().split("T")[0]
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [pickupDate, setPickupDate] = useState(todayStr)
  const [pickupTime, setPickupTime] = useState("12:00 pm")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState<string | undefined>()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activePicker, setActivePicker] = useState<"pDate" | "pTime" | "mPDate" | "mPTime" | null>(null)

  useEffect(() => {
    function handleClickOutside() {
      setActivePicker(null)
    }
    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [])

  function handleSearchSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()
    window.open(buildWhatsAppLink(pickupLocation, dropoffLocation, pickupDate, pickupTime), "_blank")
  }

  function handleBookCar(carName: string) {
    setSelectedCar(carName)
    setModalOpen(true)
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ══════════════ NAVBAR ══════════════ */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 22,
          paddingBottom: 22,
          position: "relative",
          zIndex: 20,
        }}
        className="px-6 md:px-16 animate-navbar"
      >
        {/* Logo */}
        <a href="#" style={{ display: "block" }}>
          <img
            src={logoImg}
            alt="Razzaq Travels"
            className="h-10 sm:h-16 w-auto mix-blend-multiply block"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex" style={{ gap: 48 }}>
          {["Home", "About Us", "Our Services", "Gallery", "Contact Us"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#4a5568",
                textDecoration: "none",
                transition: "color 180ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.teal)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Header Contact & CTA Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`https://wa.me/${WA_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-bold text-sm text-[#14263D] hover:text-[#24C4B5] transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-[#EDF9F8] text-[#24C4B5] flex items-center justify-center text-xs font-extrabold">
              📞
            </span>
            <span>0325 0111015</span>
          </a>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.teal,
              color: "#fff",
              padding: "14px 30px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              boxShadow: `0 4px 18px ${C.teal}55`,
              transition: "transform 200ms, box-shadow 200ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = `0 8px 24px ${C.teal}77`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = ""
              e.currentTarget.style.boxShadow = `0 4px 18px ${C.teal}55`
            }}
          >
            Book Now
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 9H15M10 4l5 5-5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="lg:hidden p-2 text-slate-700 focus:outline-none"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2.5">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {mobileNavOpen && (
          <div className="absolute top-24 left-6 right-6 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 font-semibold text-slate-700 lg:hidden z-50">
            {["Home", "About Us", "Our Services", "Gallery", "Contact Us"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMobileNavOpen(false)}
                className="hover:text-[#24C4B5] transition-colors"
              >
                {l}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileNavOpen(false)
                setModalOpen(true)
              }}
              className="accent-btn-pill w-full py-3 text-sm font-semibold mt-2"
            >
              Book Now →
            </button>
          </div>
        )}
      </header>

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(480px, 55vw, 580px)",
        }}
      >
        {/* Reference Image Background Overlay */}
        <img
          src={heroImg}
          aria-hidden="true"
          alt=""
          className="animate-hero-car hidden lg:block"
          style={{
            position: "absolute",
            top: "-130px",
            left: 0,
            width: "100%",
            height: "auto",
            pointerEvents: "none",
            userSelect: "none",
            WebkitMaskImage: "linear-gradient(to right, transparent 45%, black 49.5%)",
            maskImage: "linear-gradient(to right, transparent 45%, black 49.5%)",
          }}
        />

        {/* Top Gradient Mask */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: `linear-gradient(to bottom, ${C.bg} 0%, transparent 100%)`,
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
          className="px-6 md:px-16 pt-8 pb-12"
        >
          <div className="w-full lg:w-[46%] max-w-[620px] animate-hero-text">
            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(34px, 7.5vw, 76px)",
                fontWeight: 900,
                color: C.teal,
                lineHeight: 1.05,
                margin: "0 0 16px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Comfortable
              <br />
              Journeys
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "#6b7f96",
                lineHeight: 1.6,
                margin: "0 0 28px 0",
              }}
            >
              Car booking with professional driver & 24/7 VIP airport pick & drop services across Pakistan
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-0 border-t sm:border-t-0 border-slate-200/60 pt-4 sm:pt-0">
              <div className="flex flex-col items-center gap-1.5 text-center sm:pr-6">
                <ShieldIcon />
                <span className="text-[11px] sm:text-xs font-semibold text-[#6b7f96]">With Driver</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center border-x border-slate-200/60 px-2 sm:px-6">
                <CarBadgeIcon />
                <span className="text-[11px] sm:text-xs font-semibold text-[#6b7f96]">Airport Transfers</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center sm:pl-6">
                <ClockBadgeIcon />
                <span className="text-[11px] sm:text-xs font-semibold text-[#6b7f96]">24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FLOATING SEARCH / BOOKING BAR ══════════════ */}
      <section className="px-6 md:px-16 -mt-8 relative z-30 mb-20 max-w-[1340px] mx-auto animate-search-card">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-3xl lg:rounded-full p-4 lg:p-3 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 items-center"
        >
          {/* Pick-up Location */}
          <div className="px-6 lg:border-r border-slate-100 py-1 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Pick-up Location
            </label>
            <div className="flex items-center gap-2">
              <LocationPinIcon />
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Airport or City..."
                className="w-full text-[13px] font-bold text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>

          {/* Drop-off Location */}
          <div className="px-6 lg:border-r border-slate-100 py-1 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Drop-off Location
            </label>
            <div className="flex items-center gap-2">
              <LocationPinIcon />
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Destination City..."
                className="w-full text-[13px] font-bold text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>

          {/* Pick-up Date */}
          <div className="px-6 lg:border-r border-slate-100 py-1 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Pick-up Date
            </label>
            <div
              onClick={(e) => {
                e.stopPropagation()
                setActivePicker(activePicker === "pDate" ? null : "pDate")
              }}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <CalendarIcon />
              <span className="text-[13px] font-bold text-slate-800">
                {formatDateDisplay(pickupDate)}
              </span>
            </div>
            {activePicker === "pDate" && (
              <CustomDatePicker
                value={pickupDate}
                onChange={setPickupDate}
                onClose={() => setActivePicker(null)}
              />
            )}
          </div>

          {/* Pick-up Time */}
          <div className="px-6 lg:border-r border-slate-100 py-1 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Pick-up Time
            </label>
            <div className="flex items-center gap-2 group">
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePicker(activePicker === "pTime" ? null : "pTime")
                }}
                className="cursor-pointer hover:scale-110 transition-transform"
                title="Click to open time picker"
              >
                <ClockIcon />
              </div>
              <input
                type="text"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePicker("pTime")
                }}
                placeholder="e.g. 14:00 or 02:00 PM"
                className="w-full text-[13px] font-bold text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              />
            </div>
            {activePicker === "pTime" && (
              <CustomTimePicker
                value={pickupTime}
                onChange={setPickupTime}
                onClose={() => setActivePicker(null)}
              />
            )}
          </div>

          {/* Search CTA Button */}
          <div className="p-1">
            <button
              type="submit"
              className="accent-btn-pill w-full py-4 rounded-full text-[13px] font-bold text-white uppercase tracking-wide"
            >
              BOOK WITH DRIVER
            </button>
          </div>
        </form>
      </section>

      {/* ══════════════ FLEET CATALOG SECTION ══════════════ */}
      <section id="our-services" className="px-6 md:px-16 py-12 max-w-[1340px] mx-auto animate-section-reveal">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#24C4B5]">
              PREMIUM FLEET
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] mt-1">
              Select Your Luxury Car
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              name: "Toyota Corolla GLi",
              type: "Executive Sedan (With Driver)",
              tag: "Most Popular",
              img: corollaGliImg,
            },
            {
              id: 2,
              name: "Honda Civic Oriel",
              type: "Premium Sedan (With Driver)",
              tag: "Best Value",
              img: hondaCivicImg,
            },
            {
              id: 3,
              name: "Toyota Hilux Vigo 4x4",
              type: "VIP Double Cab SUV (With Driver)",
              tag: "VIP Choice",
              img: toyotaVigoImg,
            },
          ].map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase px-3 py-1 bg-[#EDF9F8] text-[#24C4B5] rounded-full inline-block mb-4">
                  {car.tag}
                </span>
                <div className="h-44 rounded-2xl bg-[#F8FCFC] overflow-hidden mb-5 flex items-center justify-center p-2">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-contain scale-125 hover:scale-135 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xl text-[#14263D]">{car.name}</h3>
                <p className="text-[#58708A] text-xs mt-1 font-medium">{car.type}</p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-[#24C4B5] text-xs">Available 24/7</span>
                <button
                  onClick={() => handleBookCar(car.name)}
                  className="accent-btn-pill px-6 py-2.5 text-xs font-semibold"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ ABOUT & HOW IT WORKS ══════════════ */}
      <section id="about-us" className="px-6 md:px-16 py-16 max-w-[1340px] mx-auto">
        <div className="text-center max-w-md mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#24C4B5]">
            SPECIALIZED SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] mt-1">
            Car Booking & Airport Pick/Drop
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "01", title: "Airport Transfers", desc: "24/7 pick-up & drop-off at Islamabad, Lahore, and major airports." },
            { num: "02", title: "Car Booking with Driver", desc: "Professional, verified drivers for intercity & local travel." },
            { num: "03", title: "Flight & Luggage Care", desc: "Flight tracking & polite luggage assistance included." },
            { num: "04", title: "Instant WhatsApp Booking", desc: "Get immediate confirmation with zero hidden fees in 2 mins." },
          ].map((s) => (
            <div
              key={s.num}
              className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-[#EDF9F8] text-[#24C4B5] flex items-center justify-center font-extrabold text-xl mx-auto mb-4">
                {s.num}
              </div>
              <h3 className="font-bold text-[#14263D] text-base mb-2">{s.title}</h3>
              <p className="text-[#58708A] text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS / GALLERY ══════════════ */}
      <section id="gallery" className="px-6 md:px-16 py-16 max-w-[1340px] mx-auto">
        <div className="text-center max-w-md mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#24C4B5]">
            VERIFIED REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] mt-1">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              text: "Booked Razzaq Travels for an airport pickup at Islamabad Airport. The driver was waiting at terminal arrival with my name sign. Car was immaculate!",
              author: "Farhan K. — Islamabad Airport Pickup",
            },
            {
              text: "Best car booking service with driver in Pakistan. Driver was polite, punctual, and drove safely for our intercity family trip to Lahore.",
              author: "Sana A. — Intercity Ride with Driver",
            },
            {
              text: "We use Razzaq Travels for corporate executive airport transfers. 100% reliable 24/7 service every single time.",
              author: "Tariq R. — Corporate Account",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <StarIcon key={idx} />
                ))}
              </div>
              <p className="text-[#58708A] text-sm italic mb-6 leading-relaxed">
                "{f.text}"
              </p>
              <div className="font-bold text-[#14263D] text-xs border-t border-slate-100 pt-4">
                {f.author}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer
        id="contact-us"
        className="px-6 md:px-16 pt-10 pb-8 border-t border-slate-200/60 max-w-[1340px] mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center text-center text-xs text-[#58708A] gap-4">
          <div>© 2026 Razzaq Travels. All rights reserved.</div>
          <div className="font-semibold text-[#14263D]">Hotline / WhatsApp: {PHONE_NUMBER}</div>
        </div>
      </footer>

      {/* ══════════════ BOOKING MODAL ══════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-6 text-slate-400 hover:text-slate-700 font-bold text-xl"
            >
              ✕
            </button>
            <img src={logoImg} alt="Logo" className="h-10 w-auto mb-3 mix-blend-multiply" />
            <h3 className="text-2xl font-extrabold text-[#14263D] mb-6">Book Your Ride</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                window.open(buildWhatsAppLink(pickupLocation, dropoffLocation, pickupDate, pickupTime, selectedCar), "_blank")
                setModalOpen(false)
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Car Model
                </label>
                <input
                  type="text"
                  value={selectedCar || "Toyota Corolla GLi"}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FCFC] border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#24C4B5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Pick-up Location
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Airport or City (e.g. Islamabad Airport)"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FCFC] border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#24C4B5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Drop-off Location
                </label>
                <input
                  type="text"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Destination (e.g. Rawalpindi / Lahore)"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FCFC] border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#24C4B5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Pick-up Date
                  </label>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setActivePicker(activePicker === "mPDate" ? null : "mPDate")
                    }}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FCFC] border border-slate-200 text-sm font-semibold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span>{formatDateDisplay(pickupDate)}</span>
                    <CalendarIcon />
                  </div>
                  {activePicker === "mPDate" && (
                    <CustomDatePicker
                      value={pickupDate}
                      onChange={setPickupDate}
                      onClose={() => setActivePicker(null)}
                      position="up"
                    />
                  )}
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Pick-up Time
                  </label>
                  <div className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FCFC] border border-slate-200 text-sm font-semibold text-slate-800 flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActivePicker("mPTime")
                      }}
                      placeholder="e.g. 14:00 or 02:00 PM"
                      className="w-full text-sm font-semibold text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
                    />
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setActivePicker(activePicker === "mPTime" ? null : "mPTime")
                      }}
                      className="cursor-pointer hover:scale-110 transition-transform shrink-0"
                      title="Click to open time picker"
                    >
                      <ClockIcon />
                    </div>
                  </div>
                  {activePicker === "mPTime" && (
                    <CustomTimePicker
                      value={pickupTime}
                      onChange={setPickupTime}
                      onClose={() => setActivePicker(null)}
                      position="up"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="accent-btn-pill w-full py-4 text-sm font-bold mt-3 flex items-center justify-center gap-2"
              >
                Send Request via WhatsApp →
              </button>
            </form>
          </div>
        </div>
      )}
      {/* ══════════════ FLOATING WHATSAPP BUTTON ══════════════ */}
      <a
        href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent("Hi Razzaq Travels! I would like to inquire about car booking.")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 sm:right-6 z-50 bg-[#25D366] text-white p-3 sm:py-3 sm:px-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform flex items-center gap-2 font-bold text-xs"
        title="Chat on WhatsApp 0325 0111015"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.057.09-1.168 4.269 4.364-1.145.09.053z"/>
        </svg>
        <span className="hidden sm:inline">0325 0111015</span>
      </a>
    </div>
  )
}
