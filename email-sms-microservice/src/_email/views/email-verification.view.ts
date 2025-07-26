export const emailVerificationTemplate = (
  code: string,
  userName?: string,
): string => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .container { background: #f9f9f9; padding: 30px; border-radius: 10px; }
          .header { text-align: center; margin-bottom: 30px; }
          .code-box { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #28a745;">Verify Your Email</h1>
          </div>
          
          <p>Hello${userName ? ` ${userName}` : ''},</p>
          
          <p>Thank you for signing up! Please use the verification code below to verify your email address:</p>
          
          <div class="code-box">
            <div class="code">${code}</div>
          </div>
          
          <p>This code will expire in 10 minutes for security purposes.</p>
          
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
