"use server";

import { auth } from "@/lib/auth";

/**
 * Ensures the default administrator user (admin@gmail.com / admin@1234)
 * exists in Better Auth database.
 */
export async function ensureDefaultAdmin(): Promise<{ success: boolean; message: string }> {
  try {
    await auth.api.signUpEmail({
      body: {
        email: "admin@gmail.com",
        password: "admin@1234",
        name: "ORÉVA Admin",
      },
    });
    return { success: true, message: "Default administrator account created." };
  } catch (err: unknown) {
    // If already exists, Better Auth will throw an error (e.g. USER_ALREADY_EXISTS)
    return { success: true, message: "Administrator account already exists." };
  }
}
