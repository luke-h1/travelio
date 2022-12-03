declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_URL: string;
      CLOUDINARY_SECRET: string;
      NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
    }
  }
}

export {};
