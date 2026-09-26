"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useTransition } from "react";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Determinar el idioma actual a partir de la URL
  const currentLang = pathname.startsWith("/es") ? "es" : "en";

  // Obtener la ruta sin el prefijo del idioma
  const pathAfterLang = pathname.replace(/^\/(en|es)/, "") || "/";

  // Cambiar el idioma sin recargar la página
  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "es" : "en";
    const newPath = newLang === "en" ? `/en${pathAfterLang}` : `/es${pathAfterLang}`;

    startTransition(() => {
      router.replace(newPath);
      router.refresh();
    });
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleLanguage}
      disabled={isPending}
      aria-label={currentLang === "en" ? "Cambiar a español" : "Switch to English"}
      className="h-10 md:h-12 gap-2 px-3 md:px-5 text-xs md:text-sm tracking-[0.2em]"
    >
      <Globe className="size-4 text-brand-gold" />
      <span>{currentLang === "en" ? "EN" : "ES"}</span>
    </Button>
  );
}
