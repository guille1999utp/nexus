import { notFound } from "next/navigation";

/**
 * Catch-all for URLs that match no route, e.g. /es/does-not-exist.
 *
 * The layout that provides <html>, the fonts and the translations lives under
 * [locale], so a root-level app/not-found.tsx could not use any of them and
 * Next would fall back to its own unstyled 404. Routing the miss through this
 * segment instead lets [locale]/not-found.tsx render inside the locale layout,
 * with the branded page and its translations intact.
 */
export default function CatchAllPage() {
  notFound();
}
