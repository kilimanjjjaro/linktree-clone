"use server"

import { ResetPasswordSchema } from "@/lib/schemas/auth"
import { getUserByEmail } from "@/lib/services/get-user-by-email"
import { generatePasswordResetToken } from "@/lib/utils/generate-password-reset-token"
import { sendPasswordResetEmail } from "@/lib/services/send-password-reset-email"

export async function resetPassword(prevState: unknown, formData: FormData) {
  const validatedFields = ResetPasswordSchema.safeParse({
    email: formData.get("email")
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid email.",
      success: ""
    }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser?.email === undefined) {
    return {
      error: "User not found.",
      success: ""
    }
  }

  try {
    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail({
      email: passwordResetToken.email,
      token: passwordResetToken.token
    })

    return { success: "Reset password email sent.", error: "" }
  } catch (error) {
    console.error(
      "ACTION_ERROR: ",
      error instanceof Error ? error.message : error
    )

    return {
      error: "Something went wrong.",
      success: ""
    }
  }
}
