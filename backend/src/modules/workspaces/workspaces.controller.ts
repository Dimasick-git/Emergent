import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Workspaces')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new workspace' })
  async createWorkspace(@Body() data: any) {
    return this.workspacesService.createWorkspace(data.name, data.description);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List user workspaces' })
  async listWorkspaces() {
    return this.workspacesService.listWorkspaces();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get workspace details' })
  async getWorkspace(@Param('id') id: string) {
    return this.workspacesService.getWorkspaceById(id);
  }

  @Get(':id/channels')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List workspace channels' })
  async getChannels(@Param('id') id: string) {
    return this.workspacesService.getChannels(id);
  }
}
