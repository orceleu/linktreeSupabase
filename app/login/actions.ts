"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { getErrorMessage } from "@/lib/utils";
import { headers } from "next/headers";
const supabase = createClient();

export async function signInWithGoogle() {
  /*const origin = headers().get("origin");

  //const supabase = createClient(process.env.NEXT_PUBLIC_ SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANNON_KEY);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    console.error(error);
    // Handle error appropriately
    return;
  }
  if (data?.url) {
    return redirect(data.url);
    //console.log(data.url);
  }*/
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) console.error("Error: ", error.message);
}
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
