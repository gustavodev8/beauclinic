import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TRINKS_URL, openBooking } from "@/lib/beau";

export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="edge-x py-3">
            <a
              href={TRINKS_URL}
              onClick={(event) => {
                event.preventDefault();
                openBooking();
              }}
              className="flex h-13 min-h-[52px] items-center justify-between bg-primary px-6"
            >
              <span className="eyebrow !text-primary-foreground">Agendar horário</span>
              <span aria-hidden className="text-primary-foreground">
                →
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
