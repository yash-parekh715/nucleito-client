"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-2xl",
        "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
        "before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-purple-500/20",
        "before:-z-10 before:mask before:mask-[linear-gradient(white,white)]",
        "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
