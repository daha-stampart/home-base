export const STORAGE_KEY = "mobilAppraisal";

export function saveAppraisal(data: unknown) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadAppraisal() {

  if (typeof window === "undefined") {
    return null;
  }

  const data = sessionStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data);
}

export function clearAppraisal() {
  sessionStorage.removeItem(STORAGE_KEY);
}