"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Icons } from "@components/icons";

export type PdfDropzoneHandle = {
  open: () => void;
};

type PdfDropzoneProps = {
  title: string;
  subtitle: string;
  maxSizeMB?: number;
  onFile: (file: File) => void;
  onError?: (message: string) => void;
  className?: string;
};

const isPdfFile = (file: File) => {
  const nameOk = file.name.toLowerCase().endsWith(".pdf");
  const typeOk = (file.type || "").toLowerCase() === "application/pdf";
  return nameOk || typeOk;
};

const PdfDropzone = forwardRef<PdfDropzoneHandle, PdfDropzoneProps>(
  function PdfDropzone(
    { title, subtitle, maxSizeMB = 20, onFile, onError, className }: PdfDropzoneProps,
    ref
  ) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = useMemo(() => "application/pdf,.pdf", []);

  const validateAndHandle = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    if (!isPdfFile(file)) {
      const msg = "Only PDF files are allowed.";
      setError(msg);
      onError?.(msg);
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      const msg = `File size exceeds ${maxSizeMB}MB.`;
      setError(msg);
      onError?.(msg);
      return;
    }

    setError(null);
    onFile(file);
  };

  const openPicker = () => inputRef.current?.click();

  useImperativeHandle(ref, () => ({ open: openPicker }), [openPicker]);

  return (
    <div className="flex flex-col w-full">
      <div
        className={[
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed",
          "transition cursor-pointer select-none",
          "h-[160px] px-4 text-center",
          isDragging
            ? "border-primary/70 bg-accent/40"
            : "border-gray-200 bg-white",
          className ?? "",
        ].join(" ")}
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          validateAndHandle(e.dataTransfer.files);
        }}
      >
        <Icons.Upload className="w-10 h-10 text-gray-400 mb-2" />
        <div className="text-sm font-semibold text-zinc-dark">{title}</div>
        <div className="text-xs text-zinc-base mt-1">{subtitle}</div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            validateAndHandle(e.target.files);
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
      </div>

      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </div>
  );
}
);

export default PdfDropzone;

