import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/beau/Header";
import { Hero } from "@/components/beau/Hero";
import { StickyCTA } from "@/components/beau/StickyCTA";
import { Procedures } from "@/components/beau/Procedures";
import {
  Positioning,
  ClinicDetails,
  Results,
  Marquee,
  About,
  Why,
  Testimonials,
  InstagramSection,
  Location,
  FinalCTA,
  Footer,
} from "@/components/beau/Sections";

const title = "A Beau Clinic — Micropigmentação em Alagoinhas — BA";
const description =
  "Transformar sem mudar a essência. Micropigmentação de sobrancelhas, labial e estética em Alagoinhas — BA. Agende seu horário online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <ClinicDetails />
      <Positioning />
      <Procedures />
      <Results />
      <Marquee />
      <About />
      <Why />
      <Testimonials />
      <InstagramSection />
      <Location />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
