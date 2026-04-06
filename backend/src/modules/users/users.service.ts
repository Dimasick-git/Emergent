import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, data: any) {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        displayName: data.displayName,
        avatar: data.avatar,
        bio: data.bio,
        status: data.status,
      },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        status: true,
      },
    });

    return updated;
  }

  async getUserWorkspaces(id: string) {
    const workspaces = await this.prisma.workspaceMember.findMany({
      where: { userId: id },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
            avatar: true,
            description: true,
          },
        },
      },
    });

    return workspaces.map(m => ({
      ...m.workspace,
      role: m.role,
    }));
  }
}
