import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { procedures, TRINKS_URL } from "@/lib/beau";

type Step = "procedure" | "professional" | "date" | "time" | "done";

const professionals = ["Beatriz Borges", "Equipe Beau"];
const weekdayTimes = ["08:00", "09:30", "11:00", "14:00", "16:30", "18:00"];
const saturdayTimes = ["08:00", "09:30", "11:00", "13:30", "15:00"];

export function BookingFlow() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("procedure");
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [selection, setSelection] = useState({
    procedure: "",
    professional: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const openBooking = () => {
      triggerRef.current = document.activeElement as HTMLElement | null;
      setStep("procedure");
      setDirection(1);
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

  useEffect(() => {
    if (!open) return;

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };
  }, [open]);

  const choose = (key: keyof typeof selection, value: string, next: Step) => {
    setSelection((current) => {
      if (key === "procedure") {
        return { procedure: value, professional: "", date: "", time: "" };
      }
      if (key === "professional") {
        return { ...current, professional: value, date: "", time: "" };
      }
      if (key === "date") {
        return { ...current, date: value, time: "" };
      }
      return { ...current, [key]: value };
    });
    setDirection(1);
    setStep(next);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(
      step === "professional"
        ? "procedure"
        : step === "date"
          ? "professional"
          : "date",
    );
  };

  const titles: Record<Step, string> = {
    procedure: "Qual cuidado você procura?",
    professional: "Escolha sua profissional",
    date: "Qual dia funciona para você?",
    time: "Escolha um horário",
    done: "Simulação concluída",
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="max-h-[92svh] w-full overflow-y-auto bg-background px-5 pb-8 pt-5 sm:max-w-lg sm:px-8"
            layout
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow">Agendamento Beau · protótipo</p>
              <button ref={closeButtonRef} onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center text-xl" aria-label="Fechar demonstração de agendamento">
                ×
              </button>
            </div>

            {step !== "done" && (
              <div className="mt-5 h-1 bg-border" aria-label={`Etapa ${stepNumber} de 4`}>
                <motion.div className="h-full bg-primary" animate={{ width: `${stepNumber * 25}%` }} />
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={screenVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="min-h-[490px]"
              >
                <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">{step === "done" ? "Tudo certo" : `Etapa ${stepNumber} de 4`}</p>
                {step !== "procedure" && step !== "done" && (
                  <button type="button" onClick={goBack} className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <span aria-hidden>←</span> Voltar
                  </button>
                )}
                <h2 id="booking-title" aria-live="polite" className="display mt-3 text-[2.25rem]">{titles[step]}</h2>

                {step === "procedure" && (
                  <>
                    <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
                      Demonstração visual com horários ilustrativos. Na versão final, a confirmação será feita no Trinks.
                    </p>
                    <OptionList options={procedures.map((item) => item.title.join(" "))} onSelect={(value) => choose("procedure", value, "professional")} />
                  </>
                )}
                {step === "professional" && <OptionList options={professionals} onSelect={(value) => choose("professional", value, "date")} />}
                {step === "date" && <CalendarPicker onSelect={(value) => choose("date", value, "time")} />}
                {step === "time" && (
                  <>
                    <OptionList
                      options={isSaturday(selection.date) ? saturdayTimes : weekdayTimes}
                      onSelect={(value) => choose("time", value, "done")}
                    />
                    <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Horários demonstrativos para apresentação. A disponibilidade real será conectada ao Trinks após a aprovação do projeto.</p>
                  </>
                )}
                {step === "done" && (
                  <div className="mt-8 border-y border-border py-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">Esta é uma prévia demonstrativa do fluxo de agendamento da Beau. Nenhum horário foi reservado.</p>
                    <dl className="mt-6 space-y-3 text-sm">
                      <Summary label="Procedimento" value={selection.procedure} />
                      <Summary label="Profissional" value={selection.professional} />
                      <Summary label="Data e horário" value={`${formatDateKey(selection.date)} · ${selection.time}`} />
                    </dl>
                    <a href={TRINKS_URL} target="_blank" rel="noreferrer" className="mt-7 flex min-h-[52px] w-full items-center justify-between bg-primary px-5 text-left eyebrow !text-primary-foreground">
                      Acessar agendamento real no Trinks <span>↗</span>
                    </a>
                    <button onClick={() => setOpen(false)} className="mt-3 flex min-h-[48px] w-full items-center justify-between border-b border-border px-1 text-left eyebrow !text-foreground">
                      Voltar para a página <span>↓</span>
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

const screenVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 12 : -12,
    filter: "blur(2px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -12 : 12,
    filter: "blur(2px)",
  }),
};

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

function CalendarPicker({ onSelect }: { onSelect: (value: string) => void }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const leadingDays = (firstDay.getDay() + 6) % 7;
  const cells = Array.from({ length: leadingDays + daysInMonth }, (_, index) => {
    if (index < leadingDays) return null;
    return new Date(month.getFullYear(), month.getMonth(), index - leadingDays + 1);
  });
  const availableUntil = new Date(today);
  availableUntil.setDate(availableUntil.getDate() + 45);
  const lastAllowedMonth = new Date(availableUntil.getFullYear(), availableUntil.getMonth(), 1);

  const isAvailable = (date: Date) => {
    const isSunday = date.getDay() === 0;
    return date >= today && date <= availableUntil && !isSunday;
  };

  return (
    <div className="mt-7">
      <div className="flex items-center justify-between border-y border-border py-4">
        <button
          type="button"
          aria-label="Mês anterior"
          disabled={month <= new Date(today.getFullYear(), today.getMonth(), 1)}
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="flex h-11 w-11 items-center justify-center text-xl text-primary disabled:opacity-25"
        >
          ←
        </button>
        <p className="font-serif text-xl capitalize">
          {month.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </p>
        <button
          type="button"
          aria-label="Próximo mês"
          disabled={month >= lastAllowedMonth}
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="flex h-11 w-11 items-center justify-center text-xl text-primary disabled:opacity-25"
        >
          →
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
        {['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'].map((day) => <span key={day} className="py-2">{day}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, index) => {
          if (!date) return <span key={`empty-${index}`} className="aspect-square" />;
          const available = isAvailable(date);
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={!available}
              onClick={() => onSelect(formatKey(date))}
              className={`flex aspect-square items-center justify-center text-sm transition-colors ${available ? "bg-secondary/55 text-foreground hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground/55"}`}
              aria-label={`${formatDate(date)}${available ? "" : " — indisponível"}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><i className="h-2 w-2 bg-secondary" />Disponível</span>
        <span>Domingos indisponíveis</span>
      </div>
    </div>
  );
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function formatKey(date: Date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function formatDateKey(value: string) {
  if (!value) return "—";
  return formatDate(new Date(`${value}T12:00:00`));
}

function isSaturday(value: string) {
  return value ? new Date(`${value}T12:00:00`).getDay() === 6 : false;
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
