import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(
    channelId: string,
    userId: string,
    content: string,
    type = 'text',
  ) {
    const message = await this.prisma.message.create({
      data: {
        channelId,
        userId,
        content,
        type,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return message;
  }

  async getChannelMessages(channelId: string, skip = 0, take = 50) {
    return this.prisma.message.findMany({
      where: { channelId, deletedAt: null },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            status: true,
          },
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  async editMessage(messageId: string, content: string) {
    const message = await this.prisma.message.update({
      where: { id: messageId },
      data: {
        content,
        edited: true,
      },
    });

    return message;
  }

  async deleteMessage(messageId: string) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async addReaction(messageId: string, userId: string, emoji: string) {
    try {
      return await this.prisma.messageReaction.create({
        data: {
          messageId,
          userId,
          emoji,
        },
      });
    } catch (e) {
      // If reaction already exists, delete it (toggle)
      await this.prisma.messageReaction.deleteMany({
        where: {
          messageId,
          userId,
          emoji,
        },
      });
      return { removed: true };
    }
  }
}
