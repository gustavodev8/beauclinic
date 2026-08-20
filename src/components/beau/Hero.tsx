import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import { TRINKS_URL, openBooking } from "@/lib/beau";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative">
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="relative h-[58svh] w-full overflow-hidden md:h-[72svh]"
      >
        <img
          src={heroImg}
          alt="Cliente da Beau Clinic com resultado natural de micropigmentação"
          width={912}
          height={1408}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="edge-x -mt-4 pb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="eyebrow"
        >
          A Beau • Alagoinhas
        </motion.p>

        <h1 className="display mt-4 text-[2.9rem] sm:text-[3.4rem] md:text-[5rem]">
          {["Transformar sem", "mudar a "].map((line, i) => (
            <motion.span
              key={line}
              className="block overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {i === 1 ? (
                <>
                  {line}
                  <em className="font-serif italic text-primary">essência.</em>
                </>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6 }}
          className="mt-5 max-w-[30ch] text-[0.95rem] leading-relaxed text-muted-foreground"
        >
          Micropigmentação e beleza pensadas para valorizar aquilo que já é seu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-7"
        >
          <a
            href={TRINKS_URL}
            onClick={(event) => {
              event.preventDefault();
              openBooking();
            }}
            className="inline-flex h-13 min-h-[52px] w-full items-center justify-between bg-primary px-6 text-primary-foreground sm:w-auto sm:gap-10"
          >
            <span className="eyebrow !text-primary-foreground">Ver demonstração</span>
            <span aria-hidden className="text-primary-foreground">
              →
            </span>
          </a>
          <p className="mt-4 text-xs tracking-wide text-muted-foreground">Atendendo desde 2014.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
