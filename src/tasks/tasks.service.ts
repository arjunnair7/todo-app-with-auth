// task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/auth/schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(title: string, description: string, userId: string): Promise<Task> {
    console.log(userId)
    const task = new this.taskModel({ title, description, user: userId });
    return task.save();
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async getTaskById(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, user: userId }).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateTask(id: string, title: string, description: string, userId: string): Promise<Task> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate(
        { _id: id, user: userId },
        { title, description },
        { new: true },
      )
      .exec();

    if (!updatedTask) throw new NotFoundException('Task not found');
    return updatedTask;
  }

  async deleteTask(id: string, userId: string): Promise<Task> {
    const deletedTask = await this.taskModel.findOneAndDelete({ _id: id, user: userId }).exec();
    if (!deletedTask) throw new NotFoundException('Task not found');
    return deletedTask;
  }
}
