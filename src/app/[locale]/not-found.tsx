
import AnimatedH1 from "@/components/global/AnimatedH1/AnimatedH1";
import Orbit from "@/components/global/Orbit";
import { NexusMark } from "@/components/global/NexusLogo";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";


export const metadata = {
  title: "Page Not Found | Nexus Labs",
  description: "Page Not Found",
};



export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden cosmos-bg px-5">
      <div aria-hidden="true" className="starfield absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/20 blur-[140px]" />
      <Orbit className="absolute left-1/2 top-1/2 size-[110vmin] -translate-x-1/2 -translate-y-1/2" duration={80} opacity={0.45} />

      <div className="relative flex max-w-2xl flex-col items-center text-center">
        <NexusMark priority className="w-28 drop-shadow-[0_0_30px_rgba(110,57,253,0.55)] md:w-36" />
        <p className="mt-6 font-display text-7xl font-bold brand-gradient-text md:text-9xl">404</p>
        <AnimatedH1 delay={0} className="mt-4 text-3xl md:text-5xl">
          {t("title")}
        </AnimatedH1>
        <p className="mx-4 my-6 text-base text-muted-foreground md:text-xl">
          {t("description")}
        </p>

        <Link href="/" className={buttonVariants({ size: "lg", className: "group mt-2" })}>
          <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
          {t("buttonText")}
        </Link>
      </div>
    </div>
  );
}
