"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { getErrorMessage } from "@/lib/utils";
const supabase = createClient();
export async function login(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.log(error);
      // redirect("/error");
      return { errorMessage: null };
    }

    //revalidatePath("/dashboard", "layout");
    //redirect("/dashboard");
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function signup(formData: FormData) {
  try {
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      console.log(error);
      // redirect("/error");
      return { errorMessage: null };
    }

    // revalidatePath("/emailconfirmation", "layout");
    //  redirect("/emailconfirmation");
    //return true
  } catch (error) {
    return getErrorMessage(error);
  }
}
