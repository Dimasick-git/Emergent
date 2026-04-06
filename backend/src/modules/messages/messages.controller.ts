import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Messages')
@Controller('api/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post('/:channelId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send message to channel' })
  async sendMessage(
    @Param('channelId') channelId: string,
    @Body() data: any,
  ) {
    return this.messagesService.createMessage(
      channelId,
      data.userId,
      data.content,
      data.type,
    );
  }

  @Get('/channel/:channelId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get channel messages' })
  async getChannelMessages(
    @Param('channelId') channelId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 50,
  ) {
    return this.messagesService.getChannelMessages(
      channelId,
      parseInt(skip as any),
      parseInt(take as any),
    );
  }

  @Patch('/:messageId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit message' })
  async editMessage(@Param('messageId') messageId: string, @Body() data: any) {
    return this.messagesService.editMessage(messageId, data.content);
  }

  @Delete('/:messageId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete message' })
  async deleteMessage(@Param('messageId') messageId: string) {
    return this.messagesService.deleteMessage(messageId);
  }

  @Post('/:messageId/reactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add reaction to message' })
  async addReaction(
    @Param('messageId') messageId: string,
    @Body() data: any,
  ) {
    return this.messagesService.addReaction(
      messageId,
      data.userId,
      data.emoji,
    );
  }
}
