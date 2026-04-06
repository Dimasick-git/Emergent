import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async createChannel(
    workspaceId: string,
    name: string,
    description: string,
    isPrivate: boolean,
  ) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const channel = await this.prisma.channel.create({
      data: {
        workspaceId,
        name,
        description,
        slug,
        isPrivate,
      },
    });

    return channel;
  }

  async getChannelById(id: string) {
    const channel = await this.prisma.channel.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    return channel;
  }

  async addMember(channelId: string, userId: string) {
    return this.prisma.channelMember.create({
      data: {
        channelId,
        userId,
      },
    });
  }
}
