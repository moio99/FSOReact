/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_URL: string,
  readonly VITE_WEATHER_KEY: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}