declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_URL: string;
      CLOUDINARY_SECRET: string;
      NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
      AUTH_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
    }
  }
}

export {};
