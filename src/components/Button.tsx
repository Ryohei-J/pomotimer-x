"use client";

import { motion } from "motion/react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary:
    "bg-accent text-white hover:bg-accent/85",
  secondary:
    "bg-surface-alt text-text-primary border border-divider hover:bg-surface-alt/80",
};

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded-lg font-semibold text-base text-center transition-colors
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
