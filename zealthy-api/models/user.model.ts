import { supabase } from "../config/supabase";
import { UserData } from "../types/types";

export class UserModel {
  static async create(userData: UserData) {
    const { data, error } = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(email: string, updateData: Partial<UserData>) {
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("email", email)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async findByEmail(email: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;
    return data;
  }

  static async findAll() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
}
