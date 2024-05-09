import { useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormSubmit } from "@/components/FormSubmit";
import { useControlledModal } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { IProfileSchema } from "./ProfileModal.schema";
import { profileSchema } from "./ProfileModal.schema";
import { clearProfile, saveProfile } from "./ProfileModal.server";
import { actionWithToast, noop } from "@/lib/form";

export default function ProfileModalContent({
  profile,
}: {
  profile: Partial<IProfileSchema>;
}) {
  const form = useForm<IProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const { setIsOpen } = useControlledModal();

  const toastSaveProfile = useCallback(
    async (values: IProfileSchema) => {
      try {
        await actionWithToast({
          action: saveProfile(values),
          loadingLabel: "Updating profile...",
        });
        setIsOpen(false);
      } catch (e) {
        console.error(e);
      }
    },
    [setIsOpen]
  );

  const toastClearProfile = useCallback(async () => {
    try {
      await actionWithToast({
        action: clearProfile(),
        loadingLabel: "Clearing profile...",
      });
      form.reset({ name: "", description: "" } satisfies IProfileSchema);
    } catch (e) {
      console.error(e);
    }
  }, [form]);

  return (
    <Form {...form}>
      <form
        action={() => form.handleSubmit(toastSaveProfile)()}
        className="space-y-8 max-w-lg w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input
                  {...field}
                  placeholder={profile.name || "Luke Skywalker"}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={
                    profile.description ||
                    "A brave jedi saving the whole galaxy"
                  }
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          {profile.name && profile.description && (
            <FormSubmit formAction={toastClearProfile} variant="destructive">
              Clear profile
            </FormSubmit>
          )}
          <FormSubmit>Update profile</FormSubmit>
        </div>
      </form>
    </Form>
  );
}
