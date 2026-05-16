"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Icons } from "@components/icons";

interface FileUploadProps {
  label?: string;
  accept?: string; // e.g. "image/png,image/jpeg,.png,.jpg,.jpeg"
  maxSizeMB?: number;
  onChange: (file: File | null) => void;
  onError?: (error: string) => void;
  error?: string;
  previewUrl?: string | null;
  required?: boolean;
  infoMessage?: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload file",
  accept = "image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp", 

  maxSizeMB = 2,
  onChange,
  onError,
  error,
  previewUrl,
  required = false,
  infoMessage,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const normPreview = (u?: string | null) =>
    typeof u === "string" && u.trim().length > 0 ? u.trim() : null;

  const [fileName, setFileName] = useState(() =>
    normPreview(previewUrl)
      ? normPreview(previewUrl)!.split("/").pop() || "No file chosen"
      : "No file chosen"
  );
  const [hasFile, setHasFile] = useState(() =>
    Boolean(normPreview(previewUrl))
  );
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const parsedAccept = useMemo(() => {
    const tokens = (accept || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const mimes = new Set<string>();
    const exts = new Set<string>();
    const wildcards: string[] = [];

    for (const t of tokens) {
      if (t.startsWith(".")) exts.add(t.toLowerCase());
      else if (t.includes("/*"))
        wildcards.push(t.toLowerCase()); // e.g. image/*
      else if (t.includes("/")) mimes.add(t.toLowerCase());
    }
    return { mimes, exts, wildcards };
  }, [accept]);

  const fileMatchesAccept = (file: File) => {
    const type = (file.type || "").toLowerCase();
    const dot = file.name.lastIndexOf(".");
    const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : "";

    if (parsedAccept.mimes.has(type)) return true;
    if (ext && parsedAccept.exts.has(ext)) return true;

    // wildcard support like image/*
    for (const w of parsedAccept.wildcards) {
      const family = w.split("/")[0] + "/";
      if (type.startsWith(family)) return true;
    }
    return false;
  };

  const handleRemoveFile = (e?: React.MouseEvent) => {
    if (disabled) return;
    e?.preventDefault();
    e?.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    setFileName("No file chosen");
    setHasFile(false);
    onChange(null);
  };

  useLayoutEffect(() => {
        const url = normPreview(previewUrl);
        const hasSelection = !!inputRef.current?.files?.length;

        // If a user just selected a file, keep the real filename set in handleFileChange
        if (hasSelection) {
            setHasFile(true);
            return;
        }

        if (url) {
            // Existing server/preview file – show a generic label, not a UUID from the URL
            setHasFile(true);
            setFileName("Existing file");
        } else {
            setHasFile(false);
            setFileName("No file chosen");
            setShowModal(false);
        }
    }, [previewUrl]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (!file) {
      setFileName("No file chosen");
      setHasFile(false);
      onChange(null);
      return;
    }

    if (!fileMatchesAccept(file)) {
      onError?.("Only JPG or PNG are allowed.");
      setFileName("No file chosen");
      setHasFile(false);
      onChange(null);
      return;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      onError?.(`File size exceeds ${maxSizeMB}MB.`);
      setFileName("No file chosen");
      setHasFile(false);
      onChange(null);
      return;
    }

    setFileName(file.name);
    setHasFile(true);
    onChange(file);
  };

  const inputId = `upload-${(label || "file")
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <div className="flex items-center gap-2">
          <label
            htmlFor={inputId}
            className="form-label flex items-center gap-1"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>

          {infoMessage && (
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Icons.Info className="w-4 h-4 text-gray-500 mb-2 cursor-pointer" />
              {showTooltip && (
                <div className="absolute bottom-full mb-2 w-[220px] bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg whitespace-normal z-10">
                  {infoMessage}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Input + Delete (no absolute positioning; wraps on small screens) */}
      <div className="mt-1 flex flex-wrap items-stretch gap-2">
        <label
          className={`flex min-w-0 flex-1 items-center rounded-md overflow-hidden border h-10 ${
            disabled
              ? "bg-gray-100 border-gray-300 cursor-not-allowed"
              : "bg-white form-border-default cursor-pointer"
          }`}
          htmlFor={inputId}
        >
          <div
            className={`text-sm font-semibold px-4 h-full flex items-center justify-center ${
              disabled
                ? "bg-gray-300 text-gray-500"
                : "bg-green-light hover:bg-green-base/90 text-white"
            }`}
          >
            {" "}
            Upload File
          </div>
          <div
            className={`flex-1 px-3 text-sm truncate ${
              disabled ? "text-gray-400" : "text-zinc-base"
            }`}
          >
            {" "}
            {fileName}
          </div>
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            required={required}
            className="hidden"
            disabled={disabled}
          />
        </label>

        {hasFile && !disabled && (
          <button
            type="button"
            aria-label="Remove file"
            title="Remove file"
            onClick={handleRemoveFile}
            className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded border form-border-default hover:bg-zinc-100 transition"
          >
            <Icons.Trash className="w-4 h-4 text-red-500" />
          </button>
        )}
      </div>

      {/* Preview + errors (stack nicely on mobile) */}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {hasFile && previewUrl && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="form-label text-sm underline"
          >
            Preview image
          </button>
        )}
        {error && <span className="form-error">{error}</span>}
      </div>

      {/* Preview Modal */}
      {showModal && previewUrl && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200">
              <h3 className="text-sm font-medium text-zinc-dark">
                Image Preview
              </h3>
              <button
                className="text-zinc-base hover:text-gray-dark cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <Icons.X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto object-contain rounded max-h-[60vh] mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default FileUpload;