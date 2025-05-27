"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  loadingStrategy?: "lazy" | "eager";
  onLoadingComplete?: () => void;
}

/**
 * OptimizedImage component that enhances the Next.js Image component with:
 * - Progressive loading with blur placeholder
 * - Fade-in animation on load
 * - Better error handling
 * - Optimized sizing
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  quality = 80,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  objectFit = "cover",
  loadingStrategy = "lazy",
  onLoadingComplete,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate a low-quality placeholder blur data URL
  // In a real app, you would use a microservice or API to generate these
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAI/+tkfOwAAAABJRU5ErkJggg==";

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Prepare image style based on objectFit
  const imageStyle: React.CSSProperties = {
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  };

  // Handle image load complete
  const handleLoadingComplete = () => {
    setIsLoaded(true);
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  };

  // Display fallback for errors
  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          className
        )}
        style={{ width: width || "100%", height: height || "100%" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        quality={quality}
        sizes={sizes}
        priority={priority || loadingStrategy === "eager"}
        loading={priority ? "eager" : loadingStrategy}
        placeholder="blur"
        blurDataURL={blurDataURL}
        style={imageStyle}
        onLoadingComplete={handleLoadingComplete}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
