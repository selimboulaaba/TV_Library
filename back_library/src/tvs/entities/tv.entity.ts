import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Tv {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    poster: string;
    @Prop()
    genre: string;
    @Prop()
    date: string;
    @Prop({ default: false })
    verified: boolean;
    @Prop()
    isMovie: boolean
}
