interface Props {
  apiKey: string | undefined
  from: string
  to: string
  url: string
}

export async function sendResendRequest(params: Props) {
  const { apiKey, from, to, url } = params

  if (apiKey === undefined) return

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject: 'Log in to Linktree Clone',
      html: html({ url }),
      text: text({ url })
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Resend error: ' + JSON.stringify(data))
  }
}

function html({ url }: { url: string }) {
  return `
<body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:#ffffff;max-width:560px;margin:0 auto;padding:20px 0 48px">
    <tbody>
      <tr style="width:100%">
        <td><img src="https://res.cloudinary.com/dsvcixsbp/image/upload/v1713570951/linktree/0652676732656afae1fe202496139c74.png" style="display:block;outline:none;border:none;text-decoration:none;width:158px;height:32px" width="158" height="32" alt="Linktree Clone" />
          <h1 style="font-size:20px;line-height:1.3;font-weight:400;color:#0d0d0d;margin:34px 0 20px 0;">Your magic link is here!</h1>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-bottom:24px">
            <tbody>
              <tr>
                <td><a href="${url}" style="background-color:#0d0d0d;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;padding:11px 23px 11px 23px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:8.25px">Log in</span><span><!--[if mso]><i style="mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:15px;line-height:1.2;margin:0 0 15px;color:#0d0d0d">This link is valid for 24 hours. If you need another one, simply resubmit the form. If the button does not work, copy and paste the link below directly into your browser:</p><code style="display:block;font-family:monospace;word-break:break-all;padding:8px 10px;background-color:#e3e3e3;font-size:12px;border-radius:4px;color:#0d0d0d !important;text-decoraction:none !important">${url}</code>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e3e3e3;margin:34px 0 14px" /><a href="https://linktree-clone.vercel.app" style="color:#c3c3c3;text-decoration:none;font-size:14px" target="_blank">Linktree Clone</a>
        </td>
      </tr>
    </tbody>
  </table>
</body>
`
}

function text({ url }: { url: string }) {
  return `Sign in to Linktree Clone\n${url}\n\n`
}
