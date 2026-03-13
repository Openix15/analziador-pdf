/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_GEMINI_API_KEY?: string;
  readonly VITE_BACKUP_GEMINI_API_KEY_1?: string;
  readonly VITE_BACKUP_GEMINI_API_KEY_2?: string;
  readonly VITE_DEFAULT_GEMINI_MODEL?: string;
}
