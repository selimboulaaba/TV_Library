import { PartialType } from '@nestjs/mapped-types';
import { CreateTvDto } from './create-tv.dto';
import { TvType } from '../entities/tv.type.enum';

export class UpdateTvDto extends PartialType(CreateTvDto) {
    title: string;
    description: string;
    poster: string;
    genre: string[];
    date: string;
    type: TvType;
    tmdbId: number;
}
