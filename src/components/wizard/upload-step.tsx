"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileArchive, ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils";

export function UploadStep({
  onAnalyze,
}: {
  onAnalyze: (file: File) => void;
}) {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(candidate: File | undefined | null) {
    if (!candidate) return;
    const looksLikeZip =
      candidate.type === "application/zip" ||
      candidate.type === "application/x-zip-compressed" ||
      candidate.name.toLowerCase().endsWith(".zip");
    if (!looksLikeZip) {
      setError(t.upload.invalidType);
      setFile(null);
      return;
    }
    setError(null);
    setFile(candidate);
  }

  return (
    <div className="animate-fade-up">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {t.upload.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-mist">{t.upload.subtitle}</p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-12 text-center transition-colors",
          dragActive ? "border-signal bg-signal-soft" : "border-line bg-panel"
        )}
      >
        <UploadCloud
          size={30}
          strokeWidth={1.5}
          className={dragActive ? "text-signal" : "text-mist"}
        />
        <p className="font-display text-[15px] font-medium">
          {t.upload.dropText}
        </p>
        <p className="text-xs uppercase tracking-wider text-mist">
          {t.upload.or}
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-line bg-panel-hi px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-signal"
        >
          {t.upload.browse}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".zip,application/zip,application/x-zip-compressed"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-warn">{error}</p>
      )}

      {file && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-panel px-4 py-3">
          <div className="flex items-center gap-3">
            <FileArchive size={18} className="text-signal" />
            <div>
              <p className="text-sm font-medium text-ink">{file.name}</p>
              <p className="font-mono text-xs text-mist">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            aria-label="remove"
            className="text-mist transition-colors hover:text-warn"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs text-mist">
          <ShieldCheck size={14} className="text-signal" />
          {t.upload.privacyNote}
        </div>
        <button
          disabled={!file}
          onClick={() => file && onAnalyze(file)}
          className="w-full shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-medium text-void transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {t.upload.analyze}
        </button>
      </div>
    </div>
  );
}
