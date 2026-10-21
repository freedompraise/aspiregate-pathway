/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  readonly VITE_SANITY_API_VERSION?: string;
  readonly VITE_PAYSTACK_PUBLIC_KEY?: string;
  readonly VITE_FORMSPREE_CONSULT?: string;
  readonly VITE_FORMSPREE_CONTACT?: string;
  readonly VITE_FORMSPREE_TEST?: string;
  readonly VITE_EXCHANGE_RATE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
