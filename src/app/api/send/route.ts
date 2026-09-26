import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import EmailTemplate from "@/components/email/email-confirmation-template";

// This route must never be evaluated at build time: the Resend client needs an API key
// that only exists at runtime.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Created lazily so a missing key at build time (Vercel's "Collecting page data" step)
// doesn't throw while the module is imported.
let resendClient: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

// Where contact-form requests are delivered. Both can be overridden with env vars.
// "onboarding@resend.dev" is Resend's shared sender: it only delivers to the email that owns
// the Resend account. Once a domain is verified in Resend, set CONTACT_FROM_EMAIL to use it.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Nexus Labs <onboarding@resend.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "nexus.labs22@gmail.com";

export async function POST(req: NextRequest) {
  const resend = getResend();

  if (!resend) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const formData = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: typeof formData?.email === "string" ? formData.email : undefined,
      subject: "Nueva solicitud de proyecto - Nexus Labs",
      text: JSON.stringify(formData, null, 2),
      react: React.createElement(EmailTemplate, { formData }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
