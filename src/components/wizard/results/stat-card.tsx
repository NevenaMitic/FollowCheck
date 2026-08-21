export function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "signal" | "warn" | "fan";
}) {
  const accentClass =
    accent === "warn" ? "text-warn" : accent === "fan" ? "text-fan" : "text-ink";
  return (
    <div className="rounded-2xl border border-line bg-panel p-4">
      <p className="text-xs uppercase tracking-wider text-mist">{label}</p>
      <p className={`mt-1.5 font-display text-3xl font-semibold tabular-nums ${accentClass}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
