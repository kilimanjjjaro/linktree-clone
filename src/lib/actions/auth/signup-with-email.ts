"use server"

import bcrypt from "bcryptjs"
import { SignUpSchema } from "@/lib/schemas/auth"
import db from "@/lib/database"
import { generateConfirmationToken } from "@/lib/utils/generate-confirmation-token"
import { sendConfirmationEmail } from "@/lib/services/send-confirmation-email"

export async function signUpWithEmail(prevState: unknown, formData: FormData) {
  const fields = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? ""
  }

  const validatedFields = SignUpSchema.safeParse({
    ...fields,
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password")
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

  const { name, email, password, confirmPassword } = validatedFields.data

  if (password !== confirmPassword) {
    return {
      error: "Passwords must be equal.",
      success: "",
      fields
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser != null) {
      return {
        error: "Email already used.",
        success: "",
        fields
      }
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const confirmationToken = await generateConfirmationToken(email)

    await sendConfirmationEmail({
      email: confirmationToken.email,
      token: confirmationToken.token
    })

    return {
      success: "Link confirmation was sent.",
      error: ""
    }
  } catch (error) {
    console.error(
      "ACTION_ERROR: ",
      error instanceof Error ? error.message : error
    )

    return {
      error: "Something went wrong.",
      success: "",
      fields
    }
  }
}
