import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Channels')
@Controller('api/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create channel' })
  async createChannel(@Body() data: any) {
    return this.channelsService.createChannel(
      data.workspaceId,
      data.name,
      data.description,
      data.isPrivate,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get channel details' })
  async getChannel(@Param('id') id: string) {
    return this.channelsService.getChannelById(id);
  }

  @Post(':id/members')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add member to channel' })
  async addMember(@Param('id') id: string, @Body() data: any) {
    return this.channelsService.addMember(id, data.userId);
  }
}
