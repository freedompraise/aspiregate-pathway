const consult = import.meta.env.VITE_FORMSPREE_CONSULT?.trim() ?? "";
const contact = import.meta.env.VITE_FORMSPREE_CONTACT?.trim() ?? "";
const test = import.meta.env.VITE_FORMSPREE_TEST?.trim() ?? "";

/** Three Formspree inboxes: consult leads, contact messages, and paid test vouchers. */
export const FORMS = {
  consult,
  contact,
  test,
} as const;

export async function submitForm(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<void> {
  if (!endpoint) return;
  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
}
