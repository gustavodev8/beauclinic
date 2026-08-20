import { useState } from "react";
import { Reveal, MaskImage } from "./Reveal";
import { TRINKS_URL } from "@/lib/beau";
import brows from "@/assets/proc-sobrancelha.jpg";
import lips from "@/assets/proc-labial.jpg";
import design from "@/assets/proc-design.jpg";
import care from "@/assets/essence.jpg";

type Procedure = {
  id: string;
  title: string[];
  text: string;
  image: string;
  tags: string[];
  href: string;
};

const procedures: Procedure[] = [
  {
    id: "01",
    title: ["Micropigmentação", "de sobrancelhas"],
    text: "Definição e naturalidade respeitando seus traços.",
    image: brows,
    tags: ["Sobrancelhas", "Micropigmentação"],
    href: TRINKS_URL,
  },
  {
    id: "02",
    title: ["Micropigmentação", "labial"],
    text: "Cor, definição e aparência saudável sem perder naturalidade.",
    image: lips,
    tags: ["Lábios", "Micropigmentação"],
    href: TRINKS_URL,
  },
  {
    id: "03",
    title: ["Sobrancelhas"],
    text: "Design pensado para harmonizar com o seu rosto.",
    image: design,
    tags: ["Sobrancelhas"],
    href: TRINKS_URL,
  },
  {
    id: "04",
    title: ["Estética facial"],
    text: "Cuidados que deixam a pele leve, saudável e viva.",
    image: care,
    tags: ["Estética"],
    href: TRINKS_URL,
  },
];

const filters = ["Todos", "Sobrancelhas", "Lábios", "Micropigmentação", "Estética"];

function ProcedureBlock({ item }: { item: Procedure }) {
  return (
    <article className="pt-12">
      <Reveal>
        <span className="eyebrow">{item.id}</span>
      </Reveal>
      <MaskImage
        src={item.image}
        alt={item.title.join(" ")}
        width={912}
        height={1104}
        className="mt-4 aspect-[4/5] w-full"
      />
      <Reveal delay={0.06}>
        <h3 className="display mt-6 text-[2rem]">
          {item.title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h3>
        <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
          {item.text}
        </p>
        <a
          href={item.href}
          className="mt-5 inline-flex min-h-[48px] items-center gap-3 border-b border-foreground/30 pb-1 eyebrow !text-foreground"
        >
          Conhecer procedimento →
        </a>
      </Reveal>
    </article>
  );
}

export function Procedures() {
  const [active, setActive] = useState("Todos");
  const list =
    active === "Todos" ? procedures : procedures.filter((p) => p.tags.includes(active));

  return (
    <section id="procedimentos" className="py-20">
      <div className="edge-x">
        <Reveal>
          <span className="eyebrow">Procedimentos</span>
          <h2 className="display mt-4 text-[2.5rem] sm:text-[3rem]">
            Escolha como você
            <br />
            quer <em className="italic text-primary">se sentir.</em>
          </h2>
        </Reveal>
      </div>

      <div className="no-scrollbar mx-auto mt-8 flex w-full max-w-[1120px] gap-2 overflow-x-auto px-[clamp(22px,5vw,48px)] pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={`shrink-0 whitespace-nowrap border px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
              active === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="edge-x divide-y divide-border">
        {list.map((item) => (
          <ProcedureBlock key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
