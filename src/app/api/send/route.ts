import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import EmailTemplate from "@/components/email/email-confirmation-template";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where contact-form requests are delivered. Both can be overridden with env vars.
// "onboarding@resend.dev" is Resend's shared sender: it only delivers to the email that owns
// the Resend account. Once a domain is verified in Resend, set CONTACT_FROM_EMAIL to use it.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Nexus Labs <onboarding@resend.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "nexus.labs22@gmail.com";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  console.log("json request:", formData);

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: typeof formData?.email === "string" ? formData.email : undefined,
      subject: "Nueva solicitud de proyecto - Nexus Labs",
      text: JSON.stringify(formData, null, 2),
      react: React.createElement(EmailTemplate, { formData }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
