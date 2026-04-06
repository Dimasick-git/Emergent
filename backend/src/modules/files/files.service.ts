import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File) {
    const fileId = uuid();
    const key = `files/${fileId}/${file.originalname}`;

    const savedFile = await this.prisma.file.create({
      data: {
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        url: `/api/files/${fileId}`,
        key,
        userId: 'system', // Should be set to actual user ID from JWT
      },
    });

    return {
      id: savedFile.id,
      url: savedFile.url,
      key: savedFile.key,
      fileSize: savedFile.fileSize,
    };
  }

  async getFileById(id: string) {
    return this.prisma.file.findUnique({
      where: { id },
      select: {
        id: true,
        fileName: true,
        fileSize: true,
        mimeType: true,
        url: true,
        createdAt: true,
      },
    });
  }
}
