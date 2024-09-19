import mongoose, { Document } from "mongoose";

export const tvSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    genre: { type: [String], required: true },
    date: { type: String, required: true },
    isMovie: { type: Boolean, required: true },
    verified: { type: Boolean, required: true, default: false },
    tmdbId: { type: Number, required: true },
});

export interface Tv extends Document {
    title: string;
    description: string;
    poster: string;
    genre: string[];
    date: string;
    verified: boolean;
    isMovie: boolean;
    tmdbId: number;
}
