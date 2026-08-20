import { Reveal, MaskImage } from "./Reveal";
import { INSTAGRAM_URL, MAPS_URL, TRINKS_URL, WHATSAPP_URL, openBooking } from "@/lib/beau";
import essence from "@/assets/essence.jpg";
import founder from "@/assets/founder.jpg";
import result2 from "@/assets/result-2.jpg";
import result3 from "@/assets/result-3.jpg";
import brows from "@/assets/proc-sobrancelha.jpg";
import lips from "@/assets/proc-labial.jpg";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";

export function Positioning() {
  return (
    <section id="essencia" className="py-16">
      <div className="edge-x">
        <Reveal>
          <span className="eyebrow">Nossa essência</span>
          <h2 className="display mt-4 text-[2.5rem] sm:text-[3rem]">
            Beleza que continua
            <br />
            parecendo <em className="italic text-primary">você.</em>
          </h2>
          <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
            Cada procedimento é pensado para valorizar seus traços, respeitar sua identidade
            e trazer mais praticidade para sua rotina.
          </p>
        </Reveal>
      </div>
      <MaskImage
        src={essence}
        alt="Retrato de cliente com pele iluminada e sobrancelhas naturais"
        width={1008}
        height={1200}
        className="mt-10 aspect-[5/6] w-full"
      />
    </section>
  );
}

export function ClinicDetails() {
  return (
    <section className="border-y border-border bg-secondary/35 py-8">
      <div className="edge-x grid gap-7 sm:grid-cols-3 sm:gap-5">
        <Reveal>
          <p className="eyebrow">A Beau — Alagoinhas</p>
          <p className="mt-3 font-serif text-2xl">
            5.0 <span className="text-primary">★★★★★</span>
          </p>
          <a
            href={TRINKS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex min-h-[44px] items-center text-xs text-muted-foreground underline decoration-border underline-offset-4"
          >
            1 avaliação no Trinks →
          </a>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow">Atendimento</p>
          <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
            Segunda a sexta, das 8h às 19h. Sábado, das 8h às 16h.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="eyebrow">Onde estamos</p>
          <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
            Prédio THIJÓ, 2º piso, sala 201 — Alagoinhas, BA.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const results = [
  { src: brows, alt: "Resultado de micropigmentação de sobrancelhas", label: "Antes / Depois" },
  { src: lips, alt: "Resultado de micropigmentação labial", label: "Antes / Depois" },
  { src: result2, alt: "Cliente Beau com resultado natural", label: "Depois" },
  { src: result3, alt: "Cliente Beau com sobrancelhas definidas", label: "Depois" },
];

export function Results() {
  return (
    <section id="resultados" className="py-16">
      <div className="edge-x">
        <Reveal>
          <span className="eyebrow">Resultados A Beau</span>
          <h2 className="display mt-4 text-[2.5rem] sm:text-[3rem]">
            Você ainda.
            <br />
            Só que <em className="italic text-primary">ainda mais você.</em>
          </h2>
        </Reveal>
      </div>

      <div className="no-scrollbar mx-auto mt-8 flex w-full max-w-[1120px] snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(22px,5vw,48px)]">
        {results.map((r) => (
          <figure key={r.alt} className="w-[82vw] shrink-0 snap-start md:w-[38vw]">
            <img
              src={r.src}
              alt={r.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="mt-3 eyebrow">{r.label}</figcaption>
          </figure>
        ))}
      </div>

      <div className="edge-x mt-8">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[48px] items-center border-b border-foreground/30 pb-1 eyebrow !text-foreground"
        >
          Ver mais resultados no Instagram →
        </a>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = ["Desde 2014", "Especialistas em micropigmentação", "Alagoinhas — BA"];
  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.concat(items).map((t, i) => (
              <span key={`${k}-${i}`} className="eyebrow px-6 whitespace-nowrap">
                {t} <span className="px-4 text-primary">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" className="py-16">
      <MaskImage
        src={founder}
        alt="Beatriz Borges, fundadora da A Beau Clinic"
        width={912}
        height={1312}
        className="aspect-[3/4] w-full"
      />
      <div className="edge-x mt-8">
        <Reveal>
          <span className="eyebrow">A Beau</span>
          <h2 className="display mt-4 text-[2.3rem] sm:text-[2.8rem]">
            Uma técnica criada para
            <br />
            <em className="italic text-primary">realçar</em>, não transformar.
          </h2>
          <p className="mt-6 font-serif text-xl">Beatriz Borges</p>
          <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
            A Beau nasceu com o propósito de tornar a beleza mais prática sem apagar aquilo
            que torna cada pessoa única.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const reasons = [
  ["01", "Naturalidade", "Resultados pensados para combinar com você."],
  ["02", "Experiência", "Referência em micropigmentação desde 2014."],
  ["03", "Personalização", "Nenhum rosto é tratado da mesma forma."],
  ["04", "Praticidade", "Beleza que facilita a sua rotina."],
];

export function Why() {
  return (
    <section className="edge-x py-16">
      <Reveal>
        <span className="eyebrow">Por que a Beau</span>
      </Reveal>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {reasons.map(([n, title, text], i) => (
          <Reveal key={n} delay={i * 0.05}>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 py-6">
              <span className="eyebrow pt-1">{n}</span>
              <div className="min-w-0">
                <h3 className="text-[0.78rem] uppercase tracking-[0.2em]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="edge-x">
        <Reveal>
          <span className="eyebrow">Avaliações</span>
          <h2 className="display text-[2.5rem] sm:text-[3rem]">
            Uma experiência
            <br />que começa no <em className="italic text-primary">cuidado.</em>
          </h2>
          <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
            A Beau tem nota 5.0 no Trinks. Consulte a avaliação real e agende seu procedimento por lá.
          </p>
          <a
            href={TRINKS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-[48px] items-center border-b border-foreground/30 pb-1 eyebrow !text-foreground"
          >
            Ver avaliação no Trinks →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function InstagramSection() {
  const grid = [ig3, ig2, ig1, ig4];
  return (
    <section className="py-16">
      <div className="edge-x">
        <Reveal>
          <h2 className="display text-[2.5rem]">Já nos segue?</h2>
          <p className="mt-2 font-serif text-xl italic text-primary">@beauclinc</p>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
            Resultados, bastidores e tudo que acontece por aqui.
          </p>
        </Reveal>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-1">
        {grid.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Publicação do Instagram da A Beau Clinic"
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-cover"
          />
        ))}
      </div>
      <div className="edge-x mt-8">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[48px] items-center border-b border-foreground/30 pb-1 eyebrow !text-foreground"
        >
          Abrir Instagram →
        </a>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="localizacao" className="edge-x py-16">
      <Reveal>
        <span className="eyebrow">A Beau</span>
        <h2 className="display mt-3 text-[2.2rem]">Alagoinhas</h2>
        <address className="mt-6 text-sm not-italic leading-relaxed text-muted-foreground">
          Praça Mário Laert / Rua Marcelo L. Pereira, 50
          <br />
          Prédio THIJÓ — 2º piso, sala 201
          <br />
          Alagoinhas — BA
        </address>
        <div className="mt-6 flex flex-col gap-4">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] w-fit items-center border-b border-foreground/30 pb-1 eyebrow !text-foreground"
          >
            Como chegar →
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] w-fit items-center font-serif text-xl"
          >
            (71) 99723-0824
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="edge-x py-20">
        <Reveal>
          <span className="eyebrow !text-primary-foreground/70">Seu momento</span>
          <h2 className="display mt-5 text-[3rem] sm:text-[3.6rem]">
            Pronta para
            <br />
            se sentir <em className="italic">Beau?</em>
          </h2>
          <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-primary-foreground/80">
            Escolha seu procedimento e encontre o melhor horário para você.
          </p>
          <a
            href={TRINKS_URL}
            onClick={(event) => {
              event.preventDefault();
              openBooking();
            }}
            className="mt-9 flex min-h-[56px] items-center justify-between bg-background px-6 text-foreground"
          >
            <span className="eyebrow !text-foreground">Agendar agora</span>
            <span aria-hidden>→</span>
          </a>
          <p className="mt-4 text-xs text-primary-foreground/70">
            Agendamento online rápido e seguro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="edge-x pt-14 pb-32">
      <p className="font-serif text-lg tracking-[0.32em] uppercase">A Beau</p>
      <p className="mt-3 font-serif text-xl italic text-muted-foreground">
        Transformar sem mudar a essência.
      </p>
      <nav className="mt-8 flex flex-col gap-4 eyebrow">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="min-h-[44px]">
          Instagram
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="min-h-[44px]">
          WhatsApp
        </a>
        <a href={TRINKS_URL} target="_blank" rel="noreferrer" className="min-h-[44px]">
          Agendamento
        </a>
      </nav>
      <p className="mt-10 text-xs text-muted-foreground">Alagoinhas — Bahia</p>
      <p className="mt-1 text-xs text-muted-foreground">© A Beau</p>
    </footer>
  );
}
