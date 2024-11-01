import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI),AuthModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
