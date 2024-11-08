import { supabase } from "../config/supabase";
import { Config } from "../types/types";
import { defaultConfig } from "../config/default";

export class ConfigModel {
  static async getLatest(): Promise<Config> {
    const { data, error } = await supabase
      .from("onboarding_configs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return defaultConfig;

    return {
      page2Components: data.page2_components,
      page3Components: data.page3_components
    };
  }

  static async create(config: Config) {
    const { error } = await supabase.from("onboarding_configs").insert([
      {
        page2_components: config.page2Components,
        page3_components: config.page3Components
      }
    ]);

    if (error) throw error;
    return config;
  }
}
