import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { procedures } from "@/lib/beau";

type Step = "procedure" | "professional" | "date" | "time" | "done";

const professionals = ["Beatriz Borges", "Equipe Beau"];
const dates = ["Hoje, 19 ago", "Amanhã, 20 ago", "Quinta, 21 ago"];
const times = ["09:00", "10:30", "14:00", "16:30"];

export function BookingFlow() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("procedure");
  const [selection, setSelection] = useState({
    procedure: "",
    professional: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const openBooking = () => {
      setStep("procedure");
      setSelection({ procedure: "", professional: "", date: "", time: "" });
      setOpen(true);
    };
    window.addEventListener("beau:open-booking", openBooking);
    return () => window.removeEventListener("beau:open-booking", openBooking);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const choose = (key: keyof typeof selection, value: string, next: Step) => {
    setSelection((current) => ({ ...current, [key]: value }));
    setStep(next);
  };

  const titles: Record<Step, string> = {
    procedure: "Qual cuidado você procura?",
    professional: "Escolha sua profissional",
    date: "Qual dia funciona para você?",
    time: "Escolha um horário",
    done: "Seu pedido foi recebido",
  };

  const stepNumber = { procedure: 1, professional: 2, date: 3, time: 4, done: 4 }[step];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-cocoa/35 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="max-h-[92svh] w-full overflow-y-auto bg-background px-5 pb-8 pt-5 sm:max-w-lg sm:px-8"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow">Agendamento Beau · protótipo</p>
              <button onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center text-xl" aria-label="Fechar agendamento">
                ×
              </button>
            </div>

            {step !== "done" && (
              <div className="mt-5 h-1 bg-border" aria-label={`Etapa ${stepNumber} de 4`}>
                <motion.div className="h-full bg-primary" animate={{ width: `${stepNumber * 25}%` }} />
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25 }}>
                <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">{step === "done" ? "Tudo certo" : `Etapa ${stepNumber} de 4`}</p>
                <h2 id="booking-title" className="display mt-3 text-[2.25rem]">{titles[step]}</h2>

                {step === "procedure" && <OptionList options={procedures.map((item) => item.title.join(" "))} onSelect={(value) => choose("procedure", value, "professional")} />}
                {step === "professional" && <OptionList options={professionals} onSelect={(value) => choose("professional", value, "date")} />}
                {step === "date" && <OptionList options={dates} onSelect={(value) => choose("date", value, "time")} />}
                {step === "time" && (
                  <>
                    <OptionList options={times} onSelect={(value) => choose("time", value, "done")} />
                    <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Horários demonstrativos para apresentação. A disponibilidade real será conectada ao Trinks após a aprovação do projeto.</p>
                  </>
                )}
                {step === "done" && (
                  <div className="mt-8 border-y border-border py-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">Este é um protótipo visual do fluxo de agendamento da Beau.</p>
                    <dl className="mt-6 space-y-3 text-sm">
                      <Summary label="Procedimento" value={selection.procedure} />
                      <Summary label="Profissional" value={selection.professional} />
                      <Summary label="Data e horário" value={`${selection.date} · ${selection.time}`} />
                    </dl>
                    <button onClick={() => setOpen(false)} className="mt-7 flex min-h-[52px] w-full items-center justify-between bg-primary px-5 text-left eyebrow !text-primary-foreground">
                      Fechar protótipo <span>→</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OptionList({ options, onSelect }: { options: string[]; onSelect: (value: string) => void }) {
  return (
    <div className="mt-7 divide-y divide-border border-y border-border">
      {options.map((option) => (
        <button key={option} onClick={() => onSelect(option)} className="flex min-h-[64px] w-full items-center justify-between text-left text-sm transition-colors hover:bg-secondary/50">
          {option}
          <span className="text-primary">→</span>
        </button>
      ))}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
