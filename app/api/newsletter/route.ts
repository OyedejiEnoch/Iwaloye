// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json(
            { error: "Email is required" },
            { status: 400 }
        );
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const SERVER = process.env.MAILCHIMP_SERVER;

    try {
        const response = await fetch(
            `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
            {
                method: "POST",
                headers: {
                    Authorization: `apikey ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email_address: email,
                    status: "subscribed", // or "pending" if you want double opt-in
                }),
            }
        );

        const data = await response.json();

        // Already subscribed
        if (data.title === "Member Exists") {
            return NextResponse.json(
                { error: "This email is already subscribed." },
                { status: 400 }
            );
        }

        if (!response.ok) {
            return NextResponse.json(
                { error: data.detail || "Subscription failed." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Successfully subscribed!" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}