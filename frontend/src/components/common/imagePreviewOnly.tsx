"use client";

import React, { useState } from "react";
import { Icons } from "@components/icons";

type ImagePreviewOnlyProps = {
  label?: string;
  previewUrl?: string | null;
  alt?: string;
  infoMessage?: string;
  emptyText?: string;
};

const ImagePreviewOnly: React.FC<ImagePreviewOnlyProps> = ({
  label = "Image",
  previewUrl,
  alt = "Preview",
  infoMessage,
  emptyText = "—",
}) => {
  const [showModal, setShowModal] = useState(false);
  const hasUrl = typeof previewUrl === "string" && previewUrl.trim().length > 0;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <div className="flex items-center gap-2">
          <div className="form-label flex items-center gap-1">{label}</div>
          {infoMessage && (
            <div className="relative flex items-center group">
              <Icons.Info className="w-4 h-4 text-gray-500 mb-2 cursor-pointer" />
              <div className="absolute bottom-full mb-2 w-[220px] bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg whitespace-normal z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                {infoMessage}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-1">
        {hasUrl ? (
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="form-label text-sm underline"
            >
              Preview image
            </button>
            {/* <a
              href={previewUrl!}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline text-zinc-base hover:text-gray-dark"
            >
              {openInNewTabText}
            </a> */}
          </div>
        ) : (
          <span className="text-sm text-zinc-base">{emptyText}</span>
        )}
      </div>

      {showModal && hasUrl && (
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
                aria-label="Close preview"
              >
                <Icons.X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={previewUrl!}
                alt={alt}
                className="w-full h-auto object-contain rounded max-h-[60vh] mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreviewOnly;
