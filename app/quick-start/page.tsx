"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import PageHero from "@/components/ui/PageHero";
import LoopVideo from "@/components/ui/LoopVideo";

// Instructions follow the owner's quick start guide (previously on the Webflow site). Each step
// pairs one short clip with the matching instruction; `points` holds the detail players ask about.
type Step = { title: string; body: string; points?: string[]; clip: string; label: string };

const READY = "WAITING FOR REF TO START";

const STEPS: Step[] = [
  {
    title: "Switch on the master controller",
    body: `Insert the key into the key slot and turn it 90 degrees to the right. Wait for the screen to read “${READY}”.`,
    clip: "/video/qs-controller-on",
    label: "A hand turning the key on the master controller, then its screen lighting up",
  },
  {
    title: "Switch on the medic boxes",
    body: `Same again for each medic box: insert the key and turn it 90 degrees to the right. When the screen reads “${READY}”, the sensors flash to show it's ready.`,
    clip: "/video/qs-medic-on",
    label: "A medic box being switched on with its key and lighting up red",
  },
  {
    title: "Switch on every tagger",
    body: `Insert the key into each tagger and turn it 90 degrees to the right. Wait for “${READY}” on the screen, with the sensors flashing.`,
    clip: "/video/qs-tagger-on",
    label: "A tagger being switched on with its key, then its screen and sensor lights coming on",
  },
  {
    title: "Start and stop the game",
    body: `Press the green button on the master controller. Everything showing “${READY}” switches on, and a timer starts counting up on the controller. Press the red button to end the game for everyone and stop the timer.`,
    points: ["Games of 5 to 10 minutes work best, and give players a breather in between."],
    clip: "/video/kit-controller",
    label: "The controller's green button starting a game and the red button ending it",
  },
  {
    title: "Aim for the sensors",
    body: "To tag someone, hit one of the three sensors at the tip of their tagger:",
    points: [
      "The light strip on the left side",
      "The clear bulb on top",
      "The light strip on the right side",
    ],
    clip: "/video/tagger-hit-sensors",
    label: "The tagger's hit lights flashing red, then a finger pointing out the sensors on the sides and top",
  },
  {
    title: "Reload",
    body: "Each tagger has 30 rounds before it needs reloading. The middle bar on the screen shows what's left in the magazine.",
    points: [
      "When the ammo runs out, the tagger reloads by itself.",
      "To reload early, press the red button on the left side.",
      "Reloading takes 5 seconds, with a countdown on the screen. Getting hit restarts it, so take cover first.",
    ],
    clip: "/video/qs-reload",
    label: "A finger pressing the tagger's red reload button and the ammo count refilling",
  },
  {
    title: "Choose a fire mode",
    body: "Taggers start in automatic mode: hold the trigger for continuous fire until the magazine's empty.",
    points: [
      "Press the black button on the left side to switch to single fire, one shot per trigger pull.",
      "Single fire saves ammo and makes for a more tactical game.",
    ],
    clip: "/video/tagger-display",
    label: "A finger pressing the tagger's mode button while the screen shows the fire mode",
  },
  {
    title: "Respawn at the medic box",
    body: "Each player starts with 5 hit points. After a hit they're invincible for 3 seconds (and can't fire back), which gives them time to find cover.",
    points: [
      "At 0 hit points the tagger stops firing, and the top bar on the screen shows 0.",
      "Head back to your team's medic box and hold the light strip on either side of your tagger over the light strip on the box.",
      "The tagger says \u201Crespawned\u201D and it's back in the game. You can only respawn once you're completely out of hit points.",
    ],
    clip: "/video/kit-medic-respawn",
    label: "A tagger being held against a medic box to respawn",
  },
];

// Straight from the booking terms (sections 4 and 5).
const SAFETY = [
  "Enforce a no-running rule.",
  "Avoid physical contact to prevent injury.",
  "Supervisors should make sure play stays safe, with water and regular breaks.",
  "Inflatable bunkers are for cover, not for jumping on.",
];

export default function QuickStartPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh] section-cream">
        <PageHero image="/images/page_header_quickstart.jpg" title="Quick start guide">
          From the box to the first game in a few minutes. The full setup guide is in your kit, and we&apos;re on{" "}
          <a href="tel:1300661565" className="text-white/80 hover:text-white underline">1300 661 565</a>{" "}if anything doesn&apos;t behave.
        </PageHero>

        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <ol className="flex flex-col gap-16 lg:gap-24">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center"
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <LoopVideo
                    src={step.clip}
                    label={step.label}
                    style={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                      borderRadius: "1.25rem",
                      background: "#e5e5e5",
                    }}
                  />
                </div>
                <div>
                  <p
                    className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--blue)] mb-3"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="section-heading text-[var(--ink)] mb-4" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)" }}>
                    {step.title}
                  </h2>
                  <p
                    className="text-[var(--muted)] leading-relaxed max-w-[46ch]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(15px, 1.2vw, 17px)" }}
                  >
                    {step.body}
                  </p>
                  {step.points && (
                    <ul className="mt-4 flex flex-col gap-2.5 max-w-[46ch]">
                      {step.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[var(--ink)]/75 leading-relaxed"
                          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(15px, 1.1vw, 16px)" }}
                        >
                          <span aria-hidden="true" className="mt-[0.6em] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--blue)" }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Safety — from the booking terms */}
          <section
            className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 lg:gap-14 rounded-[1.5rem] p-8 lg:p-12"
            style={{ background: "var(--ink)" }}
          >
            <div>
              <h2 className="section-heading text-white mb-3" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)" }}>
                Before you play
              </h2>
              <p className="text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                A few rules that keep the day fun. They&apos;re part of the{" "}
                <Link href="/terms#conduct" className="text-white/80 hover:text-white underline">booking terms</Link>.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {SAFETY.map((rule) => (
                <li
                  key={rule}
                  className="flex gap-3 text-white/85 leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(15px, 1.2vw, 17px)" }}
                >
                  <span aria-hidden="true" className="mt-[0.6em] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--orange)" }} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
