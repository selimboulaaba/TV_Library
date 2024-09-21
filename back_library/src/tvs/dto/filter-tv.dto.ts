import { TvStatus } from "../entities/tv.status.enum";
import { TvType } from "../entities/tv.type.enum";

export class FilterTvDto {
    type: TvType;
    page: number;
    status: TvStatus;
}
