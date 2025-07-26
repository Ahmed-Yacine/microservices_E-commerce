export const passwordChangeTemplate = (userName: string): string => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .container { background: #f9f9f9; padding: 30px; border-radius: 10px; }
          .info-box { background: #cce5ff; border: 1px solid #99d6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .security-notice { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #007bff; text-align: center;">🔐 Password Changed Successfully</h1>
          
          <p>Hello ${userName},</p>
          
          <div class="info-box">
            <p><strong>Your password has been successfully changed.</strong></p>
            <p>Date: ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="security-notice">
            <strong>🛡️ Security Notice:</strong>
            <p>If you didn't make this change, please contact our support team immediately and consider the following:</p>
            <ul>
              <li>Change your password again</li>
              <li>Review your account activity</li>
              <li>Enable two-factor authentication</li>
            </ul>
          </div>
          
          <p>For your security, you may need to log in again on all your devices.</p>
          
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>Need help? Contact our support team.</p>
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
