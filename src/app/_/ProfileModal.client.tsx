"use client";

import { lazy } from "react";

import { LazyModal } from "@/components/LazyModal";
import { IProfileSchema } from "./ProfileModal.schema";

const Component = lazy(() => import("./ProfileModal.content"));

export function ProfileModalClient({
  profile,
}: {
  profile: Partial<IProfileSchema>;
}) {
  return <LazyModal Component={Component} props={{ profile }} />;
}
