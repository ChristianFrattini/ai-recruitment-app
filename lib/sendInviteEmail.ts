// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export async function sendInviteEmail({
  to,
  link,
}: {
  to: string;
  link: string;
}) {
  console.log(link);
  return await resend.emails.send({
    from: "Recruiting App <onboarding@resend.dev>",
    to: to,
    subject: "You’re invited to join our organization!",
    html: `
      <h2>You’ve been invited!</h2>
      <p>Click the link below to join:</p>
      <a href="${link}">${link}</a>
    `,
  });
}
