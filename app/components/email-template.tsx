import type * as React from "react"

interface EmailTemplateProps {
  email: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ email }) => (
  <div>
    <h1>Welcome to the AICarz Waitlist!</h1>
    <p>
      Thank you for joining our waitlist. We've received your email address ({email}) and will keep you updated on our
      progress.
    </p>
    <p>We're working hard to create the best AI-powered car selection tool and can't wait to share it with you!</p>
    <p>Best regards,</p>
    <p>The AICarz Team</p>
  </div>
)

