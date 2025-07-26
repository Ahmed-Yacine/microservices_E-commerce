import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './_email/_email.module';
import { SmsModule } from './_sms/_sms.module';

@Module({
  imports: [AuthModule, EmailModule, SmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
