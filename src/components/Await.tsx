import type { ReactNode } from "react";

export async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => ReactNode;
}) {
  const data = await promise;

  return <>{children(data)}</>;
}
