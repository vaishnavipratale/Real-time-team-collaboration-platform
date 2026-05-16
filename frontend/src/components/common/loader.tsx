"use client";

import React from "react";
import { Logo } from "@components/images";

type LoaderProps = {
  message?: string;
};

const Loader: React.FC<LoaderProps> = ({
  message = "CityMali is getting ready...",
}) => {
  return (
    <div className="fixed inset-0 bg-bg-surface/80 z-50 flex flex-col items-center justify-center gap-2">
      {/* Static Logo */}
      <div className="relative w-20 h-20">
        <img
          src={Logo}
          alt="CityMali Logo"
          className="w-full h-full object-contain"
        />

        {/* Progress bar under the logo */}
        <div className="absolute -bottom-4 left-0 w-full h-1 bg-gray-light rounded overflow-hidden">
          <div
            className="h-full w-full bg-yellow-light animate-progressBar"
            style={{ animationTimingFunction: "ease-in-out" }}
          />
        </div>
      </div>

      {/* Loading message */}
      <p className="text-sm text-text-base font-base leading-loose text-center mt-2">
        {message}
      </p>

      {/* Inline keyframes */}
      <style>{`
        @keyframes progressBar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-progressBar {
          animation: progressBar 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
