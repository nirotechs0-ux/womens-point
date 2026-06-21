"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";

const CATEGORIES = ["Bridal", "Hair", "Nails", "Skin", "Makeup"];

interface AddPhotoModalProps {
  open: boolean;
  onClose: () => void;
  onAdded: (photo: { src: string; cat: string; label: string }) => void;
}

export default function AddPhotoModal({ open, onClose, onAdded }: AddPhotoModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setFile(null);
    setPreview(null);
    setCategory(CATEGORIES[0]);
    setLabel("");
    setKey("");
    setError("");
    setLoading(false);
  };

  const handleClose = () => {
    if (loading) return;
    reset();
    onClose();
  };

  const handleFile = (f: File | null) => {
    setError("");
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!file) return setError("Please choose a photo.");
    if (!label.trim()) return setError("Please add a short label for the photo.");
    if (!key.trim()) return setError("Please enter the access key.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("label", label.trim());
      formData.append("key", key.trim());

      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      onAdded({ src: data.photo.src, cat: data.photo.cat, label: data.photo.label });
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

            <div className="text-[12px] text-gold tracking-widest uppercase mb-1">Gallery</div>
            <h3 className="font-playfair text-[24px] font-bold text-richbrown mb-1">Add a Photo</h3>
            <p className="text-[13px] text-richbrown-light mb-6">
              Have an access key? Share a photo from a recent visit.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="text-[12px] text-richbrown-mid mb-1.5">Photo</div>
                <div className="relative border-[1.5px] border-dashed border-gold/40 rounded-xl overflow-hidden">
                  {preview ? (
                    <div className="relative">
                      <img src={preview} alt="Preview" className="w-full h-[180px] object-cover" />
                      <button
                        type="button"
                        onClick={() => handleFile(null)}
                        className="absolute top-2 right-2 bg-richbrown/70 text-white rounded-full p-1.5"
                        aria-label="Remove photo"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center gap-2 py-8 text-richbrown-light pointer-events-none">
                        <Upload size={20} />
                        <span className="text-[12px]">Tap to choose a photo</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              </div>

              <label className="block">
                <div className="text-[12px] text-richbrown-mid mb-1.5">Category</div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-cream rounded-xl px-4 py-3 text-[14px] text-richbrown outline-none border-[1.5px] border-transparent focus:border-gold/50"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <div className="text-[12px] text-richbrown-mid mb-1.5">Label</div>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Bridal HD Makeup"
                  maxLength={60}
                  className="w-full bg-cream rounded-xl px-4 py-3 text-[14px] text-richbrown outline-none border-[1.5px] border-transparent focus:border-gold/50"
                />
              </label>

              <label className="block">
                <div className="text-[12px] text-richbrown-mid mb-1.5">Access Key</div>
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your access key"
                  className="w-full bg-cream rounded-xl px-4 py-3 text-[14px] text-richbrown outline-none border-[1.5px] border-transparent focus:border-gold/50"
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
                    <Loader2 size={16} className="animate-spin" /> Uploading...
                  </>
                ) : (
                  "Add to Gallery"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}