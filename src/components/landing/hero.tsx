"use client";

import { ArrowRight, Lock, Cpu, Code2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { InstagramOrb } from "@/components/landing/instagram-orb";
import BorderGlow from '@/components/BorderGlow';
import GradientText from "../GradientText";

const pillarIcons = [Lock, Cpu, Code2];

export function Hero({ onStart }: { onStart: () => void }) {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8">

        {/* LEFT — CONTENT */}
        <div>
          <GradientText
            colors={["#5B3FD6", "#D05AAE", "#8967B5"]}
            animationSpeed={10}
            showBorder={false}
            className="custom-class text-[14px] font-mono uppercase tracking-widest"
          >
            {t.hero.eyebrow}
          </GradientText>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {t.hero.title}
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-mist">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onStart}
              className=" group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-void
              transition-all duration-200 hover:scale-[1.02] hover:bg-signal hover:text-white
              hover:shadow-[0_0_25px_rgba(147,51,234,0.7)] active:scale-[0.94] active:bg-fuchsia-500 active:shadow-[0_0_45px_rgba(217,70,239,0.9)]"
            >
              {t.hero.cta}

              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">

          </div>

          <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {t.hero.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];

              return (
                <BorderGlow
                  key={pillar.title}
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="transparent"
                  borderRadius={12}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                >
                  <div className="p-3.5">
                    <Icon size={16} className="text-signal" />

                    <dt className="mt-2 text-[13px] font-medium text-ink">
                      {pillar.title}
                    </dt>

                    <dd className="mt-0.5 text-xs leading-snug text-mist">
                      {pillar.desc}
                    </dd>
                  </div>
                </BorderGlow>
              );
            })}
          </dl>
        </div>

        {/* RIGHT — 3D INSTAGRAM ORB */}
        <div className="flex justify-center md:justify-end">
          <InstagramOrb />
        </div>

      </div>
    </section>
  );
}