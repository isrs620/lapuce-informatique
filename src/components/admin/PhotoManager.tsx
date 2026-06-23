"use client";

import { useRef, useState } from "react";

interface PhotoManagerProps {
  mainPhoto: string | null;
  gallery: string[];
  onMainPhotoChange: (url: string | null) => void;
  onGalleryChange: (urls: string[]) => void;
  onUpload: (file: File) => Promise<string>;
}

export default function PhotoManager({
  mainPhoto,
  gallery,
  onMainPhotoChange,
  onGalleryChange,
  onUpload,
}: PhotoManagerProps) {
  const mainInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File, target: "main" | "gallery") => {
    setError("");
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);
    try {
      const url = await onUpload(file);
      if (target === "main") {
        onMainPhotoChange(url);
      } else {
        onGalleryChange([...gallery, url]);
      }
      setPreview(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur d'upload");
      setPreview(null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  const removeFromGallery = (index: number) => {
    onGalleryChange(gallery.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Photo principale */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Photo principale</label>
        <div className="flex flex-wrap gap-4 items-start">
          <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/50 overflow-hidden flex items-center justify-center relative">
            {(preview || mainPhoto) ? (
              <img src={preview || mainPhoto!} alt="Aperçu" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-sky-300">📷</span>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-sky-600 font-medium">
                Upload...
              </div>
            )}
          </div>
          <div className="space-y-2">
            <input
              ref={mainInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f, "main");
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => mainInput.current?.click()}
              disabled={uploading}
              className="block px-4 py-2 text-sm font-semibold bg-sky-500 text-white rounded-xl hover:bg-sky-600 disabled:opacity-50"
            >
              {mainPhoto ? "Remplacer la photo" : "Téléverser une photo"}
            </button>
            {mainPhoto && (
              <button
                type="button"
                onClick={() => { onMainPhotoChange(null); setPreview(null); }}
                className="block px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100"
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Galerie */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Galerie de photos</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {gallery.map((url, i) => (
            <div key={`${url}-${i}`} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 group">
              <img src={url} alt={`Galerie ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeFromGallery(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => galleryInput.current?.click()}
            disabled={uploading}
            className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-2xl text-slate-400 hover:border-sky-400 hover:text-sky-500 transition-colors"
          >
            +
          </button>
        </div>
        <input
          ref={galleryInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f, "gallery");
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-xs text-slate-400">JPG, PNG, WebP ou GIF — max 5 Mo. Aperçu avant enregistrement.</p>
    </div>
  );
}
