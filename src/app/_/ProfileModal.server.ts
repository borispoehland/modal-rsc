"use server";

import { cookies } from "next/headers";
import type { IProfileSchema } from "./ProfileModal.schema";
import { profileSchema } from "./ProfileModal.schema";
import { IServerActionReturn } from "@/types/form";

export async function saveProfile(
  values: IProfileSchema
): Promise<IServerActionReturn> {
  const parseResult = profileSchema.safeParse(values);

  if (!parseResult.success) {
    return { status: "error", error: "Unexpected input" } as const;
  }

  cookies().set("profile", JSON.stringify(values));

  return {
    status: "success",
    message: "Profile updated successfully",
  } as const;
}

export async function clearProfile(): Promise<IServerActionReturn> {
  cookies().delete("profile");

  return { status: "success", message: "Profile cleared" } as const;
}

export async function getProfile(): Promise<Partial<IProfileSchema>> {
  const profile = cookies().get("profile")?.value || JSON.stringify({});

  return JSON.parse(profile);
}
