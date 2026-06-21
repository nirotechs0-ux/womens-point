"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Loader2 } from "lucide-react";

const SERVICES = [
  "Bridal Makeup",
  "Reception Makeup",
  "Engagement Makeup",
  "Party Makeup",
  "Hair Styling",
  "Skin Care Treatment",
  "Nail Art",
  "Other",
];

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  onAdded: (review: { name: string; tag: string; stars: string; text: string }) => void;
}

export default function WriteReviewModal({ open, onClose, onAdded }: WriteReviewModalProps) {
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setService(SERVICES[0]);
    setStars(5);
    setMessage("");
    setError("");
    setLoading(false);
  };

  const handleClose = () => {
    if (loading) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Please enter your name.");
    if (!message.trim()) return setError("Please share a few words about your experience.");

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), service, stars, message: message.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      onAdded({
        name: data.review.name,
        tag: data.review.service,
        stars: "★".repeat(data.review.stars) + "☆".repeat(5 - data.review.stars),
        text: data.review.message,
      });
      reset();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-richbrown/60 backdrop-blur-sm z-50 flex items-center justify-center p-5"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-[440px] max-h-[90vh] overflow-y-auto relative"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 text-richbrown-light hover:text-richbrown transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="text-[12px] text-gold tracking-widest uppercase mb-1">Reviews</div>
            <h3 className="font-playfair text-[24px] font-bold text-richbrown mb-1">
              Share Your Experience
            </h3>
            <p className="text-[13px] text-richbrown-light mb-6">
              We&apos;d love to hear how your visit went.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <div className="text-[12px] text-richbrown-mid mb-1.5">Your Name</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  maxLength={60}
                  className="w-full bg-cream rounded-xl px-4 py-3 text-[14px] text-richbrown outline-none border-[1.5px] border-transparent focus:border-gold/50"
                />
              </label>

              <label className="block">
                <div className="text-[12px] text-richbrown-mid mb-1.5">Service</div>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-cream rounded-xl px-4 py-3 text-[14px] text-richbrown outline-none border-[1.5px] border-transparent focus:border-gold/50"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <div className="text-[12px] text-richbrown-mid mb-1.5">Rating</div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setStars(n)}
                      aria-label={`${n} star`}
                      className="transition-transform hover:scale-110"
                    >
                      <Star size={26} className={n <= stars ? "fill-gold text-gold" : "text-gold/25"} />
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <div className="text-[12px] text-richbrown-mid mb-1.5">Your Review</div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your experience..."
                  maxLength={500}
                  rows={4}
                  className="w-full bg-cream rounded-xl px-4 py-3 text-[14px] text-richbrown outline-none border-[1.5px] border-transparent focus:border-gold/50 resize-none"
                />
              </label>

              {error && <div className="text-[13px] text-red-500">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-gold-dark text-white rounded-xl py-3.5 text-[14px] font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}