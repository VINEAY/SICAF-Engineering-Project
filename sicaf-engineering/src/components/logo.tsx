import React from "react";

export default function Logo({ className = "", isInverted = false }: { className?: string, isInverted?: boolean }) {
  const primaryColor = isInverted ? "#FFFFFF" : "#00778D"; // teal
  const secondaryColor = isInverted ? "#FFFFFF" : "#F97316"; // orange
  const textColor = isInverted ? "#FFFFFF" : "#333333"; // dark gray

  return (
    <div className={`flex items-center ${className}`}>
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3 3H24.4L11.7 37H0L10.3 3Z" fill={secondaryColor} />
        <path d="M22.5 3H34.1L25.8 25H14.1L22.5 3Z" fill={textColor} />
        <path d="M32.1 15L35.8 3H48L37.7 37H29.5L32.1 15Z" fill={primaryColor} />
      </svg>
      <div className="ml-2 font-bold">
        <div className={`text-lg ${isInverted ? "text-white" : "text-slate-900"}`}>SICAF</div>
        <div className={`text-sm -mt-1 ${isInverted ? "text-white/80" : "text-slate-700"}`}>ENGINEERING</div>
      </div>
    </div>
  );
}
