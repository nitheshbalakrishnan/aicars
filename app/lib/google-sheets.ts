import { google } from "googleapis"

// Initialize auth - using service account
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const sheets = google.sheets({ version: "v4", auth })

export async function appendToSheet(email: string) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const range = "Sheet1!A:B" // Assuming columns A for timestamp and B for email

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), email]],
      },
    })

    return response.data
  } catch (error) {
    console.error("Error appending to sheet:", error)
    throw error
  }
}

export async function getWaitlistCount() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const range = "Sheet1!B2:B" // Column B, starting from row 2 (excluding header)

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })

    const rows = response.data.values || []
    return rows.length
  } catch (error) {
    console.error("Error getting waitlist count:", error)
    return 0
  }
}

