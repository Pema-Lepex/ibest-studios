"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { educare, educareDaza, educareNono, educareSeries, thumb, type EducareEpisode } from "@/data/site";
import { Container, Eyebrow, Reveal, SplitText, h2Class } from "./motion";
import VideoLoop from "./VideoLoop";
import { playVideo } from "./VideoModal";

const TILE_COLORS = ["#ffc928", "#f7941d", "#7cc4a4", "#bfe6ff", "#ff8fa3"];

function StoreButton({ href, top, label, icon }: { href: string; top: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 rounded-xl bg-abyss px-4 py-2.5 text-white ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-black"
    >
      {icon}
      <span className="leading-tight">
        <span className="block text-[10px] text-white/70">{top}</span>
        <span className="block text-sm font-semibold">{label}</span>
      </span>
    </a>
  );
}

// One episode in the phone's "Related Videos" / season rows; tapping it plays it in the phone.
function EpisodeTile({ episode, active, onPlay, stacked }: { episode: EducareEpisode; active: boolean; onPlay: () => void; stacked?: boolean }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-pressed={active}
      aria-label={`Play ${episode.title} in the phone`}
      className={`w-[92px] shrink-0 px-1 pb-1.5 pt-1 text-left transition ${active ? "bg-[#e9ecee]" : "hover:bg-[#f3f5f6]"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumb(episode.id, "mq")} alt="" loading="lazy" className="aspect-video w-full rounded-md object-cover" />
      {stacked ? (
        <>
          {episode.ep && <p className="mt-1.5 text-[9px] font-semibold text-black">{episode.ep}</p>}
          <p className={`truncate text-[9px] text-[#333] ${episode.ep ? "mt-0.5" : "mt-1.5"}`}>{episode.title}</p>
          <p className="mt-0.5 text-[8px] text-[#666]">{episode.series}</p>
        </>
      ) : (
        <>
          <p className="mt-1.5 truncate text-[9px] font-semibold text-black">{[episode.ep, episode.title].filter(Boolean).join(" ")}</p>
          <p className="mt-0.5 text-[8px] text-[#666]">{episode.series}</p>
          <p className="mt-0.5 text-[8px] text-[#666]">Nursery Rhymes</p>
        </>
      )}
    </button>
  );
}

// A phone running the Educare Skill player: tap an episode to play it, tap the video for sound.
function Phone() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [playing, setPlaying] = useState(educareNono[1]);

  return (
    <div ref={ref} className="relative mx-auto w-[min(78vw,290px)]">
      <motion.div style={{ rotate, y }} className="relative aspect-[9/19] rounded-[2.6rem] bg-abyss p-2.5 shadow-[0_40px_80px_-20px_rgba(0,17,26,0.7)] ring-1 ring-white/20">
        <div className="absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[2.1rem] bg-[#f3f5f6] text-black">
          <div className="relative flex shrink-0 items-center justify-center px-3 pb-2 pt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/educare/logo-dark.png" alt="Educare Skill" className="h-3.5 w-auto" />
            <span className="absolute bottom-1.5 right-3 flex size-5 items-center justify-center rounded-full bg-white text-navy ring-1 ring-black/15" aria-hidden>
              <svg viewBox="0 0 24 24" className="size-3 fill-current">
                <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.3-8 5.2V21h16v-1.8c0-2.9-3.6-5.2-8-5.2z" />
              </svg>
            </span>
          </div>

          <div className="min-h-0 flex-1 space-y-2 overflow-hidden px-2.5">
            <div className="overflow-hidden rounded-lg bg-white">
              <button type="button" onClick={() => playVideo(playing.id)} className="group relative block w-full" aria-label={`Watch ${playing.title} with sound`}>
                <VideoLoop id={playing.id} start={playing.start} className="aspect-video w-full" />
                <span className="absolute bottom-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/55 text-white transition group-hover:bg-orange" aria-hidden>
                  <svg viewBox="0 0 24 24" className="ml-px size-3 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
              <div className="flex items-start justify-between gap-2 px-2.5 pb-2 pt-1.5">
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold">{[playing.ep, playing.title].filter(Boolean).join(" ")}</p>
                  <p className="mt-0.5 text-[9px] text-[#555]">{playing.series}</p>
                  <p className="text-[9px] text-[#555]">Nursery Rhymes</p>
                </div>
                <span className="mt-0.5 flex shrink-0 gap-2.5" aria-hidden>
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-black">
                    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                  </svg>
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-black">
                    <path d="M12 21s-8.5-5.2-8.5-11.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8.5 2.8C20.5 15.8 12 21 12 21z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white pt-2">
              <p className="px-2.5 pb-1 text-[12px] font-semibold">Related Videos</p>
              <div className="no-scrollbar flex gap-1 overflow-x-auto px-1.5">
                {educareNono.map((e) => (
                  <EpisodeTile key={e.id} episode={e} active={e.id === playing.id} onPlay={() => setPlaying(e)} stacked />
                ))}
              </div>
            </div>

            <div>
              <p className="pb-0.5 text-[10px] font-semibold">Daza: Season 1</p>
              <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto">
                {educareDaza.map((e) => (
                  <EpisodeTile key={e.id} episode={e} active={e.id === playing.id} onPlay={() => setPlaying(e)} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-around border-t border-black/10 bg-[#f3f5f6] pb-2.5 pt-1.5 text-navy" aria-hidden>
            {[
              ["Home", "M3 11.5 12 4l9 7.5M5.5 9.5V20h4.5v-5.5h4V20h4.5V9.5"],
              ["Favourite", "M12 20s-8-4.9-8-10.5A4.5 4.5 0 0 1 12 6.8a4.5 4.5 0 0 1 8 2.7C20 15.1 12 20 12 20z"],
              ["Playlist", "M4 6h11M4 11h11M4 16h6m6 2.5a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm0 0V6l4-1"],
            ].map(([label, d]) => (
              <span key={label} className="flex flex-col items-center gap-0.5">
                <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d} />
                </svg>
                <span className="text-[8px] font-medium text-black">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Educare() {
  return (
    <section id="educare" className="relative overflow-hidden bg-gradient-to-b from-sky via-sea to-deep pt-20 text-white sm:pt-28">
      {/* Educare Skill's own character crowd, fading into the section */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/educare/crowd-2.webp" alt="" loading="lazy" className="pointer-events-none absolute inset-x-0 top-0 h-[70%] w-full object-cover object-bottom opacity-25 mix-blend-luminosity" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky/70 via-sea/80 to-deep" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow no="03">Our learning platform</Eyebrow>
            { }
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="/img/educare/logo.png"
              alt="Educare Skill"
              className="mb-6 h-9 w-auto sm:h-12"
            />
            <h2 className={h2Class}>
              <SplitText text="Transforming learning" className="block" />
              <SplitText text="in Bhutan and beyond." className="block text-sun" delay={0.1} />
            </h2>
            <Reveal i={1} className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-white/85 sm:text-lg">
              <p>
                Educare Skill is Bhutan&apos;s pioneering online learning platform, launched on 21 February 2024 on the Birth Anniversary of
                His Majesty The King. Every animated lesson, rhyme and story on it is made by the iBEST team.
              </p>
            </Reveal>
            <Reveal i={2} className="mt-6 flex max-w-xl items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-sun text-navy">★</span>
              <p className="text-sm leading-relaxed text-white/90">
                Officially endorsed as the <strong>&ldquo;National Online Dzongkha Learning Platform&rdquo;</strong> by the Department of
                Culture and Dzongkha Development. All content is reviewed by Dzongkha experts and aligned with the national curriculum.
              </p>
            </Reveal>
            <Reveal i={3} className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["1,000+", "Episodes"],
                ["22K+", "YouTube subscribers"],
                ["Web + App", "iOS & Android"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10 sm:p-4">
                  <p className="font-display text-xl font-extrabold sm:text-3xl">{v}</p>
                  <p className="text-[11px] text-white/70 sm:text-xs">{l}</p>
                </div>
              ))}
            </Reveal>
            <Reveal i={4} className="mt-8 flex flex-wrap gap-3">
              <StoreButton
                href={educare.appStore}
                top="Download on the"
                label="App Store"
                icon={
                  <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
                    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4 1-1.4 1.3-2.7 1.4-2.8-.1 0-2.6-1-2.6-4.2zM13.9 4.9c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.9-1.4z" />
                  </svg>
                }
              />
              <StoreButton
                href={educare.playStore}
                top="Get it on"
                label="Google Play"
                icon={
                  <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                    <path fill="#34a853" d="M3.6 2.2 13.5 12l-9.9 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1z" />
                    <path fill="#fbbc04" d="m16.8 15.3-3.3-3.3 3.3-3.3 3.8 2.2c1 .6 1 1.6 0 2.2l-3.8 2.2z" />
                    <path fill="#ea4335" d="M16.8 15.3 13.5 12l-9.9 9.8c.4.2.9.2 1.4-.1l11.8-6.4z" />
                    <path fill="#4285f4" d="M16.8 8.7 5 2.3c-.5-.3-1-.3-1.4-.1L13.5 12l3.3-3.3z" />
                  </svg>
                }
              />
              <a
                href={educare.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Visit educareskill.com ↗
              </a>
            </Reveal>
          </div>
          <Phone />
        </div>
      </Container>

      {/* animation monitor wall: every tile is a live, muted preview */}
      <div className="relative mt-20 sm:mt-28">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">Made in our animation studio</p>
              <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-extrabold tracking-tight">Animated series & rhymes</h3>
            </div>
            <a href={educare.youtube} target="_blank" rel="noreferrer" className="shrink-0 text-sm font-semibold text-sun hover:underline">
              YouTube ↗
            </a>
          </div>
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {educareSeries.slice(0, 5).map((s, i) => (
              <motion.button
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: (i % 4) * 0.06 }}
                onClick={() => playVideo(s.video)}
                className={`group relative w-[84vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-abyss text-left ring-4 ring-white/10 transition hover:-translate-y-1 hover:ring-sun sm:w-auto ${
                  i === 0 ? "aspect-video sm:col-span-2 lg:row-span-2 lg:aspect-auto" : "aspect-video"
                }`}
                aria-label={`Watch ${s.name}`}
              >
                <VideoLoop id={s.video} start={s.start} className="absolute inset-0 transition duration-700 group-hover:scale-105" label={s.name} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-transparent" />
                <span
                  className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-navy"
                  style={{ background: TILE_COLORS[i % TILE_COLORS.length] }}
                >
                  Ep · {s.kind}
                </span>
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <p className={`line-clamp-2 font-display font-bold leading-tight ${i === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}>{s.name}</p>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-lg transition group-hover:scale-110 group-hover:bg-sun">
                    <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-current">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </Container>
      </div>

      <div className="relative pb-20 pt-12 sm:pb-28">
        <Container className="flex flex-col gap-2 pt-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Educare support: Toll free {educare.support.tollFree} · {educare.support.phone} ·{" "}
            <a className="underline" href={`mailto:${educare.support.email}`}>
              {educare.support.email}
            </a>
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest">
            Developed By{" "}
            <a href="https://ibesttechnologies.bt" target="_blank" rel="noopener noreferrer" className="underline hover:text-sun">
              iBEST TECHNOLOGIES
            </a>
          </p>
        </Container>
      </div>
    </section>
  );
}
