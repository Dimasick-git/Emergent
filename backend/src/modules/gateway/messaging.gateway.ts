import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({
  namespace: '/ws',
  cors: {
    origin: '*',
  },
})
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userConnections: Map<string, string> = new Map();

  constructor(private messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    const token = client.handshake.query.token;
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.userConnections.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('channel:subscribe')
  handleChannelSubscribe(client: Socket, data: { channelId: string }) {
    client.join(`channel:${data.channelId}`);
    this.server.to(`channel:${data.channelId}`).emit('user:online', {
      userId: client.id,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('message:create')
  async handleMessageCreate(
    client: Socket,
    data: { channelId: string; userId: string; content: string },
  ) {
    const message = await this.messagesService.createMessage(
      data.channelId,
      data.userId,
      data.content,
      'text',
    );

    this.server.to(`channel:${data.channelId}`).emit('message:created', {
      message,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, data: { channelId: string; userId: string }) {
    this.server.to(`channel:${data.channelId}`).emit('user:typing', {
      userId: data.userId,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('reaction:add')
  handleReactionAdd(
    client: Socket,
    data: { messageId: string; userId: string; emoji: string },
  ) {
    this.server.emit('message:reacted', {
      messageId: data.messageId,
      userId: data.userId,
      emoji: data.emoji,
    });
  }
}
