"use client";

import MainLayout from "@/layouts/MainLayout";
import MainJob from "./page/MainJob";

const JobPage: React.FC = () => {
  // Opens on a full-bleed banner, so the navbar floats over it.
  return (
    <MainLayout transparentHeader>
      <MainJob />
    </MainLayout>
  );
};

export default JobPage;
