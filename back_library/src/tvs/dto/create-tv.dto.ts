import { TvType } from "../entities/tv.type.enum";

export class CreateTvDto {
    title: string;
    description: string;
    poster: string;
    genre: string[];
    date: string;
    type: TvType;
    tmdbId: number;
}
