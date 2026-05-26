import { transporter } from "@/lib/email"
import { BASE_URL } from "@/lib/constants/globals"
import { createEmailTemplate } from "@/lib/utils/create-email-template"

interface Props {
  email: string
  token: string
}

export async function sendPasswordResetEmail({ email, token }: Props) {
  const resetPasswordLink = `${BASE_URL}/new-password?token=${token}`

  const { html, text } = createEmailTemplate({
    heading: "We're almost done!",
    intro: "Please click at the button below to reset your password.",
    buttonLabel: "Reset password",
    note: "This link is valid for 1 hour. If you need another one, simply resend the form. If the button does not work, copy and paste the link below directly into your browser:",
    textTitle: "Reset your password of Linktree Clone",
    url: resetPasswordLink
  })

  await transporter.sendMail({
    from: `Linktree Clone <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Reset your password of Linktree Clone",
    html,
    text
  })
}
