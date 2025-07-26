export const accountConfirmationTemplate = (userName: string): string => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Confirmed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .container { background: #f9f9f9; padding: 30px; border-radius: 10px; }
          .success-box { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #28a745; text-align: center;">✅ Account Confirmed!</h1>
          
          <div class="success-box">
            <h2>Congratulations ${userName}!</h2>
            <p>Your account has been successfully verified and activated.</p>
          </div>
          
          <p>You can now enjoy full access to all our features and services. Thank you for completing the verification process!</p>
          
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
