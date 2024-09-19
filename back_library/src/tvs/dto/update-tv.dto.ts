import { PartialType } from '@nestjs/mapped-types';
import { CreateTvDto } from './create-tv.dto';

export class UpdateTvDto extends PartialType(CreateTvDto) {
    title: string;
    description: string;
    poster: string;
    genre: string[];
    date: string;
    verified: boolean;
    isMovie: boolean;
    tmdbId: number;
}
