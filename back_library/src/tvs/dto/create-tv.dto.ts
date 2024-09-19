export class CreateTvDto {
    title: string;
    description: string;
    poster: string;
    genre: string[];
    date: string;
    isMovie: boolean;
    tmdbId: number;
}
