import { transporter } from '@/lib/email'
import { BASE_URL } from '@/lib/constants/globals'

interface Props {
  email: string
  token: string
}

export async function sendConfirmationEmail({ email, token }: Props) {
  const confirmationLink = `${BASE_URL}/confirm-account?token=${token}`

  const response = await transporter.sendMail({
    from: `Linktree Clone <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Confirm your account of Linktree Clone',
    html: html({ url: confirmationLink }),
    text: text({ url: confirmationLink })
  })

  console.log('CONFIRMATION_EMAIL: ', response)
}

function html({ url }: { url: string }) {
  return `
<body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:#ffffff;max-width:500px;margin:0 auto;padding:20px 0 48px">
    <tbody>
      <tr style="width:100%">
        <td>
          <img src="https://res.cloudinary.com/dsvcixsbp/image/upload/v1713570951/linktree/0652676732656afae1fe202496139c74.png" style="display:block;outline:none;border:none;text-decoration:none;width:158px;height:32px;margin-top:34px;" width="158" height="32" alt="Linktree Clone" />
          <h2 style="font-size:20px;line-height:1.2;font-weight:600;color:#121212;margin:34px 0 0 0;">We're almost done!</h2>
          <p style="font-size:16px;line-height:1.2;font-weight:400;color:#121212;margin:6px 0 28px 0;">Please confirm your account with the button below.</p>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-bottom:24px">
            <tbody>
              <tr>
                <td>
                  <a href="${url}" style="background-color:#121212;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;padding:11px 23px 11px 23px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:8.25px">Confirm account</span><span><!--[if mso]><i style="mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
                </td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:14px;line-height:1.2;font-weight:400;color:#121212;margin:4px 0 10px 0;">This link is valid for 1 hour. If you need another one, simply try to login. If the button does not work, copy and paste the link below directly into your browser:</p>
          <code style="display:block;font-family:monospace;word-break:break-all;padding:8px 10px;background-color:#e3e3e3;font-size:12px;border-radius:4px;color:#121212 !important;text-decoraction:none !important">${url}</code>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e3e3e3;margin:34px 0 14px" /><a href="${BASE_URL}" style="color:#c3c3c3;text-decoration:none;font-size:14px" target="_blank">Linktree Clone</a>
        </td>
      </tr>
    </tbody>
  </table>
</body>
`
}

function text({ url }: { url: string }) {
  return `Confirm account of Linktree Clone\n${url}\n\n`
}
