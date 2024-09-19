import { Module } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { TvsController } from './tvs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { tvSchema } from './entities/tv.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'Tv',schema:tvSchema}])],
  controllers: [TvsController],
  providers: [TvsService],
})
export class TvsModule {}
