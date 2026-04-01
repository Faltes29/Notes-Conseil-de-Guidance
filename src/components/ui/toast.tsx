"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

// Re-export all toast primitives
export { ToastPrimitives };

// Export the main toast components
export const Toast = ToastPrimitives.Toaster;
export const ToastTitle = ToastPrimitives.ToastTitle;
export const ToastDescription = ToastPrimitives.ToastDescription;
export const ToastAction = ToastPrimitives.ToastAction;
export const ToastClose = ToastPrimitives.ToastClose;
export const ToastViewport = ToastPrimitives.ToastViewport;
export const ToastProvider = ToastPrimitives.ToastProvider;

// Optional: Keep the Sonner toast utility functions if needed elsewhere
// These are from your existing utils/toast.ts file
import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};