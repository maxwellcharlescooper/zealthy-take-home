export interface UserData {
  email: string;
  password?: string;
  about?: string;
  address?: Partial<{
    street: string;
    city: string;
    state: string;
    zip: string;
  }>;
  birthdate?: string;
  onboarding_step?: number;
}

export interface Config {
  page2Components: ComponentType[];
  page3Components: ComponentType[];
}

export type ComponentType = "about" | "address" | "birthdate";
