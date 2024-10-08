import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { TvsController } from './tvs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { tvSchema } from './entities/tv.entity';
import { ConfirmationMiddleware } from '../middlewares/confirmation/confirmation.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tv', schema: tvSchema }])],
  controllers: [TvsController],
  providers: [TvsService],
})
export class TvsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConfirmationMiddleware)
      .forRoutes(
        { path: 'tvs', method: RequestMethod.POST },
        { path: 'tvs/:id/:password', method: RequestMethod.DELETE }
      );
  }
}
