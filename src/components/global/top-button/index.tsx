import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-12"
      }`}
    >
      <Button
        variant="secondary"
        size="icon"
        aria-label="Volver arriba"
        className="relative gradient-ring size-12 hover:-translate-y-1 hover:shadow-[0_10px_30px_-8px_rgba(110,57,253,0.8)]"
        onClick={scrollToTop}
      >
        <ArrowUp className="!size-5 text-brand-gold" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
