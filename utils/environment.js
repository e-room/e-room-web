export function isBrowser() {
  if (typeof window === "object") {
    return true;
  }
  return false;
}
