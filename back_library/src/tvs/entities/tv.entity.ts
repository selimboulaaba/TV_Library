import mongoose, { Document } from "mongoose";
import { TvStatus } from "./tv.status.enum";
import { TvType } from "./tv.type.enum";

export const tvSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    genre: { type: [String], required: true },
    date: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(TvType) },
    tmdbId: { type: Number, required: true },
    pauseAt: { type: String, required: false, default: '' },
    status: { type: String, required: false, enum: Object.values(TvStatus), default: TvStatus.TO_WATCH },
});

export interface Tv extends Document {
    title: string;
    description: string;
    poster: string;
    genre: string[];
    date: string;
    type: TvType;
    tmdbId: number;
    pauseAt: string;
    status: TvStatus;
}
