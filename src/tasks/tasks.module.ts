import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { Task,TaskSchema } from 'src/auth/schemas/task.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Task.name,schema:TaskSchema}])
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TasksModule {}
