import React from "react";

type PillTone =
  | "teal"
  | "green"
  | "slate"
  | "orange"
  | "red"
  | "yellow";

interface TablePillProps {
  label: string;
  tone?: PillTone;
}

const toneStyles: Record<PillTone, React.CSSProperties> = {
  teal: {
    borderColor: "rgb(var(--teal-base) / 0.35)",
    backgroundColor: "rgb(var(--teal-soft) / 0.7)",
    color: "rgb(var(--teal-dark))",
  },
  green: {
    borderColor: "rgb(var(--green-base) / 0.35)",
    backgroundColor: "rgb(var(--green-soft) / 0.7)",
    color: "rgb(var(--green-dark))",
  },
  slate: {
    borderColor: "rgb(var(--border-default))",
    backgroundColor: "rgb(var(--zinc-light))",
    color: "rgb(var(--zinc-base))",
  },
  orange: {
    borderColor: "rgb(var(--orange-base) / 0.35)",
    backgroundColor: "rgb(var(--orange-soft) / 0.7)",
    color: "rgb(var(--orange-dark))",
  },
  red: {
    borderColor: "rgb(var(--red-base) / 0.35)",
    backgroundColor: "rgb(var(--red-soft) / 0.7)",
    color: "rgb(var(--red-dark))",
  },
  yellow: {
    borderColor: "rgb(var(--yellow-base) / 0.35)",
    backgroundColor: "rgb(var(--yellow-soft) / 0.7)",
    color: "rgb(var(--yellow-dark))",
  },
};

const TablePill: React.FC<TablePillProps> = ({ label, tone = "slate" }) => {
  return (
    <span
      className="inline-flex min-w-[72px] items-center justify-center rounded-lg border px-3 py-1 text-xs font-semibold"
      style={toneStyles[tone]}
    >
      {label}
    </span>
  );
};

export default TablePill;
