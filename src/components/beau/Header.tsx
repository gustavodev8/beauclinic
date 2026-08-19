import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INSTAGRAM_URL, TRINKS_URL, WHATSAPP_URL } from "@/lib/beau";

const links = [
  { label: "Essência", href: "#essencia" },
  { label: "Procedimentos", href: "#procedimentos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="edge-x flex h-14 items-center justify-between">
          <a
            href="#top"
            className="font-serif text-lg tracking-[0.32em] uppercase text-foreground"
          >
            A Beau
          </a>
          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-12 w-12 items-center justify-center"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-foreground transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-foreground transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background pt-24 pb-10 edge-x"
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-3 text-[2.4rem] text-foreground"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-6">
              <a
                href={TRINKS_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-14 items-center justify-center bg-primary text-primary-foreground eyebrow !text-primary-foreground"
              >
                Agendar horário →
              </a>
              <div className="flex gap-6 eyebrow">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
