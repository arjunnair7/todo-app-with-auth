// task.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() body: { title: string; description: string }, @Req() req: any) {
    const { title, description } = body;
    const userId =  req.user._id;
    console.log(req.user._id)
    return this.taskService.createTask(title, description, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTasks(@Req() req: any) {
    const userId = req.user._id;
    return this.taskService.getTasks(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTaskById(@Param('id') id: string, @Req() req: any) {
    const userId = req.user._id;
    return this.taskService.getTaskById(id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string },
    @Req() req: any,
  ) {
    const userId = req.user._id;
    const { title, description } = body;
    return this.taskService.updateTask(id, title, description, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @Req() req: any) {
    const userId = req.user._id;
    return this.taskService.deleteTask(id, userId);
  }
}
