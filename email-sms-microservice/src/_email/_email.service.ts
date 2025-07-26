import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailOptions } from './interface/email.option';
import {
  passwordResetTemplate,
  emailVerificationTemplate,
  welcomeTemplate,
  accountConfirmationTemplate,
  passwordChangeTemplate,
} from './views';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  // Send verification code for password reset
  async sendPasswordResetCode(
    email: string,
    code: string,
    userName?: string,
  ): Promise<void> {
    const html = passwordResetTemplate(code, userName);

    await this.sendEmail({
      to: email,
      subject: 'Password Reset Verification Code',
      html,
    });
  }

  // Send welcome email
  async sendWelcomeEmail(email: string, userName: string): Promise<void> {
    const html = welcomeTemplate(userName);

    await this.sendEmail({
      to: email,
      subject: 'Welcome to Our Platform!',
      html,
    });
  }

  // Send email verification code
  async sendEmailVerificationCode(
    email: string,
    code: string,
    userName?: string,
  ): Promise<void> {
    const html = emailVerificationTemplate(code, userName);

    await this.sendEmail({
      to: email,
      subject: 'Verify Your Email Address',
      html,
    });
  }

  // Send account confirmation
  async sendAccountConfirmation(
    email: string,
    userName: string,
  ): Promise<void> {
    const html = accountConfirmationTemplate(userName);

    await this.sendEmail({
      to: email,
      subject: 'Account Successfully Created',
      html,
    });
  }

  // Send password change notification
  async sendPasswordChangeNotification(
    email: string,
    userName: string,
  ): Promise<void> {
    const html = passwordChangeTemplate(userName);

    await this.sendEmail({
      to: email,
      subject: 'Password Changed Successfully',
      html,
    });
  }

  // Generic email sender
  private async sendEmail(options: EmailOptions): Promise<void> {
    try {
      console.log('Attempting to send email to:', options.to);
      console.log(
        'Email configuration - USERNAME:',
        process.env.EMAIL_USERNAME,
      );
      console.log(
        'Email configuration - PASSWORD:',
        process.env.EMAIL_PASSWORD ? 'SET' : 'NOT SET',
      );

      await this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      console.log('Email sent successfully to:', options.to);
    } catch (error) {
      console.error('Failed to send email:', error);
      console.error('Error details:', {
        code: error.code,
        command: error.command,
        response: error.response,
      });
      throw new Error('Email sending failed');
    }
  }
}
