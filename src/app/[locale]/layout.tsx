import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { clsx } from "clsx";
import { Outfit, Unbounded } from "next/font/google";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/provider/theme-provider";
import ProgressBar from "@/components/global/ProgressBar/ProgressBar";
import GradientBlur from "@/components/global/GradientBlur";
import { Analytics } from "@vercel/analytics/react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// Wide, rounded geometric display face: echoes the "NEXUS" wordmark.
const heading = Unbounded({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Clean geometric sans for body copy: echoes "Labs" and the tagline.
const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#040a2c",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Metadata is generated before the layout body runs, so the locale has to be
  // established here too, otherwise next-intl falls back to reading headers and
  // the whole route opts out of static rendering.
  setRequestLocale(locale);

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    messages = {};
  }

  const t = (key: string) =>
    (messages.metadata as Record<string, string>)?.[key] || "";

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: t("author") }],
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: t("ogImage") }],
    },
    twitter: {
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: [{ url: t("twitterImage") }],
      card: "summary_large_image",
    },
    // Add "canonical" to messages/*/metadata.json once the Nexus domain is live.
    ...(t("canonical") ? { alternates: { canonical: t("canonical") } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={clsx(
          heading.variable,
          body.variable,
          "overflow-x-hidden bg-background font-sans text-foreground antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <GradientBlur position="top" />
            <Suspense>
              <ProgressBar />
            </Suspense>
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
