import { transporter } from "@/lib/email"
import { BASE_URL } from "@/lib/constants/globals"
import { createEmailTemplate } from "@/lib/utils/create-email-template"

interface Props {
  email: string
  token: string
}

export async function sendConfirmationEmail({ email, token }: Props) {
  const confirmationLink = `${BASE_URL}/confirm-account?token=${token}`

  const { html, text } = createEmailTemplate({
    heading: "We're almost done!",
    intro: "Please confirm your account with the button below.",
    buttonLabel: "Confirm account",
    note: "This link is valid for 1 hour. If you need another one, simply try to login. If the button does not work, copy and paste the link below directly into your browser:",
    textTitle: "Confirm account of Linktree Clone",
    url: confirmationLink
  })

  await transporter.sendMail({
    from: `Linktree Clone <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Confirm your account of Linktree Clone",
    html,
    text
  })
}
