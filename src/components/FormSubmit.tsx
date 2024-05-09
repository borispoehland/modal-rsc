"use client";

import type { ComponentProps } from "react";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function FormSubmit({
  disabled,
  ...props
}: ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return <Button type="submit" disabled={disabled || pending} {...props} />;
}
