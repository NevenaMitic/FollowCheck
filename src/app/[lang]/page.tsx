"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { ProcessSteps } from "@/components/landing/process-steps";
import { Wizard } from "@/components/wizard/wizard";
import { FAQ } from "@/components/faq";

export default function Home() {
  const scrollToWizard = () => {
    document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onStart={scrollToWizard} />
        <ProcessSteps />
        <Wizard />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}