"use server"

import { z } from "zod"
import { appendToSheet, getWaitlistCount } from "../lib/google-sheets"

const schema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function joinWaitlist(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")

    if (!email || typeof email !== "string") {
      return { success: false, message: "Email is required" }
    }

    const result = schema.safeParse({ email })

    if (!result.success) {
      return { success: false, message: result.error.errors[0].message }
    }

    // Store email in Google Sheet
    await appendToSheet(email)

    const count = await getWaitlistCount()

    return {
      success: true,
      message: "You have been added to the AICarz waitlist!",
      count,
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export { getWaitlistCount }

