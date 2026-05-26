"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth"
import { LogInSchema } from "@/lib/schemas/auth"
import { generateConfirmationToken } from "@/lib/utils/generate-confirmation-token"
import { getUserByEmail } from "@/lib/services/get-user-by-email"
import { sendConfirmationEmail } from "@/lib/services/send-confirmation-email"

export async function logInWithEmail(prevState: unknown, formData: FormData) {
  const fields = {
    email: (formData.get("email") as string) ?? ""
  }

  const validatedFields = LogInSchema.safeParse({
    ...fields,
    password: formData.get("password")
  })

  if (!validatedFields.success) {
    const firstError =
      validatedFields.error.issues[0]?.message ?? "Invalid fields."

    return {
      error: firstError,
      success: "",
      fields
    }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser?.email === undefined) {
    return {
      error: "User not found.",
      success: "",
      fields
    }
  }

  if (existingUser?.password === null) {
    return {
      error: "Please, use your provider account.",
      success: "",
      fields
    }
  }

  if (existingUser.emailVerified === null) {
    const confirmationToken = await generateConfirmationToken(
      existingUser.email
    )

    await sendConfirmationEmail({
      email: confirmationToken.email,
      token: confirmationToken.token
    })

    return {
      success: "Link confirmation was sent again.",
      error: ""
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/"
    })

    return { success: "Logged in.", error: "" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials.", success: "", fields }
        }
        default: {
          return {
            error: "Something went wrong.",
            success: "",
            fields
          }
        }
      }
    }

    throw error
  }
}
