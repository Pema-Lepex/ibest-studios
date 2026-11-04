import { contact, educare, site } from "@/data/site";
import { Container, Reveal } from "./motion";

function Row({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sun/15 text-sun" aria-hidden>
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-bold text-cream">{title}</h3>
        <div className="mt-1 space-y-0.5 leading-relaxed text-cream/75">{children}</div>
      </div>
    </div>
  );
}

// Contact card beside the office photo, with the map underneath.
export default function ContactDetails() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy to-abyss pb-20 pt-4 sm:pb-28">
      <Container className="relative space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-white/5 p-6 ring-1 ring-orange/60 backdrop-blur sm:p-10">
            <h2 className="mb-8 font-display text-2xl font-extrabold tracking-tight text-orange sm:text-3xl">Get In Touch</h2>
            <div className="space-y-7">
              <Row icon="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" title="Visit Our Office">
                {contact.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </Row>
              <Row
                icon="M6.5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"
                title="Call Us"
              >
                <p>
                  Educare Skill toll free:{" "}
                  <a href={`tel:${educare.support.tollFree}`} className="font-semibold text-cream transition hover:text-sun">
                    {educare.support.tollFree}
                  </a>
                </p>
                <p>
                  Mobile number:{" "}
                  <a href={`tel:+975${educare.support.phone}`} className="whitespace-nowrap font-semibold text-cream transition hover:text-sun">
                    +975 {educare.support.phone}
                  </a>
                </p>
              </Row>
              <Row icon="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm-.5 1 8.5 6.5L20.5 7" title="Email Us">
                <p>
                  <a href={`mailto:${site.email}`} className="break-all transition hover:text-sun">
                    {site.email}
                  </a>
                </p>
                <p className="text-cream/50">We&apos;ll respond as soon as possible.</p>
              </Row>
              <Row icon="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-13.5V12l3 2" title="Office Hours">
                {contact.hours.map(([days, time]) => (
                  <p key={days}>
                    {days}: {time}
                  </p>
                ))}
              </Row>
            </div>
          </Reveal>

          <Reveal i={1} className="relative min-h-72 overflow-hidden rounded-3xl ring-1 ring-white/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/studio/office.webp" alt="The iBEST building in Changzamtog, Thimphu" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </Reveal>
        </div>

        <Reveal className="overflow-hidden rounded-3xl bg-deep ring-1 ring-white/15">
          <iframe
            src={contact.mapEmbed}
            title="Map showing the iBEST office in Changzamtog, Thimphu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-80 w-full border-0 sm:h-[28rem]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
