import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { TvsModule } from './tvs/tvs.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    TvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
