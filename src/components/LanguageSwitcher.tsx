"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const next = locale === "en" ? "ja" : "en";
  const label = locale === "en" ? "JA" : "EN";

  return (
    <button
      onClick={() => router.push(pathname, { locale: next })}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-alt hover:bg-surface-alt/80 transition-colors text-text-secondary hover:text-text-primary text-xs font-medium"
      aria-label={`Switch to ${next === "en" ? "English" : "Japanese"}`}
    >
      {label}
    </button>
  );
}
