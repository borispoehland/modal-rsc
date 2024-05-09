import { IServerActionReturn } from "@/types/form";

export function noop() {
  // do nothing
}

export async function actionWithToast<I>({
  action,
  loadingLabel,
}: {
  action: Promise<IServerActionReturn>;
  loadingLabel: string;
}) {
  const { toast } = await import("sonner");
  const id = toast.loading(loadingLabel);
  return action.then((result) => {
    if (result.status === "success") {
      toast.success(result.message, { id });
    } else {
      toast.error(result.error, { id });
      throw result.error;
    }
  });
}
