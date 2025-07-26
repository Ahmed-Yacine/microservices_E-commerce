export const welcomeTemplate = (userName: string): string => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .container { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; border-radius: 10px; text-align: center; }
          .welcome-box { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 14px; }
          .btn { display: inline-block; background: #fff; color: #667eea; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎉 Welcome to Our Platform!</h1>
          
          <div class="welcome-box">
            <h2>Hello ${userName}!</h2>
            <p>We're thrilled to have you join our community. Your account has been successfully created and you're all set to get started!</p>
          </div>
          
          <p>Here's what you can do now:</p>
          <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
            <li>Complete your profile</li>
            <li>Explore our features</li>
            <li>Connect with other users</li>
            <li>Get support when you need it</li>
          </ul>
          
          <a href="#" class="btn">Get Started</a>
          
          <div class="footer">
            <p>Need help? Contact our support team anytime.</p>
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
