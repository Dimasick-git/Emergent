import { Module } from '@nestjs/common';
import { MessagingGateway } from './messaging.gateway';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [MessagesModule],
  providers: [MessagingGateway],
})
export class GatewayModule {}
