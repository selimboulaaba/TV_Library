import { Module } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { TvsController } from './tvs.controller';

@Module({
  controllers: [TvsController],
  providers: [TvsService],
})
export class TvsModule {}
