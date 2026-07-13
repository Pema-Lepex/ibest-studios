"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui";

export default function PageNotFound() {
  return (
    <MainLayout transparentHeader>
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink-950 px-5 text-center grain">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]"
        />

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display text-gradient-gold relative text-[clamp(6rem,22vw,16rem)] leading-none"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="display relative mt-4 text-2xl text-cream sm:text-3xl"
        >
          This scene didn&apos;t make the final cut.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="relative mt-5 max-w-md text-base text-mist"
        >
          The page you&apos;re looking for was moved, renamed, or never existed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.44 }}
          className="relative mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            href="/"
            size="lg"
            magnetic
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to home
          </Button>
          <Button href="/experience" variant="outline" size="lg">
            See our work
          </Button>
        </motion.div>
      </section>
    </MainLayout>
  );
}
