"use client";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "./(modules)/home/page";

export default function Home() {
  // The hero is full-bleed, so the navbar floats over it rather than sitting
  // on a padded main.
  return (
    <MainLayout transparentHeader>
      <HomePage />
    </MainLayout>
  );
}
