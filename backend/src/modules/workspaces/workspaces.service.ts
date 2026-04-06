import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  async createWorkspace(name: string, description: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const workspace = await this.prisma.workspace.create({
      data: {
        name,
        description,
        slug,
      },
    });

    return workspace;
  }

  async listWorkspaces() {
    return this.prisma.workspace.findMany({
      include: {
        members: {
          select: {
            userId: true,
            role: true,
          },
        },
        channels: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
          take: 5,
        },
      },
    });
  }

  async getWorkspaceById(id: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
      include: {
        members: true,
        channels: true,
        invites: true,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return workspace;
  }

  async getChannels(workspaceId: string) {
    return this.prisma.channel.findMany({
      where: { workspaceId },
      include: {
        members: {
          select: {
            userId: true,
          },
        },
      },
    });
  }
}
