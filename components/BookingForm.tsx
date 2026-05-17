"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "details" | "verify" | "success";

interface FormData {
  name: string; phone: string; service: string;
  date: string; time: string; message: string;
}

interface BookingFormProps {
  prefilledService?: string;
}

const SERVICES = [
  "Bridal Makeup — Classic","Bridal Makeup — HD","Bridal Makeup — Eleganza (Airbrush)",
  "Engagement Makeup","Reception Makeup","Pre-Bridal Makeup Trial",
  "Party Makeup","Eye Makeup","HD Airbrush Makeup","Basic Casual Makeup",
  "Hair Care & Treatment","Hair Removal / Threading","Skin Care Facial",
  "Basic Clean Up","Body Care","Nail Art & Extension","Grooming Package","Other",
];

// ── OUTSIDE component — never re-created on re-render ──
interface FieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  cls?: string;
  value: string;
  error?: string;
  onChange: (name: keyof FormData, value: string) => void;
}

function Field({ label, name, type = "text", placeholder, cls = "", value, error, onChange }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${cls}`}>
      <label className="text-[10px] tracking-[2px] uppercase text-richbrown-mid font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(name, e.target.value)}
        className={`border rounded-2xl px-4 py-3.5 font-dm text-sm text-richbrown bg-cream outline-none transition-all
          ${error ? "border-red-400 bg-red-50" : "border-gold/20 focus:border-gold focus:bg-white"}`}
      />
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}

export default function BookingForm({ prefilledService = "" }: BookingFormProps) {
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<FormData>({
    name: "", phone: "",
    service: prefilledService,
    date: "", time: "",
    message: prefilledService ? `I'd like to book: ${prefilledService}` : "",
  });
  const [otp, setOtp] = useState(["","","","","",""]);
  const [otpToken, setOtpToken] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [apiErr, setApiErr] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Stable handler — won't cause Field remount ──
  const handleFieldChange = (name: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => setTimer(p => {
        if (p <= 1) { clearInterval(timerRef.current!); return 0; }
        return p - 1;
      }), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timer]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g,"").slice(-10)))
      e.phone = "Valid 10-digit phone required";
    if (!form.service) e.service = "Please select a service";
    if (!form.date) e.date = "Date required";
    if (!form.time) e.time = "Time required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendOtp = async () => {
    if (!validate()) return;
    setLoading(true); setApiErr("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setOtpToken(data.token);
      setStep("verify");
      setTimer(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 300);
    } catch (err: any) {
      setApiErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;
    setLoading(true); setApiErr("");
    setOtp(["","","","","",""]); setOtpErr("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend OTP");
      setOtpToken(data.token);
      setTimer(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setApiErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    const entered = otp.join("");
    if (entered.length < 6) { setOtpErr("Enter complete 6-digit OTP"); return; }
    setLoading(true); setOtpErr(""); setApiErr("");
    try {
      const res = await fetch("/api/confirm-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otpToken, otp: entered, form }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400 && data.error?.includes("OTP")) { setOtpErr(data.error); return; }
        throw new Error(data.error || "Booking failed");
      }
      setStep("success");
    } catch (err: any) {
      setApiErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const otpChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const n = [...otp]; n[i] = v.slice(-1); setOtp(n); setOtpErr("");
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const otpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const formatTime = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  };

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  };

  const resetForm = () => {
    setStep("details");
    setForm({ name:"", phone:"", service:"", date:"", time:"", message:"" });
    setOtp(["","","","","",""]);
    setErrors({}); setApiErr(""); setOtpErr("");
  };

  return (
    <div className="w-full">

      {/* API error banner */}
      <AnimatePresence>
        {apiErr && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 flex items-center justify-between">
            <span>⚠️ {apiErr}</span>
            <button onClick={() => setApiErr("")} className="ml-3 text-red-400 hover:text-red-600 font-medium">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* ── STEP 1: Details ── */}
        {step === "details" && (
          <motion.div key="d" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            <h2 className="font-playfair text-3xl font-bold text-richbrown mb-2">
              Book Your <em className="italic text-gold">Appointment</em>
            </h2>
            <p className="text-sm text-richbrown-mid mb-8 leading-relaxed">
              Fill in the details below. We'll send an OTP to verify your number.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Your Name" name="name" placeholder="Priya Sharma"
                value={form.name} error={errors.name} onChange={handleFieldChange} />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210"
                value={form.phone} error={errors.phone} onChange={handleFieldChange} />
            </div>

            {/* Service dropdown */}
            <div className="mt-4 flex flex-col gap-1.5" ref={serviceRef}>
              <label className="text-[10px] tracking-[2px] uppercase text-richbrown-mid font-medium">
                Service Required
              </label>
              <button type="button" onClick={() => setServiceOpen(o => !o)}
                className={`w-full border rounded-2xl px-4 py-3.5 font-dm text-sm text-left flex items-center justify-between transition-all outline-none
                  ${errors.service ? "border-red-400 bg-red-50" : serviceOpen ? "border-gold bg-white" : "border-gold/20 bg-cream"}
                  ${!form.service ? "text-richbrown/40" : "text-richbrown"}`}>
                <span className="truncate pr-2">{form.service || "Select a service..."}</span>
                <svg className={`w-4 h-4 text-gold flex-shrink-0 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {serviceOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="relative z-50">
                    <div className="absolute top-1 left-0 right-0 bg-white border border-gold/20 rounded-2xl shadow-[0_8px_32px_rgba(196,156,120,0.18)] overflow-hidden">
                      <div className="overflow-y-auto max-h-[220px] overscroll-contain py-1.5">
                        {SERVICES.map((s) => (
                          <button key={s} type="button"
                            onClick={() => {
                              setForm(prev => ({ ...prev, service: s }));
                              setErrors(prev => ({ ...prev, service: undefined }));
                              setServiceOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm font-dm transition-colors
                              ${form.service === s ? "bg-gold/10 text-gold font-medium" : "text-richbrown hover:bg-cream"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {errors.service && <span className="text-red-400 text-xs">{errors.service}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Field label="Preferred Date" name="date" type="date"
                value={form.date} error={errors.date} onChange={handleFieldChange} />
              <Field label="Preferred Time" name="time" type="time"
                value={form.time} error={errors.time} onChange={handleFieldChange} />
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[2px] uppercase text-richbrown-mid font-medium">
                Additional Message
              </label>
              <textarea value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us more about what you're looking for..." rows={4}
                className="border border-gold/20 rounded-2xl px-4 py-3.5 font-dm text-sm text-richbrown bg-cream outline-none transition-all focus:border-gold focus:bg-white resize-none" />
            </div>

            <button onClick={sendOtp} disabled={loading}
              className="mt-6 w-full bg-gold hover:bg-gold-dark text-white font-dm text-sm font-medium py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.35)] disabled:opacity-60 flex items-center justify-center gap-2">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending OTP via SMS...</>
                : "Send OTP & Book Appointment →"}
            </button>
            <p className="text-center text-xs text-richbrown-light mt-4">
              🔒 A 6-digit OTP will be sent to your mobile via SMS
            </p>
          </motion.div>
        )}

        {/* ── STEP 2: Verify OTP ── */}
        {step === "verify" && (
          <motion.div key="v" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📱</div>
              <h2 className="font-playfair text-3xl font-bold text-richbrown mb-2">
                Verify <em className="italic text-gold">Your Number</em>
              </h2>
              <p className="text-sm text-richbrown-mid">OTP sent to <strong className="text-richbrown">{form.phone}</strong></p>
              <p className="text-xs text-richbrown-light mt-1">Check your SMS messages</p>
            </div>

            <div className="flex gap-2 sm:gap-3 justify-center mb-4">
              {otp.map((d, i) => (
                <input key={i} ref={el => { otpRefs.current[i] = el; }}
                  type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={e => otpChange(i, e.target.value)} onKeyDown={e => otpKey(i, e)}
                  className={`w-11 h-14 text-center text-xl font-bold font-playfair rounded-2xl border-2 bg-cream outline-none transition-all
                    ${otpErr ? "border-red-400 text-red-500" : d ? "border-gold text-richbrown bg-white shadow-[0_4px_12px_rgba(196,156,120,0.2)]" : "border-gold/20 text-richbrown focus:border-gold focus:bg-white"}`} />
              ))}
            </div>

            {otpErr && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center text-red-400 text-sm mb-4">{otpErr}</motion.p>
            )}

            <button onClick={verify} disabled={loading || otp.join("").length < 6}
              className="w-full bg-gold hover:bg-gold-dark text-white font-dm text-sm font-medium py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.35)] disabled:opacity-50 flex items-center justify-center gap-2 mb-4">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Confirming Booking...</>
                : "✓ Verify & Confirm Booking"}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button onClick={() => setStep("details")} className="text-richbrown-mid hover:text-richbrown transition-colors">← Change details</button>
              <button onClick={resendOtp} disabled={timer > 0 || loading}
                className={`transition-colors ${timer > 0 ? "text-richbrown-light cursor-default" : "text-gold hover:text-gold-dark cursor-pointer"}`}>
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === "success" && (
          <motion.div key="s" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }} className="text-center py-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(196,156,120,0.4)] text-white text-3xl">✓
            </motion.div>
            <h2 className="font-playfair text-3xl font-bold text-richbrown mb-3">
              Booking <em className="italic text-gold">Confirmed!</em>
            </h2>
            <p className="text-richbrown-mid text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Thank you, <strong className="text-richbrown">{form.name}</strong>! A confirmation has been sent to you and our team via WhatsApp. We'll confirm your slot shortly.
            </p>
            <div className="bg-cream rounded-2xl p-5 text-left space-y-3 mb-6">
              {[
                { l: "Service", v: form.service, i: "💄" },
                { l: "Date",    v: formatDate(form.date), i: "📅" },
                { l: "Time",    v: formatTime(form.time), i: "⏰" },
                { l: "Phone",   v: form.phone, i: "📱" },
              ].map(({ l, v, i }) => (
                <div key={l} className="flex items-start gap-3">
                  <span>{i}</span>
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-richbrown-light block">{l}</span>
                    <p className="text-sm font-medium text-richbrown">{v}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={resetForm} className="text-gold hover:text-gold-dark text-sm font-medium transition-colors">
              ← Book another appointment
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}