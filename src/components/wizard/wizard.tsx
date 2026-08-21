"use client";

import { useState } from "react";
import { ExportGuide } from "@/components/wizard/export-guide";
import { UploadStep } from "@/components/wizard/upload-step";
import { ProcessingStep } from "@/components/wizard/processing-step";
import { ResultsDashboard } from "@/components/wizard/results/results-dashboard";
import type { ParseResult } from "@/lib/instagram-parser";

type Stage = "guide" | "upload" | "processing" | "results";

export function Wizard() {
  const [stage, setStage] = useState<Stage>("guide");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ParseResult | null>(null);

  function restart() {
    setFile(null);
    setResult(null);
    setStage("guide");
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16" id="wizard">
      {stage === "guide" && (
        <ExportGuide onContinue={() => setStage("upload")} />
      )}

      {stage === "upload" && (
        <UploadStep
          onAnalyze={(f) => {
            setFile(f);
            setStage("processing");
          }}
        />
      )}

      {stage === "processing" && file && (
        <ProcessingStep
          file={file}
          onBack={() => setStage("upload")}
          onDone={(r) => {
            setResult(r);
            setStage("results");
          }}
        />
      )}

      {stage === "results" && result && (
        <ResultsDashboard result={result} onRestart={restart} />
      )}
    </div>
  );
}
