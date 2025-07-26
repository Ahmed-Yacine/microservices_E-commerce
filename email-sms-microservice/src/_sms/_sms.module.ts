import { Module } from '@nestjs/common';
import { SmsService } from './_sms.service';

@Module({
  providers: [SmsService],
})
export class SmsModule {}
