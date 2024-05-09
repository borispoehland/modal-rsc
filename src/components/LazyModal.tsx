"use client";

import type { PropsWithRef } from "react";
import { Suspense, type FC, type LazyExoticComponent, useRef } from "react";
import { useControlledModal } from "./Modal";
import { ModalSkeleton } from "./ModalSkeleton";

export function LazyModal<P>({
  Component,
  props,
}: {
  Component: LazyExoticComponent<FC<P>>;
  props: JSX.IntrinsicAttributes & PropsWithRef<P>;
}) {
  const { isOpen } = useControlledModal();

  const wasOpen = useRef(false);

  if (!isOpen && !wasOpen) {
    return <ModalSkeleton />;
  }

  wasOpen.current = true;

  return (
    <Suspense fallback={<ModalSkeleton />}>
      <Component {...props} />
    </Suspense>
  );
}
