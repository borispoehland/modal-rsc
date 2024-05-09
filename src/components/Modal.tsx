"use client";

import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useBreakpoint } from "@/hooks/useMediaQuery";

type IModalProps = ComponentProps<typeof Drawer>;

const ControlledModalContext = createContext<{
  isOpen: Exclude<IModalProps["open"], undefined>;
  setIsOpen: Exclude<IModalProps["onOpenChange"], undefined>;
} | null>(null);

export function useControlledModal() {
  const context = useContext(ControlledModalContext);

  if (!context) {
    throw new Error(
      `${arguments.callee.name} should be used within ${ControlledModalContext.displayName}`
    );
  }

  return context;
}

export function Modal({
  Trigger,
  children,
  title,
  description,
  open,
  onOpenChange,
  ...props
}: IModalProps & {
  title: string;
  description?: string;
  Trigger: ReactNode;
}) {
  const isDesktop = useBreakpoint("sm");

  const [fallbackOpen, fallbackOnOpenChange] = useState(false);

  const isControlled = open !== undefined && onOpenChange !== undefined;

  const isOpen = isControlled ? open : fallbackOpen;
  const setIsOpen = isControlled ? onOpenChange : fallbackOnOpenChange;

  if (isDesktop) {
    return (
      <ControlledModalContext.Provider value={{ isOpen, setIsOpen }}>
        <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
          <DialogTrigger asChild>{Trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      </ControlledModalContext.Provider>
    );
  }

  return (
    <ControlledModalContext.Provider value={{ isOpen, setIsOpen }}>
      <Drawer open={isOpen} onOpenChange={setIsOpen} {...props}>
        <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pt-0">{children}</div>
        </DrawerContent>
      </Drawer>
    </ControlledModalContext.Provider>
  );
}
