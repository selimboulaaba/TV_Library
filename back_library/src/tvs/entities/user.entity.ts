import mongoose, { Document } from "mongoose";

export const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
    username: string;
    password: string;
    createdAt: Date;
}