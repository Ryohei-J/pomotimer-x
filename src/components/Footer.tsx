import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="w-full max-w-6xl mt-6 px-4 pb-4 text-center text-xs text-text-secondary space-y-2">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        <Link
          href="/privacy"
          className="hover:text-text-primary transition-colors"
        >
          {t("privacyPolicy")}
        </Link>
        <Link
          href="/terms"
          className="hover:text-text-primary transition-colors"
        >
          {t("termsOfService")}
        </Link>
        <a
          href="https://www.youtube.com/t/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors"
        >
          {t("youtubeTerms")}
        </a>
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors"
        >
          {t("googlePrivacy")}
        </a>
      </div>
      <p>{t("copyright")}</p>
    </footer>
  );
}
