import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}
export function formatPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "SAR",
  });
}
export function getNameBeforeAt(email) {
  if (typeof email !== "string") return null; // Validate input
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return null; // Return null if '@' is not found
  return email.substring(0, atIndex);
}
